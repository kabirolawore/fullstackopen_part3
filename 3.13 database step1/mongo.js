const mongoose = require("mongoose");

if (process.argv.length > 5) {
  console.log(
    "please provide the credentials as an argument: node mongo.js <password> <name> <number> OR node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.5n2qvy2.mongodb.net/phonebook?retryWrites=true&w=majority`;

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", phonebookSchema);

if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then((_result) => {
      console.log("connected!");

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then(() => {
      console.log(`Added ${process.argv[3]} ${process.argv[4]} to phonebook`);

      return mongoose.connection.close();
    })
    .catch((err) => console.error(err));
} else if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(() => Person.find({}))
    .then((result) => {
      console.log("");
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    })
    .catch((err) => console.error(err));
} else {
  console.log(
    "please provide the credentials as an argument: node mongo.js <password> <name> <number> OR node mongo.js <password>"
  ) && process.exit(1);
}

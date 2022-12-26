const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log(`Connecting to ${url}`);

mongoose
  .connect(url)
  .then((_result) => console.log("connected to MongoDB"))
  .catch((err) => console.error(`error connecting to MongoDB ${err}`));

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

phonebookSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", phonebookSchema);

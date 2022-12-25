const express = require("express");
require("dotenv").config();

const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static("build"));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(cors());

//
app.get("/", (_, response) => {
  response.send("<h1>Hello World!</h1>");
});

//
app.get("/info", (_, response) => {
  const date = new Date();
  const entries = person.length;
  response.send(
    `<div>
    <p>Phonebook has info for ${entries} people</p>
    <p>${date}</p>
    </div>
    `
  );
});

//
app.get("/api/persons", (_request, response) => {
  Person.find({}).then((people) => response.json(people));
});

//
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

//
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  // console.log(id);

  Person = Person.filter((person) => person.id !== id);

  response.status(204).end();
});

//
app.post("/api/persons", (request, response) => {
  //
  const body = request.body;
  console.log("");
  console.log(body);

  if (!body.name || !body.number) {
    //
    // Return is crucial here otherwise the code will execute to the very end.
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  // Person.find({ name: body.name })
  //   .then((person) => person.name === body.name)
  //   .then(() => {
  //       return response.status(400).json({
  //         error: "name must be unique",
  //   });

  // else if (Person.some((person) => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => response.json(savedPerson));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

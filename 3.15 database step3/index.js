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
  Person.findById(request.params.id)
    .then((person) => {
      if (person) response.json(person);
      else response.status(404).end();
    })
    .catch((err) => {
      console.log(err);
      response.status(400).send({ error: "malformatted id" });
    });
});

//
app.delete("/api/persons/:id", (request, response, next) => {
  //
  Person.findByIdAndRemove(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
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
    return response.status(400).send({
      error: "name or number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => response.json(savedPerson));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

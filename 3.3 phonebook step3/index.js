const express = require("express");

const app = express();
const PORT = 3001;

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (_, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (_, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  console.log(id);
  const person = persons.find((person) => person.id === id);
  console.log(person);

  if (person) response.json(person);
  else response.status(404).end();
});

app.get("/info", (_, response) => {
  const date = new Date();
  const entries = persons.length;
  response.send(
    `<div>
      <p>Phonebook has info for ${entries} people</p>
      <p>${date}</p>
    </div>
  `
  );
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

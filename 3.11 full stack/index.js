const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("build"));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(cors());

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
  // console.log(id);
  const person = persons.find((person) => person.id === id);
  // console.log(person);

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

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);

  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => Math.trunc(Math.random() * 1000) + 1;

app.post("/api/persons", (request, response) => {
  //
  //
  const body = request.body;

  if (!body.name || !body.number) {
    //
    // Return is crucial here otherwise the code will execute to the very end.
    return response.status(400).json({
      error: "name or number is missing",
    });
  } else if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  // console.log(persons);
  response.json(persons);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

var characters = [
  { id: 0, name: "Mickey Mouse" },
  { id: 1, name: "Minnie Mouse" },
  { id: 2, name: "Wall-E" },
  { id: 3, name: "Eve" },
  { id: 4, name: "Olaf" },
];

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// list of all characters
app.get("/characters", (req, res) => {
  res.send(characters);
});

// add character
app.post("/character", (req, res) => {
  characters.push({ id: req.body.id, name: req.body.name });
  res.send(`${JSON.stringify(characters)} created`);
});

// delete character
app.delete("/character/:id", (req, res) => {
  console.log("delete:id:" + req.params.id);
  characters = characters.filter((item) => item.id != req.params.id);
  res.send("characters left:" + JSON.stringify(characters));
});

// update a character
app.put("/character/:id", (req, res) => {
  const characterId = parseInt(req.params.id);
  const updatedCharacter = req.body;

  const characterToUpdate = characters.find((item) => item.id === characterId);

  if (!characterToUpdate) {
    res.status(404).send("character not found");
  } else {
    characterToUpdate.name = updatedCharacter.name;

    res.send(`${JSON.stringify(characterToUpdate)} updated`);
  }
});

app.listen(4000, () => console.log("Listening on 4000"));

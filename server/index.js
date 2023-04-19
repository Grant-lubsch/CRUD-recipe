const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "AsDfGh12!",
  database: "CRUD_Recipes",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM recipes";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const recipeName = req.body.recipeName;
  const recipeTime = req.body.recipeTime;
  const recipeIngredients = req.body.recipeIngredients;
  const recipeInstructions = req.body.recipeInstructions;

  const sqlInsert =
    "INSERT INTO recipes (recipeName, recipeTime, recipeIngredients, recipeInstructions) VALUES (?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [recipeName, recipeTime, recipeIngredients, recipeInstructions],
    (err, result) => {
      console.log(result);
      res.send("Recipe successfully inserted");
    }
  );
});

app.delete("/api/delete/:recipeName", (req, res) => {
  const name = req.params.recipeName;
  const sqlDelete = "DELETE FROM recipes WHERE recipeName = ?";

  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.recipeName;
  const instructions = req.body.recipeInstructions;
  const sqlUpdate =
    "UPDATE recipes SET recipeInstructions = ? WHERE recipeInstructions = ?";

  db.query(sqlUpdate, [instructions, name], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3003, () => {
  console.log("running on port 3003");
});

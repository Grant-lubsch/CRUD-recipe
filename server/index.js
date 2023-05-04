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

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM recipes WHERE id = ?";

  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
    res.send("Recipe successfully deleted");
  });
});

app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const time = req.body.time;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;

  const sqlUpdate =
    "UPDATE recipes SET recipeName=?, recipeTime=?, recipeIngredients=?, recipeInstructions=? WHERE id=?";
  db.query(
    sqlUpdate,
    [name, time, ingredients, instructions, id],
    (err, result) => {
      console.log(result);
      res.send("Recipe successfully updated");
    }
  );
});

app.listen(3003, () => {
  console.log("running on port 3003");
});

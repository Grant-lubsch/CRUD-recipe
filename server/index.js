const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA_RECIPES || "CRUD_recipes",
});

app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/api/get", (req, res) => {
  console.log("-- GET /api/get");

  const sqlSelect = "SELECT * FROM recipes";

  db.query(sqlSelect, (err, result) => {
    console.log("db result:" + result);
    console.log("err:" + err);

    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  console.log("-- POST /api/insert");

  const name = req.body.name;
  const time = req.body.time;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;

  const sqlInsert =
    "INSERT INTO recipes (recipeName, recipeTime, recipeIngredients, recipeInstructions) VALUES (?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [name, time, ingredients, instructions],
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
var myPort = process.env.PORT || 3003;

app.listen(myPort, () => {
  console.log(`server started on port ` + myPort);
  console.log(`connected to DB with DB_HOST: ` + process.env.DB_HOST);
  console.log(`connected to DB with DB_USERNAME: ` + process.env.DB_USERNAME);
  console.log(
    `connected to DB with DB_SCHEMA_RECIPES: ` + process.env.DB_SCHEMA_RECIPES
  );
});

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello grant");
});

app.listen(3003, () => {
  console.log("running on port 3003");
});

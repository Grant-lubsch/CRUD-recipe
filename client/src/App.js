import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeTime, setRecipeTime] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3003/api/get").then((response) => {
      setRecipeList(response.data);
    });
  }, []);

  const submitRecipe = () => {
    Axios.post("https://localhost:3003/api/insert", {
      recipeName: recipeName,
      recipeTime: recipeTime,
      recipeInstructions: recipeInstructions,
      recipeIngredients: recipeIngredients,
    }).then(() => {
      alert("Recipe successfully");
    });
  };

  return (
    <div className="App">
      <h1>CRUD Recipes</h1>
      <div className="form">
        <label>Recipe:</label>
        <input
          type="text"
          name="recipeName"
          onChange={(e) => {
            setRecipeName(e.target.value);
          }}
        />
        <label>Time to Cook:</label>
        <input
          type="text"
          name="recipeTime"
          onChange={(e) => {
            setRecipeTime(e.target.value);
          }}
        />
        <label>Ingredients:</label>
        <input
          type="text"
          name="recipeIngredients"
          onChange={(e) => {
            setRecipeIngredients(e.target.value);
          }}
        />
        <label>Instructions:</label>
        <input
          type="text"
          name="recipeInstructions"
          onChange={(e) => {
            setRecipeInstructions(e.target.value);
          }}
        />

        <button onClick={submitRecipe}>Submit</button>

        {recipeList.map((val) => {
          return (
            <h1>
              Recipe Name: {val.recipeName} | Time to Cook: {val.recipeTime} |
              Recipe Ingredients: {val.recipeIngredients} | Recipe Instructions:{" "}
              {val.recipeInstructions}
            </h1>
          );
        })}
      </div>
    </div>
  );
}

export default App;

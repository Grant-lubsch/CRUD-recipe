import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeTime, setRecipeTime] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [newInstructions, setNewInstructions] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3003/api/get").then((response) => {
      setRecipeList(response.data);
    });
  }, []);

  const submitRecipe = () => {
    Axios.post("http://localhost:3003/api/insert", {
      recipeName: recipeName,
      recipeTime: recipeTime,
      recipeInstructions: recipeInstructions,
      recipeIngredients: recipeIngredients,
    });

    setRecipeList([
      ...recipeList,
      {
        recipeName: recipeName,
        recipeTime: recipeTime,
        recipeInstructions: recipeInstructions,
        recipeIngredients: recipeIngredients,
      },
    ]);
  };

  const deleteRecipe = (recipe) => {
    Axios.delete(`http://localhost:3003/api/delete/${recipe}`);
  };

  const updateRecipe = (recipe) => {
    Axios.put("http://localhost:3003/api/update", {
      recipeName: recipe,
      recipeInstructions: newInstructions,
    });
    setNewInstructions("");
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
            <div className="card">
              <h1>{val.recipeName}</h1>
              <p>Time to Cook: {val.recipeTime}</p>
              <p>Recipe Ingredients: {val.recipeIngredients}</p>
              <p>Recipe Instructions: {val.recipeInstructions}</p>

              <button onClick={() => deleteRecipe(val.recipeName)}>
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewInstructions(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateRecipe(val.recipeName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

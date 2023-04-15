import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>CRUD Recipe's</h1>
      <div className="form">
        <label>Recipe:</label>
        <input type="text" name="recipeName" />
        <label>Time to Cook:</label>
        <input type="text" name="recipeTime" />
        <label>Ingredients:</label>
        <input type="text" name="recipeIngredients" />
        <label>Instructions:</label>
        <input type="text" name="recipeInstructions" />

        <button>Submit</button>
      </div>
    </div>
  );
}

export default App;

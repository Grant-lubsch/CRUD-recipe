import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    Axios.get("http://localhost:3003/api/get").then((response) => {
      setRecipeList(response.data);
    });
  }, []);

  const submitRecipe = () => {
    Axios.post("http://localhost:3003/api/insert", {
      name: name,
      time: time,
      instructions: instructions,
      ingredients: ingredients,
    }).then(() => {
      setRecipeList([
        ...recipeList,
        {
          recipeName: name,
          recipeTime: time,
          recipeInstructions: instructions,
          recipeIngredients: ingredients,
        },
      ]);
      setName("");
      setTime("");
      setIngredients("");
      setInstructions("");
    });
  };

  const deleteRecipe = (id) => {
    Axios.delete(`http://localhost:3003/api/delete/${id}`).then(() => {
      Axios.get("http://localhost:3003/api/get").then((response) => {
        setRecipeList(response.data);
      });
    });
  };

  const handleUpdate = (id) => {
    setEditing(true);
    setEditId(id);
    const recipeToUpdate = recipeList.find((val) => val.id === id);
    setName(recipeToUpdate.recipeName);
    setTime(recipeToUpdate.recipeTime);
    setIngredients(recipeToUpdate.recipeIngredients);
    setInstructions(recipeToUpdate.recipeInstructions);
  };

  const handleUpdateSubmit = () => {
    Axios.put(`http://localhost:3003/api//update/${editId}`, {
      name: name,
      time: time,
      ingredients: ingredients,
      instructions: instructions,
    }).then(() => {
      setName("");
      setTime("");
      setIngredients("");
      setInstructions("");
      setEditId(null);
      setEditing(false);
      Axios.get("http://localhost:3003/api/get").then((response) => {
        setRecipeList(response.data);
      });
    });
  };
  /*  const updateRecipe = (recipe) => {
    Axios.put("http://localhost:3003/api/update", {
      recipeName: recipe,
      recipeInstructions: newInstructions,
    }).then((response) => {
      setRecipeList(
        recipeList.map((val) => {
          if (val.recipeName === recipe) {
            val.recipeInstructions = newInstructions;
          }
          return val;
        })
      );
    });
    setNewInstructions("");
  };
*/
  const handleClick = (event) => {
    const id = event.target.id;
    if (id === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (id === "next" && currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    } else if (!isNaN(id)) {
      setCurrentPage(Number(id));
    }
  };

  const handleNext = () => {
    setCurrentPage((page) => page + 1);
  };

  const handlePrev = () => {
    setCurrentPage((page) => page - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recipeList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];

  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(currentPage + 2, Math.ceil(recipeList.length / itemsPerPage));
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="App">
      <h1>CRUD Recipes</h1>
      <div className="form">
        <label>Recipe:</label>
        <input
          type="text"
          name="recipeName"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Time to Cook:</label>
        <input
          type="text"
          name="recipeTime"
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <label>Ingredients:</label>
        <input
          type="text"
          name="recipeIngredients"
          onChange={(e) => {
            setIngredients(e.target.value);
          }}
        />
        <label>Instructions:</label>
        <input
          type="text"
          name="recipeInstructions"
          onChange={(e) => {
            setInstructions(e.target.value);
          }}
        />

        {editing ? (
          <button onClick={handleUpdateSubmit}>Update Recipe</button>
        ) : (
          <button onClick={submitRecipe}>Submit Recipe</button>
        )}

        {recipeList.map((val) => {
          return (
            <div className="card">
              <h1>{val.recipeName}</h1>
              <p>Time to Cook: {val.recipeTime}</p>
              <p>Recipe Ingredients: {val.recipeIngredients}</p>
              <p>Recipe Instructions: {val.recipeInstructions}</p>
              <button onClick={() => deleteRecipe(val.id)}>Delete</button>
              &nbsp;&nbsp;&nbsp;
              <button onClick={() => handleUpdate(val.id)}>Update</button>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <nav>
          <ul className="pagination">
            <li
              className={currentPage === 1 ? "page-item disabled" : "page-item"}
            >
              <button className="page-link" onClick={handlePrev}>
                Previous
              </button>
            </li>
            {pageNumbers.map((number) => {
              if (number < currentPage - 1 || number > currentPage + 1) {
                return null;
              }
              return (
                <li
                  key={number}
                  className={
                    currentPage === number ? "page-item active" : "page-item"
                  }
                >
                  <button
                    className="page-link"
                    id={number}
                    onClick={handleClick}
                  >
                    {number}
                  </button>
                </li>
              );
            })}
            <li
              className={
                currentPage === pageNumbers.length
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <button className="page-link" onClick={handleNext}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;

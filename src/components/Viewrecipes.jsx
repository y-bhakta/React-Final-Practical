import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleterecipe, getrecipes, setEditrecipe } from '../features/recipe/recipeStore';
import { useNavigate } from 'react-router-dom';
import './Viewrecipes.css'

const Viewrecipes = () => {
    const {recipes}=useSelector((state)=> state.recipe);
    const dispacth=useDispatch();
    const navigate=useNavigate();
    const handledelete=(id)=>{
        dispacth(deleterecipe(id));
    }
    const handleedit=(id)=>{
        let data=recipes.find(recipes=> recipes.id === id);
        dispacth(setEditrecipe(data));
        navigate('/add-recipe');
    }
    useEffect(()=>{
        dispacth(getrecipes());
    },[dispacth])
  return (
    <div className="viewrecipes-container">
      <div className="view-header">
        <h1 className="view-title">Recipe List</h1>
        <p className="view-subtitle">Manage and organize your recipes</p>
      </div>

      <div className="table-wrapper">
        {recipes.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🍽️</span>
            <p>No recipes found. Start by adding your first recipe!</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="recipes-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Recipe Name</th>
                  <th>Origin</th>
                  <th>Ingredients</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe, index) => (
                  <tr key={recipe.id} className="table-row">
                    <td className="sr-no">{index + 1}</td>
                    <td className="recipe-name">{recipe.title}</td>
                    <td className="recipe-origin"><span className="origin-badge">{recipe.origin}</span></td>
                    <td className="recipe-ingredients">{recipe.incredients}</td>
                    <td className="actions">
                      <button 
                        className="btn btn-edit" 
                        onClick={() => handleedit(recipe.id)}
                        title="Edit recipe"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className="btn btn-delete" 
                        onClick={() => handledelete(recipe.id)}
                        title="Delete recipe"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Viewrecipes

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getrecipes } from '../features/recipe/recipeStore';
import './Home.css'

const Home = () => {
  const {recipes}=useSelector((state)=> state.recipe);
  const dispatch=useDispatch();
  const [query,setQuery]=useState('');
  const [selectedOrigin,setSelectedOrigin]=useState('');

  const uniqueOrigins=useMemo(()=>{
    const origins=recipes.map((recipe)=>String(recipe.origin || '').trim()).filter(Boolean);
    return [...new Set(origins)].sort();
  },[recipes]);

  const filterrecipes=useMemo(()=>{
    const lowerquery=query.trim().toLowerCase();
    return recipes.filter((recipe)=>{
        const title=String(recipe.title || '').toLowerCase();
        const origin=String(recipe.origin || '').toLowerCase();
        const matchesSearch=!lowerquery || title.includes(lowerquery) || origin.includes(lowerquery);
        const matchesOriginFilter=!selectedOrigin || origin===selectedOrigin.toLowerCase();
        return matchesSearch && matchesOriginFilter;
    });
  },[recipes,query,selectedOrigin]);
  useEffect(()=>{
    dispatch(getrecipes());
  },[])

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title"> Delicious Recipes</h1>
        <p className="hero-subtitle">Discover amazing recipes and elevate your cooking skills</p>
      </div>

      <div className="search-section">
        <div className="search-container">
          <label htmlFor="search" className="search-label"> Search Recipes:</label>
          <input 
            type="text" 
            id='search' 
            className="search-input"
            placeholder="Search by name or origin..." 
            onChange={(e)=> setQuery(e.target.value)}
            value={query}
          />
          <label htmlFor="origin-filter" className="filter-label">Filter by Origin:</label>
          <select
            id="origin-filter"
            className="origin-filter"
            value={selectedOrigin}
            onChange={(e)=>setSelectedOrigin(e.target.value)}
          >
            <option value="">All Origins</option>
            {uniqueOrigins.map((origin)=>(
              <option key={origin} value={origin}>{origin}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="recipes-grid">
        {filterrecipes.length === 0 ? (
          <div className="no-recipes">
            <p>No recipes available. Start by adding your favorite recipes!</p>
          </div>
        ) : (
          filterrecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="card-header">
                <span className="recipe-icon">🥘</span>
              </div>
              <div className="card-content">
                <h3 className="recipe-title">{recipe.title}</h3>
                <div className="recipe-origin">
                  <span className="origin-badge">{recipe.origin}</span>
                </div>
                <div className="recipe-details">
                  <p className="recipe-label"><strong>Ingredients:</strong></p>
                  <p className="recipe-ingredients">{recipe.incredients}</p>
                </div>
              </div>
              <div className="card-footer">
                <button className="view-btn">View Recipe</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home

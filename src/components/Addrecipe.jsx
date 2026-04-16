import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addrecipe, nullEditrecipe, updaterecipe } from '../features/recipe/recipeStore';
import { useNavigate } from 'react-router-dom';
import './Addrecipe.css'

const Addrecipe = () => {
    const [recipeobj,setRecipeobj]=useState({});
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {editrecipe}=useSelector(state=> state.recipe);
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setRecipeobj({...recipeobj,[name]:value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(recipeobj.id){
            dispatch(updaterecipe(recipeobj));
            navigate('/view-recipes');
            dispatch(nullEditrecipe());
        }else{
            dispatch(addrecipe(recipeobj));
        }
        setRecipeobj({});       
    }
    useEffect(()=>{
        if(editrecipe){
            setRecipeobj(editrecipe);
        }       
    },[editrecipe])
    return (
        <div className="addrecipe-container">
            <div className="addrecipe-wrapper">
                <div className="form-header">
                    <h1 className="form-title">{recipeobj.id ? 'Update Recipe' : 'Add New Recipe'}</h1>
                    <p className="form-subtitle">Share your delicious recipe with the community</p>
                </div>

                <form className="recipe-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Recipe Title</label>
                        <input 
                            type="text" 
                            id="title"
                            name='title' 
                            className="form-input" 
                            placeholder="Enter recipe name..."
                            required  
                            onChange={handleChange} 
                            value={recipeobj.title || ''} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ingredients" className="form-label">Ingredients</label>
                        <textarea 
                            id="ingredients"
                            name='incredients' 
                            className="form-textarea" 
                            placeholder="List all ingredients here..."
                            rows={6} 
                            required 
                            onChange={handleChange} 
                            value={recipeobj.incredients || ''}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Recipe Origin</label>
                        <input 
                            type="text" 
                            id="origin"
                            name='origin' 
                            className="form-input" 
                            placeholder="Enter recipe origin...(Indian, Italian, Mexican etc.)"
                            required  
                            onChange={handleChange} 
                            value={recipeobj.origin || ''} 
                        />
                    </div>

                    <div className="form-actions">
                        <button className="btn-submit" type="submit">
                            {recipeobj.id ? '✨ Update Recipe' : '➕ Add Recipe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addrecipe

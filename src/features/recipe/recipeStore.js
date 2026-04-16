import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const addrecipe=createAsyncThunk('recipe/addrecipe',async(recipeobj,{rejectWithValue})=>{
    try {
        let res= await axiosInstance.post('/recipes',recipeobj);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const getrecipes=createAsyncThunk('recipe/getrecipes',async(_,{rejectWithValue})=>{
    try {
        let res=await axiosInstance.get('/recipes');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const deleterecipe=createAsyncThunk('recipe/deleterecipe',async(id,{rejectWithValue})=>{
    try {
        let res=await axiosInstance.delete(`/recipes/${id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const updaterecipe=createAsyncThunk('recipe/updaterecipe',async(recipeobj,{rejectWithValue})=>{
    try {
        let res=await axiosInstance.put(`/recipes/${recipeobj.id}`,recipeobj);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const recipeSlice=createSlice({
    name:"recipe",
    initialState:{
        recipes:[],
        editrecipe:{}
    },
    reducers:{
        setEditrecipe:(state,action)=>{
            state.editrecipe=action.payload;
        },
        nullEditrecipe:(state)=>{
            state.editrecipe={};
        }
    },
    extraReducers:function(builder){
        builder.addCase(addrecipe.fulfilled,(state,action)=>{
            state.recipes.push(action.payload);
        });
        builder.addCase(getrecipes.fulfilled,(state,action)=>{
            state.recipes=action.payload;
        });
        builder.addCase(deleterecipe.fulfilled,(state,action)=>{
            state.recipes=state.recipes.filter((recipe)=>recipe.id!==action.payload.id);
        });
        builder.addCase(updaterecipe.fulfilled,(state,action)=>{
            state.recipes=state.recipes.map((recipe)=>{
                if(recipe.id===action.payload.id) return action.payload;
                return recipe;
            });
        });
    }
});

export default recipeSlice.reducer;
export const {setEditrecipe,nullEditrecipe}=recipeSlice.actions;
import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from '../features/recipe/recipeStore.js'
import userReducer from '../features/user/userSlice.js'

const store=configureStore({
    reducer:{
        recipe:recipeReducer,
        user:userReducer
    }
});

export default store;
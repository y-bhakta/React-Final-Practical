import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const registeruser=createAsyncThunk('user/registeruser',async(userobj,{rejectWithValue})=>{
    try {
        userobj.role="user";
        let res=await axiosInstance.post('/users',userobj);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const getallusers=createAsyncThunk('user/getallusers',async(_,{rejectWithValue})=>{
    try {
        let res=await axiosInstance.get('/users');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const userSlice=createSlice({
    name:"user",
    initialState:{
        users:[],
        currentUser:null,
        isAuthenticated:false
    },
    reducers:{
        loginUser:(state,action)=>{
            state.currentUser=action.payload;
            state.isAuthenticated=true;
            localStorage.setItem('user',JSON.stringify(action.payload));
        },
        logoutUser:(state)=>{
            state.currentUser=null;
            state.isAuthenticated=false;
            localStorage.removeItem('user');
        },
        loadUserFromStorage:(state)=>{
            const savedUser=localStorage.getItem('user');
            if(savedUser){
                state.currentUser=JSON.parse(savedUser);
                state.isAuthenticated=true;
            }
        }
    },
    extraReducers:function(builder){
        builder.addCase(registeruser.fulfilled,(state,action)=>{
            state.users.push(action.payload);
        });
        builder.addCase(getallusers.fulfilled,(state,action)=>{
            state.users=action.payload;
        });
    }
});

export const {loginUser,logoutUser,loadUserFromStorage}=userSlice.actions;
export default userSlice.reducer;
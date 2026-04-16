import React, { useEffect } from 'react'
import Home from './components/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Addrecipe from './components/Addrecipe'
import Viewrecipes from './components/Viewrecipes'
import Signup from './components/Signup'
import Header from './components/Header'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import { useDispatch } from 'react-redux'
import { loadUserFromStorage } from './features/user/userSlice'

const App = () => {
  const location=useLocation();
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(loadUserFromStorage());
  },[dispatch]);

  return (
    <>
      {
        location.pathname!=='/signup'&&location.pathname!=='/login'?<Header />:null
      }
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/add-recipe' element={<AdminRoute><Addrecipe /></AdminRoute>} />
        <Route path='/view-recipes' element={<AdminRoute><Viewrecipes /></AdminRoute>} />
      </Routes>
    </>
  )
}

export default App

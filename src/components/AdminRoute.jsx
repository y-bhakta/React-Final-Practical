import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
    const { isAuthenticated, currentUser } = useSelector(state => state.user);
    
    // Fallback to localStorage if Redux state is not available
    let user = currentUser;
    let isAuth = isAuthenticated;
    
    if (!user) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            user = JSON.parse(savedUser);
            isAuth = true;
        }
    }
    
    // Check if user is authenticated
    if (!isAuth || !user) {
        return <Navigate to="/login" replace />;
    }

    // Check if user has admin role
    if (!user.role || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;

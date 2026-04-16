import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
    const { isAuthenticated, currentUser } = useSelector(state => state.user);
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (currentUser && currentUser.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;

// src/utils/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../App.jsx'; 

const ProtectedRoute = ({ requiredRole }) => {
    const { user } = useAuth(); 

    if (!user.role || user.role === 'Guest') {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        const redirectPath = user.role === 'Dosen' ? '/dosen/dashboard' : '/mahasiswa/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
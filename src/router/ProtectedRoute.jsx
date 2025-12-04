import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  // Ambil peran (role) dari local storage
  const userRole = localStorage.getItem('userRole');

  if (userRole && allowedRoles.includes(userRole)) {
    // Jika user memiliki role yang diizinkan, tampilkan konten (Outlet)
    return <Outlet />;
  }

  // Jika tidak terotentikasi atau role salah, redirect ke halaman login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
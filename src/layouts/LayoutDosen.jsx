// src/layouts/LayoutDosen.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarDosen from '../components/navigation/SidebarDosen';

const LayoutDosen = () => (
    <div className="d-flex">
        <div className="bg-light border-end" style={{ width: '250px', minHeight: '100vh' }}>
            <div className="p-3 fw-bold text-primary border-bottom">Dosen Panel</div>
            <SidebarDosen />
        </div>
        <div className="flex-grow-1 p-4" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
            <Outlet /> 
        </div>
    </div>
);

export default LayoutDosen;
import React from 'react';
// PENTING: Import Outlet dari react-router-dom
import { useNavigate, Outlet } from 'react-router-dom'; 
import SidebarDosen from '../components/navigation/SidebarDosen.jsx'; 

const LayoutDosen = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Hapus role dari local storage dan redirect ke login
        localStorage.removeItem('userRole'); 
        navigate('/login'); 
    };

    return (
        <div className="d-flex" id="wrapper">
            {/* Sidebar Komponen */}
            <div className="bg-dark border-end" id="sidebar-wrapper">
                <div className="sidebar-heading bg-primary text-white p-4 fw-bold">Penilaian Lapangan</div>
                
                <SidebarDosen /> 
            </div>

            {/* Konten Halaman Utama */}
            <div id="page-content-wrapper" className="w-100">
                {/* Header/Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div className="container-fluid">
                        <h5 className="mb-0 ms-3">Halaman Dosen</h5>
                        <div className="navbar-nav ms-auto">
                            <span className="nav-link text-dark me-2">Halo, Dosen A.A.</span>
                            <button 
                                className="btn btn-sm btn-danger" 
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>

                {/* AREA KRITIS: Konten DashboardPage dirender melalui Outlet */}
                <div className="container-fluid p-4">
                    {/* Menggantikan {children} dengan <Outlet /> */}
                    <Outlet /> 
                </div>
            </div>
        </div>
    );
};

export default LayoutDosen;
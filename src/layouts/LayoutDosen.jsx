import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom'; 
import SidebarDosen from '../components/navigation/SidebarDosen.jsx'; 

const LayoutDosen = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Hapus role pengguna dari localStorage saat logout
        localStorage.removeItem('userRole'); 
        // Arahkan kembali ke halaman login
        navigate('/login'); 
    };

    return (
        <div className="d-flex" id="wrapper">
            
            {/* Sidebar Komponen */}
            {/* Menggunakan bg-white (latar belakang putih) agar sesuai dengan tampilan baru */}
            <div className="bg-white border-end" id="sidebar-wrapper" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                {/* Header Sidebar (Warna Biru Primary) */}
                <div className="sidebar-heading bg-primary text-white p-4 fw-bold">Penilaian Lapangan</div>
                
                {/* Komponen SidebarDosen (Berisi daftar link menu) */}
                <SidebarDosen /> 
            </div>

            {/* Konten Halaman Utama */}
            <div id="page-content-wrapper" className="w-100">
                
                {/* Header/Navbar di atas konten */}
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

                {/* Konten Halaman yang Akan Diisi (menggunakan Outlet) */}
                <div className="container-fluid p-4">
                    <Outlet /> 
                </div>
            </div>
        </div>
    );
};

export default LayoutDosen;
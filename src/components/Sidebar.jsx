// src/components/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    
    // 1. DATA STATIS MENU (Daftar menu sesuai Mahasiswa Panel)
    const menuItems = [
        { path: "/mahasiswa/dashboard", name: "Dashboard", icon: "bi-house-door-fill" },
        { path: "/mahasiswa/tugas", name: "Tugas Saya", icon: "bi-journal-check" },
        { path: "/mahasiswa/nilai", name: "Nilai (KHS)", icon: "bi-bar-chart-fill" },
        { path: "/mahasiswa/kelompok", name: "Kelompok Proyek", icon: "bi-people-fill" },
    ];
    
    const userName = "Rani Wijaya"; // Data simulasi user

    return (
        // Style sidebar (Sesuai image_ae5cc0.png: biru, lebar tetap)
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-primary" style={{ width: '280px' }}>
            
            {/* Header / Logo */}
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <i className="bi bi-mortarboard-fill fs-3 me-2"></i>
                <span className="fs-5 fw-bold">Mahasiswa Panel</span>
            </div>
            <hr />

            {/* Navigasi Menu */}
            <ul className="nav nav-pills flex-column mb-auto">
                {/* 🔥 .map() dijalankan pada menuItems yang TERJAMIN BUKAN UNDEFINED */}
                {menuItems.map((item) => (
                    <li className="nav-item" key={item.path}>
                        <NavLink 
                            to={item.path} 
                            // Pastikan path Mahasiswa/Kelompok diganti menjadi /mahasiswa/kelompok agar sesuai AppRouter
                            className={({ isActive }) => 
                                `nav-link text-white ${isActive ? 'active bg-white text-primary shadow-sm' : ''}`
                            }
                        >
                            <i className={`bi ${item.icon} me-2`}></i>
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <hr />

            {/* Footer User Profile (Rani Wijaya) */}
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person-circle fs-4 me-2"></i>
                    <strong>{userName}</strong>
                </a>
                {/* Anda dapat menambahkan menu dropdown untuk Pengaturan atau Logout di sini jika diperlukan */}
            </div>
        </div>
    );
};

export default Sidebar;
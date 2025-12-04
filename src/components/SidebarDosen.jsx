// src/components/SidebarDosen.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../App.jsx'; 

// 🔥 VERIFIKASI ARRAY SYNTAX KRITIS
const menuItems = [
    { path: "/dosen/dashboard", name: "Dashboard", icon: "bi-house-door-fill" },
    { path: "/dosen/kelas", name: "Daftar Kelas", icon: "bi-book-fill" }, 
    { path: "/dosen/tugas", name: "Manajemen Tugas", icon: "bi-list-task" }, 
    { path: "/dosen/penilaian", name: "Penilaian Tugas", icon: "bi-list-check" },
    { path: "/dosen/rekap", name: "Rekap Nilai", icon: "bi-file-earmark-bar-graph-fill" }, 
    // Pastikan tidak ada koma tambahan di sini jika ini baris terakhir
]; 

const SidebarDosen = () => {
    const { logout } = useAuth(); 
    const userName = "Dr. Budi Santoso"; 

    const handleLogout = () => {
        logout();
    };

    return (
        // Sidebar menggunakan bg-primary (Biru)
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-primary sidebar-dosen" style={{ width: '250px', minHeight: '100vh' }}>
            
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <i className="bi bi-mortarboard-fill fs-3 me-2 text-white"></i> 
                <span className="fs-5 fw-bold">Dosen Panel</span>
            </div>
            <hr />

            <ul className="nav nav-pills flex-column mb-auto">
                {menuItems.map((item) => (
                    <li className="nav-item" key={item.path}>
                        <NavLink 
                            to={item.path} 
                            end
                            className={({ isActive }) => 
                                // Skema warna aktif yang kontras (bg-info)
                                `nav-link text-white ${isActive ? 'active bg-info shadow-sm fw-bold' : ''}`
                            }
                        >
                            <i className={`bi ${item.icon} me-2`}></i>
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <hr />

            <div className="dropdown">
                <div role="button" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person-circle fs-4 me-2"></i>
                    <strong>{userName}</strong>
                </div>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><button className="dropdown-item" onClick={handleLogout}>Sign out</button></li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarDosen;
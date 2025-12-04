// src/components/SidebarMahasiswa.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../App.jsx'; 
// 🔥 HAPUS: import { useNavigate } from 'react-router-dom';

const mahasiswaMenuItems = [
    { path: '/mahasiswa/dashboard', name: 'Dashboard', icon: 'bi-house-door-fill' },
    { path: '/mahasiswa/tugas', name: 'Tugas Saya', icon: 'bi-journal-check' },
    { path: '/mahasiswa/nilai', name: 'Nilai (KHS)', icon: 'bi-bar-chart-fill' },
    { path: '/mahasiswa/kelompok', name: 'Kelompok Proyek', icon: 'bi-people-fill' },
];

const SidebarMahasiswa = () => {
    const userName = "Rani Wijaya"; 
    const { logout } = useAuth(); 
    // 🔥 HAPUS: const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="sidebar-mhs d-flex flex-column p-3 bg-primary text-white shadow-lg" style={{ width: '280px', minHeight: '100vh' }}>
            <div className="text-center mb-4">
                <i className="bi bi-mortarboard-fill text-white fs-2"></i>
                <h5 className="text-white mt-2 fw-bold">Mahasiswa Panel</h5>
            </div>
            <hr />
            
            <ul className="nav nav-pills flex-column mb-auto">
                {mahasiswaMenuItems.map((item) => (
                    <li className="nav-item" key={item.path}>
                        <NavLink 
                            to={item.path} 
                            end 
                            className={({ isActive }) => 
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

export default SidebarMahasiswa;
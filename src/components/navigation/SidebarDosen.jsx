// src/components/navigation/SidebarDosen.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const SidebarDosen = () => {
    const navigate = useNavigate();
    
    const menuItems = [
        { path: '/dosen/dashboard', name: 'Dashboard', icon: 'bi-speedometer2' },
        { path: '/dosen/kelas', name: 'Manajemen Kelas', icon: 'bi-people' },
        { path: '/dosen/tugas', name: 'Tugas Lapangan', icon: 'bi-list-task' },
        { path: '/dosen/penilaian', name: 'Penilaian', icon: 'bi-clipboard-check' },
    ];

    const handleLogout = () => {
        if (window.confirm("Apakah Anda yakin ingin logout?")) {
            localStorage.removeItem('userRole'); // Hapus role
            // Hapus token atau data user lainnya jika ada
            navigate('/login');
        }
    };

    return (
        <div className="list-group list-group-flush mt-2">
            {menuItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => 
                        isActive 
                        ? "list-group-item list-group-item-action bg-primary text-white border-0 rounded mx-2 my-1" 
                        : "list-group-item list-group-item-action text-secondary border-0 mx-2 my-1"
                    }
                >
                    <i className={`bi ${item.icon} me-3`}></i>{item.name}
                </NavLink>
            ))}
            
            <button 
                onClick={handleLogout}
                className="btn btn-outline-danger mx-2 mt-4"
            >
                <i className="bi bi-box-arrow-right me-2"></i> Logout
            </button>
        </div>
    );
};

export default SidebarDosen;
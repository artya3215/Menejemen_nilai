import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarDosen = () => {
    const menuItems = [
        { path: '/dosen/dashboard', name: 'Dashboard' },
        { path: '/dosen/kelas', name: 'Mengelola Kelas' },
        { path: '/dosen/tugas', name: 'Membuat Tugas' },
        { path: '/dosen/penilaian', name: 'Penilaian Kelompok' },
    ];

    return (
        <div className="list-group list-group-flush">
            {menuItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => 
                        isActive 
                        ? "list-group-item list-group-item-action list-group-item-light p-3 bg-primary text-white fw-bold" 
                        : "list-group-item list-group-item-action list-group-item-light p-3"
                    }
                >
                    {item.name}
                </NavLink>
            ))}
        </div>
    );
};

export default SidebarDosen; // Wajib: Export Default
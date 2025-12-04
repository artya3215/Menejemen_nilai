import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarMahasiswa = () => {
    const baseUrl = '/mahasiswa';

    return (
        <div className="list-group list-group-flush flex-grow-1">
            
            {/* 1. DASHBOARD */}
            <NavLink 
                to={`${baseUrl}/dashboard`} 
                className={({ isActive }) => 
                    `list-group-item list-group-item-action p-3 ${isActive ? 'bg-primary text-white' : 'bg-light'}`
                }
            >
                Dashboard
            </NavLink>

            {/* 2. NILAI TUGAS (Melihat Nilai & Feedback) */}
            <NavLink 
                to={`${baseUrl}/nilai`} 
                className={({ isActive }) => 
                    `list-group-item list-group-item-action p-3 ${isActive ? 'bg-primary text-white' : 'bg-light'}`
                }
            >
                Nilai Tugas
            </NavLink>
        </div>
    );
};

export default SidebarMahasiswa;
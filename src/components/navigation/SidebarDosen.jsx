import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarDosen = () => {
    // Definisi item menu dengan path dan nama
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
                    // Menggunakan fungsi isActive dari NavLink
                    className={({ isActive }) =>
                        isActive
                        ? "list-group-item list-group-item-action p-3 bg-primary text-white fw-bold" // Active item: Biru, Teks Putih
                        : "list-group-item list-group-item-action p-3 text-dark" // Inactive item: Putih, Teks Gelap
                    }
                    // Menghilangkan border di antara item
                    style={{ borderBottom: 'none' }}
                >
                    {item.name}
                </NavLink>
            ))}
            {/* Bagian kosong di bawah untuk mengisi sisa tinggi Sidebar dengan warna putih */}
            <div className="list-group-item list-group-item-action p-3" style={{ flexGrow: 1 }}></div>
        </div>
    );
};

export default SidebarDosen;
// src/layouts/LayoutMahasiswa.jsx

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarMahasiswa from '../components/SidebarMahasiswa.jsx'; // Path dikoreksi

// Data menu untuk mendapatkan judul halaman
const mahasiswaMenuItems = [
    { path: '/mahasiswa/dashboard', name: 'Dashboard' },
    { path: '/mahasiswa/tugas', name: 'Tugas Saya' },
    { path: '/mahasiswa/nilai', name: 'Nilai (KHS)' },
    { path: '/mahasiswa/kelompok', name: 'Kelompok Proyek' },
];

const LayoutMahasiswa = ({ children }) => {
    const location = useLocation();
    
    const currentTitle = mahasiswaMenuItems.find(item => 
        location.pathname.startsWith(item.path.split(':').shift())
    )?.name || "Halaman Mahasiswa";
    
    // Penanganan khusus untuk rute dinamis submit
    const isFormSubmit = location.pathname.startsWith('/mahasiswa/tugas/submit/');
    const finalTitle = isFormSubmit ? "Form Submit Tugas" : currentTitle;


    return (
        // Pembungkus utama, pastikan minHeight 100vh untuk tata letak penuh
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* 1. Sidebar di sebelah kiri */}
            <SidebarMahasiswa />
            
            {/* 2. Area konten utama (Header + Main + Footer) */}
            <div className="flex-grow-1 d-flex flex-column">
                
                {/* Header/Top Bar */}
                <header className="navbar navbar-light bg-white shadow-sm p-3 border-bottom sticky-top">
                    <div className="container-fluid">
                        <h4 className="mb-0 text-primary fw-bold">{finalTitle}</h4>
                    </div>
                </header>

                {/* Main Content Area: Menggunakan Outlet untuk merender halaman anak */}
                <main className="flex-grow-1 p-4 overflow-auto">
                    <div className="container-fluid">
                        {/* Menggunakan <Outlet /> untuk rendering rute anak */}
                        {children || <Outlet />} 
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="text-center text-muted p-2 border-top bg-white">
                    <small>© 2025 Sistem Penilaian Lapangan. Mahasiswa Panel.</small>
                </footer>
            </div>
        </div>
    );
};

export default LayoutMahasiswa;
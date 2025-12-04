// src/layouts/LayoutDosen.jsx

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarDosen from '../components/SidebarDosen.jsx'; 

const LayoutDosen = ({ children }) => {
    const location = useLocation();
    
    const dosenMenuItems = [
        { path: '/dosen/dashboard', name: 'Dashboard' },
        { path: '/dosen/kelas', name: 'Daftar Kelas' },
        { path: '/dosen/tugas', name: 'Manajemen Tugas' },
        { path: '/dosen/penilaian', name: 'Penilaian Tugas' },
        { path: '/dosen/rekap', name: 'Rekap Nilai' },
    ];

    const currentTitle = dosenMenuItems.find(item => location.pathname.startsWith(item.path))?.name || "Halaman Dosen";
    
    const isPenilaianForm = location.pathname.startsWith('/dosen/penilaian/') && location.pathname.split('/').length > 3;
    const isTugasDetail = location.pathname.startsWith('/dosen/tugas/') && location.pathname.split('/').length > 3;

    let finalTitle = currentTitle;
    if (isPenilaianForm) {
        finalTitle = "Form Penilaian Kelompok";
    } else if (isTugasDetail) {
        finalTitle = "Detail Tugas & Kelompok";
    }

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            
            <SidebarDosen />
            
            <div className="flex-grow-1 d-flex flex-column">
                
                {/* 🔥 PERBAIKAN KRITIS: Header menggunakan warna Putih (bg-white) dan teks gelap (text-dark) */}
                <header className="navbar navbar-light bg-white shadow-sm p-3 border-bottom sticky-top">
                    <div className="container-fluid">
                        <h4 className="mb-0 text-primary fw-bold">{finalTitle}</h4> 
                        {/* Menggunakan text-primary agar tetap biru (seperti Mahasiswa Panel) */}
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-grow-1 p-4 overflow-auto bg-light"> 
                    <div className="container-fluid">
                        {children || <Outlet />} 
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="text-center text-muted p-2 border-top bg-white">
                    <small>© 2025 Sistem Penilaian Lapangan. Dosen Panel.</small>
                </footer>
            </div>
        </div>
    );
};

export default LayoutDosen;
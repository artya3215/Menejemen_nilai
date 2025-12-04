// src/pages/Dosen/DashboardDosenPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

// ************************************************************
// 1. DATA SIMULASI & MAPPING PATH
// ************************************************************
const STATISTIC_DATA = [
    { 
        title: "Total Kelas", 
        value: "12", 
        icon: "bi-book-fill", 
        bgColor: "bg-primary",
        path: "/dosen/kelas" 
    },
    { 
        title: "Tugas Aktif", 
        value: "5", 
        icon: "bi-check2-square", 
        bgColor: "bg-success",
        path: "/dosen/tugas" 
    },
    { 
        title: "Total Mahasiswa", 
        value: "185", 
        icon: "bi-person-badge-fill", 
        bgColor: "bg-warning",
        path: "/dosen/kelas" 
    },
    { 
        title: "Perlu Penilaian", 
        value: "14", 
        icon: "bi-hourglass-split", 
        bgColor: "bg-danger",
        path: "/dosen/penilaian" 
    },
];

const ACTIVITY_DATA = [
    { 
        id: 1, 
        message: "Tugas PW-2022 telah disubmit 90%", 
        type: "success", 
        icon: "bi-check-circle-fill" 
    },
    { 
        id: 2, 
        message: "Batas waktu penilaian tugas SI-2023 adalah besok.", 
        type: "warning", 
        icon: "bi-clock-fill" 
    },
];


// ************************************************************
// 2. KOMPONEN STATISTIC CARD (Menambahkan Handler Klik)
// ************************************************************
const StatisticCard = ({ title, value, icon, bgColor, onClick }) => (
    <div 
        className={`card shadow border-0 text-white h-100 ${bgColor}`}
        onClick={onClick} 
        style={{ cursor: 'pointer' }} 
    >
        <div className="card-body">
            <div className="row">
                <div className="col-8">
                    <h5 className="card-title fw-normal">{title}</h5>
                    <h1 className="card-text fw-bold">{value}</h1>
                </div>
                <div className="col-4 text-end">
                    <i className={`bi ${icon} display-4`}></i>
                </div>
            </div>
        </div>
    </div>
);

// ************************************************************
// 3. HALAMAN UTAMA DASHBOARD
// ************************************************************
const DashboardDosenPage = () => {
    const navigate = useNavigate(); 

    return (
        <div className="p-4"> 
            <h2 className="mb-4 text-secondary">Ringkasan Statistik</h2>
            {/* Kartu Statistik */}
            <div className="row g-4 mb-4">
                {STATISTIC_DATA.map((item, index) => (
                    <div className="col-lg-3 col-md-6" key={index}>
                        <StatisticCard 
                            title={item.title}
                            value={item.value}
                            icon={item.icon}
                            bgColor={item.bgColor}
                            // TERIKAT DENGAN HANDLER NAVIGASI
                            onClick={() => navigate(item.path)} 
                        />
                    </div>
                ))}
            </div>
            
            <div className="row g-4">
                {/* Kolom Kiri: Aktivitas Terbaru (Notifikasi) */}
                <div className="col-lg-6">
                    <div className="card shadow-sm p-4 text-dark h-100">
                        <h4>Aktivitas Terbaru (Notifikasi)</h4>
                        <p className="text-muted">Gunakan area ini untuk menampilkan "feed" notifikasi atau grafik ringkasan nilai.</p>
                        
                        <ul className="list-group list-group-flush">
                            {ACTIVITY_DATA.map(activity => (
                                <li key={activity.id} className="list-group-item">
                                    <i className={`bi ${activity.icon} me-2 text-${activity.type}`}></i>
                                    {activity.message}
                                </li>
                            ))}
                        </ul>
                        {ACTIVITY_DATA.length === 0 && (
                            <div className="alert alert-light text-center mt-3">
                                Tidak ada notifikasi terbaru.
                            </div>
                        )}
                    </div>
                </div>

                {/* Kolom Kanan: Grafik Ringkasan Nilai (Simulasi Grafik) */}
                <div className="col-lg-6">
                    <div className="card shadow-sm p-4 text-dark h-100">
                        <h4>Statistik Penilaian (Simulasi Grafik)</h4>
                        <p className="text-muted">Visualisasi progres penilaian atau distribusi nilai.</p>
                        
                        <div style={{ height: '200px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '8px' }} className="d-flex align-items-center justify-content-center mt-2">
                           <p className="text-muted mb-0">Placeholder: Grafik Ringkasan Penilaian Akan Muncul di Sini.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardDosenPage;
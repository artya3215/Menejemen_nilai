import React from 'react';
import { Link } from 'react-router-dom'; 
// Asumsi: Ikon Bootstrap/Font Awesome sudah terpasang.

const DashboardPage = () => {
    // Dummy Data Statistik
    const stats = [
        { 
            title: "Total Kelas Aktif", 
            value: 5, 
            color: "primary", 
            iconClass: "bi-book", 
            link: "/dosen/kelas" 
        },
        { 
            title: "Kelompok Perlu Dinilai", 
            value: 3, 
            color: "danger", 
            iconClass: "bi-exclamation-triangle-fill", 
            link: "/dosen/penilaian" // Mengarah ke daftar penilaian
        },
        { 
            title: "Tugas Aktif Saat Ini", 
            value: 8, 
            color: "success", 
            iconClass: "bi-check-circle-fill", 
            link: "/dosen/tugas" // Mengarah ke halaman buat tugas
        },
        { 
            title: "Total Mahasiswa Dibimbing", 
            value: 150, 
            color: "info", 
            iconClass: "bi-people-fill", 
            link: "/dosen/kelas" 
        },
    ];

    return (
        <div>
            <h2>Dashboard Dosen</h2>
            <p className="text-muted">Ringkasan aktivitas dan status penilaian Anda.</p>
            
            {/* Bagian Kartu Statistik (Visual Utama Dashboard) */}
            <div className="row mt-4">
                {stats.map((stat, index) => (
                    <div key={index} className="col-xl-3 col-md-6 mb-4">
                        {/* Kartu dengan border warna dan shadow */}
                        <div className={`card border-start border-5 border-${stat.color} shadow h-100`}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col mr-2">
                                        {/* Judul */}
                                        <div className={`text-xs fw-bold text-${stat.color} text-uppercase mb-1`}>
                                            {stat.title}
                                        </div>
                                        {/* Nilai */}
                                        <div className="h5 mb-2 fw-bold text-gray-800">{stat.value}</div>
                                        
                                        {/* Aksi Cepat */}
                                        <Link to={stat.link} className={`text-decoration-none text-${stat.color} small`}>
                                            Lihat Detail →
                                        </Link>
                                    </div>
                                    <div className="col-auto">
                                        {/* Ikon */}
                                        <i className={`bi ${stat.iconClass} fa-2x text-gray-300`}></i> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <hr/>

            {/* Bagian Informasi dan Pengingat */}
            <div className="row mt-4">
                <div className="col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 bg-light">
                            <h6 className="m-0 fw-bold text-primary">🔔 Pengingat Tugas Penting</h6>
                        </div>
                        <div className="card-body">
                            <p className="mb-2">
                                Anda memiliki **3 Kelompok** yang harus dinilai untuk tugas **Geologi Lapangan A**. 
                                Batas waktu pengiriman nilai: <span className="fw-bold text-danger">30 Desember 2025.</span>
                            </p>
                            <Link to="/dosen/penilaian" className="btn btn-sm btn-outline-danger">
                                Mulai Penilaian Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
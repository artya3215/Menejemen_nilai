// src/pages/Dosen/DashboardPage.jsx
import React from 'react';

const DashboardPage = () => {
    return (
        <div className="container-fluid">
            <h2>Dashboard Dosen</h2>
            <p className="text-muted">Selamat datang kembali! Ini adalah ringkasan kegiatan Anda.</p>
            
            <div className="row mt-4">
                {/* Kartu Ringkasan */}
                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-primary shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">2</h5>
                            <p className="card-text">Kelas Aktif</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-success shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">3</h5>
                            <p className="card-text">Tugas Lapangan</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-warning shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">4</h5>
                            <p className="card-text">Kelompok Belum Dinilai</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="card mt-4 p-3 bg-light">
                <p>⚠️ **AREA INTEGRASI BACKEND**</p>
                <p>Data pada dashboard ini perlu diisi dengan hasil penghitungan dari API backend Anda.</p>
            </div>
        </div>
    );
};

export default DashboardPage;
// src/pages/Mahasiswa/DashboardMahasiswaPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotifikasiModal from '../../components/NotifikasiModal'; 
// 🔥 LayoutMahasiswa TIDAK diimpor lagi
// import LayoutMahasiswa from '../../layouts/LayoutMahasiswa'; // TIDAK DIPAKAI

const DashboardMahasiswaPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        tugasAktif: 0, 
        ipk: 'N/A', 
        statusKelompok: 'Belum Terbentuk',
        notifikasi: [],
    });
    const [loading, setLoading] = useState(true);
    const [showNotifModal, setShowNotifModal] = useState(false); 

    useEffect(() => {
        const fetchData = async () => {
            const MOCK_HAS_KELOMPOK = true; 
            let statusKelompokDisplay = MOCK_HAS_KELOMPOK ? 'Sistem Informasi (Aktif)' : 'Belum Terbentuk'; 

            setTimeout(() => {
                setData({
                    tugasAktif: 2,
                    ipk: '3.75',
                    statusKelompok: statusKelompokDisplay, 
                    notifikasi: [
                        { id: 1, tipe: 'Tugas', pesan: 'Deadline Proyek Website tinggal 3 hari lagi!', waktu: '5 jam lalu' },
                        { id: 2, tipe: 'Nilai', pesan: 'Nilai mata kuliah Algoritma telah dirilis.', waktu: 'Kemarin' },
                    ],
                });
                setLoading(false);
            }, 1000); 
        };
        fetchData();
    }, []);

    if (loading) return <div>Memuat Dashboard...</div>;

    const unreadCount = data.notifikasi.length;

    const getShortStatus = (status) => {
        if (status === 'Belum Terbentuk') {
            return 'Belum Ada';
        }
        return status.split('(')[0].trim();
    };

    return (
        // 🔥 HANYA RETURN FRAGMENT/KONTEN, TIDAK ADA <LayoutMahasiswa>
        <> 
            {/* Header dan Tombol Notifikasi */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Halo, Selamat Datang!</h2>
                
                <button 
                    className="btn btn-lg btn-outline-primary position-relative" 
                    onClick={() => setShowNotifModal(true)}
                    title="Lihat Notifikasi Terbaru"
                >
                    <i className="bi bi-bell-fill"></i>
                    {unreadCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {unreadCount}
                            <span className="visually-hidden">notifikasi baru</span>
                        </span>
                    )}
                </button>
            </div>
            
            {/* Ringkasan Card (Fitur Navigasi) */}
            <div className="row">
                
                <div className="col-md-4 mb-4">
                    <div 
                        className="card text-white bg-warning shadow" 
                        onClick={() => navigate('/mahasiswa/tugas')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div><h4 className="mb-0">{data.tugasAktif}</h4><p className="card-text">Tugas Aktif</p></div>
                                <i className="bi bi-journal-check fs-2"></i>
                            </div>
                        </div>
                        <div className="card-footer small">Lihat Detail &raquo;</div>
                    </div>
                </div>
                
                <div className="col-md-4 mb-4">
                    <div 
                        className="card text-white bg-success shadow" 
                        onClick={() => navigate('/mahasiswa/nilai')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div><h4 className="mb-0">{data.ipk}</h4><p className="card-text">IPK Kumulatif</p></div>
                                <i className="bi bi-award-fill fs-2"></i>
                            </div>
                        </div>
                        <div className="card-footer small">Lihat KHS &raquo;</div>
                    </div>
                </div>
                
                <div className="col-md-4 mb-4">
                    <div 
                        className="card text-white bg-info shadow" 
                        onClick={() => navigate('/mahasiswa/kelompok')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div><h4 className="mb-0">{getShortStatus(data.statusKelompok)}</h4><p className="card-text">Status Kelompok</p></div>
                                <i className="bi bi-people-fill fs-2"></i>
                            </div>
                        </div>
                        <div className="card-footer small">Detail Kelompok &raquo;</div>
                    </div>
                </div>
            </div>

            <NotifikasiModal
                show={showNotifModal}
                onClose={() => setShowNotifModal(false)}
                notifikasiList={data.notifikasi}
            />
        </>
    );
};

export default DashboardMahasiswaPage;
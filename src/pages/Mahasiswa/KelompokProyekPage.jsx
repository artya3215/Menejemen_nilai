// src/pages/Mahasiswa/KelompokProyekPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 櫨 Impor Modal Kontak Dosen
import KontakDosenModal from '../../components/KontakDosenModal.jsx'; 
// 櫨 Hapus import LayoutMahasiswa jika masih ada

const KelompokProyekPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dataKelompok, setDataKelompok] = useState(null);
    // 櫨 State untuk mengontrol modal
    const [showContactModal, setShowContactModal] = useState(false); 

    useEffect(() => {
        // SIMULASI FETCH DATA KELOMPOK
        setTimeout(() => {
            const mockData = {
                namaProyek: "Sistem Informasi Akademik Next-Gen",
                dosenPembimbing: "Dr. Budi Santoso, M.Kom.",
                anggota: [
                    { nama: "Rani Wijaya", nim: "1219001", role: "Project Manager", isSaya: true },
                    { nama: "Tono Subroto", nim: "1219002", role: "Backend Developer", isSaya: false },
                    { nama: "Siska Dewi", nim: "1219003", role: "Frontend Developer", isSaya: false },
                ],
                statusProyek: "Tahap Pengembangan",
            };
            setDataKelompok(mockData);
            setLoading(false);
        }, 800);
    }, []);

    // 櫨 HANDLER BARU: Membuka modal
    const handleHubungiDosen = () => {
        setShowContactModal(true); 
    };
    
    // Perbaikan untuk Loading State (Menghapus Layout Wrapper ganda)
    if (loading) {
        return (
            <div className="p-4 text-center">
                <span className="spinner-border text-primary me-2"></span>
                Memuat data Kelompok Proyek...
            </div>
        );
    }
    
    if (!dataKelompok) {
        return (
            <div className="alert alert-warning">
                Anda belum terdaftar dalam kelompok proyek aktif.
            </div>
        );
    }

    return (
        <>
            <div className="container-fluid p-4">
                <h2 className="mb-4">
                    <i className="bi bi-people-fill me-2"></i> Kelompok Proyek Saya
                </h2>

                {/* 1. INFORMASI PROYEK & STATUS */}
                <div className="alert alert-info border-0 shadow-sm rounded-lg p-4">
                    <h4 className="alert-heading fw-bold text-dark">
                        {dataKelompok.namaProyek}
                    </h4> 
                    <p className="mb-1 text-dark">
                        Status Proyek: <strong className="badge bg-warning text-dark p-2">{dataKelompok.statusProyek}</strong>
                    </p>
                </div>

                {/* 2. DOSEN PEMBIMBING */}
                <div className="card shadow mb-4 rounded-lg">
                    <div className="card-header bg-primary text-white fw-bold">
                        <i className="bi bi-person-circle me-1"></i> Dosen Pembimbing
                    </div>
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{dataKelompok.dosenPembimbing}</strong>
                        </div>
                        {/* 櫨 TOMBOL TERIKAT KE HANDLER BARU */}
                        <button className="btn btn-sm btn-success rounded-pill" onClick={handleHubungiDosen}>
                            <i className="bi bi-chat-dots-fill me-1"></i> Hubungi Dosen
                        </button>
                    </div>
                </div>

                {/* 3. ANGGOTA KELOMPOK */}
                <div className="card shadow rounded-lg">
                    <div className="card-header fw-bold bg-light">
                        <i className="bi bi-people-fill me-1"></i> Anggota Kelompok
                    </div>
                    <ul className="list-group list-group-flush">
                        {dataKelompok.anggota.map((anggota) => (
                            <li key={anggota.nim} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong className={anggota.isSaya ? 'text-primary' : ''}>
                                        {anggota.nama}
                                    </strong> 
                                    <span className="text-muted ms-2">({anggota.nim})</span>
                                    {anggota.isSaya && <span className="badge bg-primary ms-2">Saya</span>}
                                </div>
                                <span className={`badge p-2 bg-${anggota.role === 'Project Manager' ? 'danger' : 'secondary'}`}>
                                    {anggota.role}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="mt-4">
                    <button 
                        className="btn btn-lg btn-primary shadow-sm rounded-pill" 
                        onClick={() => navigate('/mahasiswa/tugas')}
                    >
                        <i className="bi bi-file-earmark-text-fill me-2"></i> Lihat Tugas Proyek
                    </button>
                </div>
            </div>
            
            {/* 櫨 MODAL KONTAK DOSEN DIAKTIFKAN */}
            <KontakDosenModal
                show={showContactModal}
                onClose={() => setShowContactModal(false)}
                dosenName={dataKelompok ? dataKelompok.dosenPembimbing : ''}
            />
        </>
    );
};

export default KelompokProyekPage;
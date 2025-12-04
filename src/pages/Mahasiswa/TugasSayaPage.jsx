// src/pages/Mahasiswa/TugasSayaPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DetailSubmissionModal from '../../components/DetailSubmissionModal'; 

const TugasSayaPage = () => {
    const navigate = useNavigate();
    const [tugasList, setTugasList] = useState([]); // State diinisialisasi kosong
    const [loading, setLoading] = useState(true); // State loading
    const [showDetailModal, setShowDetailModal] = useState(false); 
    const [selectedTugas, setSelectedTugas] = useState(null); 

    // 🔥 FUNGSI UTAMA: MENGGANTIKAN DATA STATIS DENGAN SIMULASI FETCH API
    useEffect(() => {
        const fetchTugasList = async () => {
            setLoading(true);
            
            // 🚨 SIMULASI PANGGILAN API UNTUK MENGAMBIL DAFTAR TUGAS TERBARU
            // [API CALL]: GET /api/mahasiswa/tugas
            
            setTimeout(() => {
                const mockData = [
                    // Data ini meniru data yang di-fetch dari database
                    { id: 1, nama: 'Proyek Website', deadline: '2025-12-15', status: 'Draft', file: 'proyek_website_draft.zip', deskripsi: 'Hanya kerangka awal.', tanggalSubmit: '2025-11-01' },
                    { id: 2, nama: 'Dokumentasi Teknis', deadline: '2025-11-30', status: 'Submitted', file: 'dokumen_final_v3.pdf', deskripsi: 'Dokumentasi lengkap sesuai spesifikasi V3.', tanggalSubmit: '2025-11-28' },
                    { id: 3, nama: 'Laporan Mingguan #1', deadline: '2025-11-20', status: 'Nilai Dirilis', file: 'laporan_mingguan_1.pdf', deskripsi: null, tanggalSubmit: '2025-11-19' },
                    { id: 4, nama: 'Design UI/UX', deadline: '2025-12-25', status: 'Belum Dikerjakan', file: null, deskripsi: null, tanggalSubmit: null },
                ];
                
                setTugasList(mockData);
                setLoading(false);
            }, 500); // Simulasi delay API
        };

        fetchTugasList();
    }, []); // Array dependency kosong agar hanya dijalankan sekali saat mount

    // Fungsi helper untuk badge (tetap sama)
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Draft': return 'bg-warning text-dark';
            case 'Submitted': return 'bg-success';
            case 'Nilai Dirilis': return 'bg-primary';
            case 'Belum Dikerjakan': return 'bg-secondary';
            default: return 'bg-secondary';
        }
    };

    // Fungsi Aksi Tombol (tetap sama)
    const handleAksi = (tugas) => {
        if (tugas.status === 'Draft' || tugas.status === 'Belum Dikerjakan') {
            navigate(`/mahasiswa/tugas/submit/${tugas.id}`);
            
        } else if (tugas.status === 'Nilai Dirilis') {
            // PERBAIKAN: Mengarahkan ke modal Nilai Kelompok (atau halaman detail nilai tugas)
            navigate('/mahasiswa/nilai'); 

        } else if (tugas.status === 'Submitted') {
            // [API CALL]: GET /api/submission/:tugasId - (Data diambil saat modal dibuka)
            setSelectedTugas(tugas);
            setShowDetailModal(true); 
        }
    };

    // Tampilan Loading
    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-3">Memuat Daftar Tugas...</span>
        </div>
    );
    
    // Tampilan Utama
    return (
        <>
            <h2 className="mb-4"><i className="bi bi-journal-check me-2"></i> Tugas Saya</h2>
            <div className="alert alert-info border-0 shadow-sm">
                Tombol **"Submit Tugas"** / **"Lanjutkan Submit"** akan membawa Anda ke form unggah.
            </div>
            
            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nama Tugas</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Rendering menggunakan data dari state tugasList */}
                            {tugasList.map((tugas, index) => (
                                <tr key={tugas.id}>
                                    <td>{index + 1}</td>
                                    <td>{tugas.nama}</td>
                                    <td>{tugas.deadline}</td>
                                    <td><span className={`badge ${getStatusBadge(tugas.status)}`}>{tugas.status}</span></td>
                                    <td>
                                        <button 
                                            className={`btn btn-sm ${
                                                tugas.status === 'Nilai Dirilis' ? 'btn-primary' : 
                                                tugas.status === 'Submitted' ? 'btn-outline-secondary' : 
                                                'btn-success' 
                                            }`}
                                            onClick={() => handleAksi(tugas)}
                                        >
                                            {tugas.status === 'Draft' ? 'Lanjutkan Submit' :
                                             tugas.status === 'Belum Dikerjakan' ? 'Submit Tugas' :
                                             tugas.status === 'Nilai Dirilis' ? 'Lihat Nilai' :
                                             'Lihat Detail'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <DetailSubmissionModal
                show={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                submissionData={selectedTugas}
            />
        </>
    );
};

export default TugasSayaPage;
// src/pages/Dosen/TugasDetailPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import api from '../../utils/api'; 
import AturKelompokModal from '../../components/AturKelompokModal'; // <<<< PATH SUDAH BENAR

const TugasDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tugas, setTugas] = useState(null);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    // 💡 State untuk Modal
    const [showAturModal, setShowAturModal] = useState(false);
    
    // Asumsi Total Mahasiswa di Kelas Tugas ini
    const totalMhsKelas = 25; 

    // --- FUNGSI FETCH DATA TUGAS & KELOMPOK (Dibuat useCallback untuk kemudahan refresh) ---
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // Simulasi Fetch Detail Tugas dan Kelompok
            const mockTugas = { id: id, judul: `Tugas Lapangan ke-${id}`, lokasi: 'Lokal', status: 'aktif' };
            const mockGroups = [
                { id: 1, nama: 'Kelompok 1', anggota: 5, status: 'Sudah Dibentuk' },
                { id: 2, nama: 'Kelompok 2', anggota: 5, status: 'Sudah Dibentuk' },
            ];
            setTugas(mockTugas);
            setGroups(mockGroups);
        } catch (error) {
             console.error('Gagal mengambil detail tugas', error);
        } finally {
             setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    // ------------------------------------------

    // 💡 HANDLER BARU: Dijalankan setelah kelompok dibuat dari Modal
    const handleGroupCreated = ({ totalKelompok, metode }) => {
        if (metode === 'manual') {
            // Navigasi ke form pemilihan manual
            console.log("Navigasi ke halaman pemilihan anggota manual.");
            // navigate(`/dosen/tugas/${id}/kelompok/manual`);
        } else {
            // Refresh data kelompok (simulasi)
            fetchData();
        }
    };
    
    // HANDLER UNTUK TOMBOL ATUR PEMBENTUKAN
    const handleAturPembentukan = () => {
        setShowAturModal(true); // Membuka Modal
    };

    // HANDLER UNTUK TOMBOL LIHAT ANGGOTA
    const handleLihatAnggota = (groupId) => {
        // PERBAIKAN: Mengganti alert() dengan konsol log simulasi atau membuka modal/halaman
        console.log(`Simulasi: Membuka modal untuk melihat anggota Kelompok ${groupId}.`);
        // setShowAnggotaModal(true);
    };
    // ------------------------------------------

    if (loading) return <p>Memuat detail tugas...</p>;
    if (!tugas) return <div className="alert alert-danger">Detail Tugas tidak ditemukan.</div>;

    return (
        <div className="container-fluid">
            <button onClick={() => navigate('/dosen/tugas')} className="btn btn-sm btn-secondary mb-3">
                <i className="bi bi-arrow-left"></i> Kembali ke Daftar Tugas
            </button>
            <h2 className="mb-2">Detail Tugas: {tugas.judul}</h2>
            <p className="text-muted">Lokasi: {tugas.lokasi} | Status: <span className={`badge bg-${tugas.status === 'aktif' ? 'success' : 'secondary'}`}>{tugas.status}</span></p>

            <div className="card shadow mt-4">
                <div className="card-header bg-success text-white">
                    Pembentukan Kelompok
                </div>
                <div className="card-body">
                    <p>Total Mahasiswa: **{totalMhsKelas}** orang.</p>
                    {/* TOMBOL ATUR PEMBENTUKAN KELOMPOK */}
                    <button className="btn btn-warning mb-3" onClick={handleAturPembentukan}>
                        <i className="bi bi-people-fill"></i> Atur Pembentukan Kelompok
                    </button>
                    
                    {/* Tabel Kelompok */}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nama Kelompok</th>
                                <th>Jumlah Anggota</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((group) => (
                                <tr key={group.id}>
                                    <td>{group.nama}</td>
                                    <td>{group.anggota} orang</td>
                                    <td>{group.status}</td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-outline-info" 
                                            onClick={() => handleLihatAnggota(group.id)}
                                        >
                                            Lihat Anggota
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* 💡 MODAL UNTUK PENGATURAN KELOMPOK */}
            <AturKelompokModal
                show={showAturModal}
                onClose={() => setShowAturModal(false)}
                taskId={tugas.id}
                totalMahasiswa={totalMhsKelas}
                onGroupCreated={handleGroupCreated}
            />
        </div>
    );
};

export default TugasDetailPage;
// src/pages/Dosen/TugasDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import api from '../../../utils/api'; 

const TugasDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tugas, setTugas] = useState(null);
    const [groups, setGroups] = useState([]);

    // --- TITIK INTEGRASI: FUNGSI FETCH DATA TUGAS & KELOMPOK ---
    useEffect(() => {
        // --- SIMULASI ---
        // Asumsi data tugas yang lebih lengkap (misalnya kelasId)
        setTugas({ id: id, judul: `Tugas Lapangan ke-${id}`, lokasi: 'Lokal', status: 'aktif' });
        // Data Kelompok simulasi
        setGroups([
            { id: 1, nama: 'Kelompok 1', anggota: 5, status: 'Sudah Dibentuk' },
            { id: 2, nama: 'Kelompok 2', anggota: 5, status: 'Belum Dibentuk' },
        ]);
    }, [id]);
    // ------------------------------------------

    // 🔥 HANDLER UNTUK TOMBOL ATUR PEMBENTUKAN
    const handleAturPembentukan = () => {
        // Simulasi Aksi: Membuka modal/halaman untuk mengatur kelompok (otomatis/manual)
        alert("Simulasi: Navigasi ke form Pengaturan Pembentukan Kelompok (Otomatis/Manual).");
        // Di aplikasi nyata: navigate(`/dosen/tugas/${id}/atur-kelompok`)
    };

    // 🔥 HANDLER UNTUK TOMBOL LIHAT ANGGOTA
    const handleLihatAnggota = (groupId) => {
        // Simulasi Aksi: Membuka modal/tabel untuk melihat anggota kelompok
        alert(`Simulasi: Membuka modal untuk melihat anggota Kelompok ${groupId}.`);
    };
    // ------------------------------------------

    if (!tugas) return <p>Memuat detail tugas...</p>;

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
                    <p>Halaman ini akan digunakan untuk fitur pembentukan kelompok ({tugas.judul}).</p>
                    {/* 🔥 TOMBOL ATUR PEMBENTUKAN KELOMPOK */}
                    <button className="btn btn-warning mb-3" onClick={handleAturPembentukan}>
                        <i className="bi bi-people-fill"></i> Atur Pembentukan Kelompok
                    </button>
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
                            {/* 🔥 DATA KELOMPOK DITAMPILKAN DI SINI */}
                            {groups.map((group) => (
                                <tr key={group.id}>
                                    <td>{group.nama}</td>
                                    <td>{group.anggota} orang</td>
                                    <td>{group.status}</td>
                                    {/* 🔥 TOMBOL LIHAT ANGGOTA */}
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
        </div>
    );
};

export default TugasDetailPage;
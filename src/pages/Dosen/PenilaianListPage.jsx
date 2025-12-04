// src/pages/Dosen/PenilaianListPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import api from '../../utils/api'; 

// --- DATA DUMMY UNTUK FILTER (Harusnya dari API) ---
const DUMMY_KELAS = [
    { id: '1', nama: 'TI-2022', mataKuliah: 'Pemrograman Web' },
    { id: '2', nama: 'SI-2023', mataKuliah: 'Sistem Informasi' },
];

const DUMMY_TUGAS = [
    { id: '101', kelasId: '1', judul: 'Ekskursi Karangsambung' },
    { id: '102', kelasId: '2', judul: 'Pemetaan Kampus' },
    { id: '103', kelasId: '1', judul: 'Proyek Akhir' },
];

// Data Kelompok (Contoh: Kelompok 101 dan 102 terkait Tugas 101, Kelompok 103 terkait Tugas 102)
const DUMMY_KELOMPOK = [
    { id: 101, nama: 'Kelompok 1 (PW)', tugasId: '101', ketua: 'Budi Santoso', status: 'Belum Dinilai' },
    { id: 102, nama: 'Kelompok 2 (PW)', tugasId: '101', ketua: 'Siti Aminah', status: 'Draft' },
    { id: 103, nama: 'Kelompok 3 (SI)', tugasId: '102', ketua: 'Dedi Corbuzier', status: 'Final' },
];
// ----------------------------------------------------


const PenilaianListPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // State Filter
    const [kelasId, setKelasId] = useState('');
    const [tugasId, setTugasId] = useState('');
    const [filteredGroups, setFilteredGroups] = useState([]);


    // 1. Fungsi Filter dan Fetch Kelompok (Menggunakan Dummy Lokal)
    const fetchFilteredGroups = useCallback(() => {
        setLoading(true);
        // Dalam implementasi nyata: Panggil API: await api.get(`/dosen/tugas/${tugasId}/penilaian/list`);

        if (!tugasId) {
            setFilteredGroups([]);
            setLoading(false);
            return;
        }

        setTimeout(() => {
            const list = DUMMY_KELOMPOK.filter(g => g.tugasId === tugasId);
            setFilteredGroups(list);
            setLoading(false);
        }, 300);
    }, [tugasId]);
    
    useEffect(() => {
        fetchFilteredGroups();
    }, [fetchFilteredGroups]);


    // Handler ketika Tugas diubah (memicu fetchFilteredGroups)
    const handleTugasChange = (e) => {
        setTugasId(e.target.value); 
        // fetchFilteredGroups akan terpanggil melalui dependency useEffect
    };

    // Filter tugas berdasarkan kelas yang dipilih
    const tugasOptions = DUMMY_TUGAS.filter(t => t.kelasId === kelasId);


    return (
        <div className="container-fluid">
            <h2 className="mb-4">Daftar Kelompok Tugas yang Perlu Dinilai</h2>
            
            {/* 💡 KONTEN INTERAKTIF BARU: FILTER PILIH TUGAS (Sesuai Activity Diagram) */}
            <div className="card mb-4 p-3 shadow-sm">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Pilih Kelas</label>
                        <select 
                            className="form-select" 
                            value={kelasId} 
                            onChange={(e) => { setKelasId(e.target.value); setTugasId(''); }}
                        >
                            <option value="">-- Pilih Kelas --</option>
                            {DUMMY_KELAS.map(k => (
                                <option key={k.id} value={k.id}>{k.nama} - {k.mataKuliah}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Pilih Tugas Lapangan</label>
                        <select 
                            className="form-select" 
                            value={tugasId} 
                            onChange={handleTugasChange} 
                            disabled={!kelasId} 
                        >
                            <option value="">-- Pilih Tugas --</option>
                            {tugasOptions.map(t => (
                                <option key={t.id} value={t.id}>{t.judul}</option> 
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            {/* ------------------------------------------------------------------- */}

            {/* KONDISI: Jika Tugas sudah dipilih */}
            {tugasId ? (
                <div className="card shadow">
                    <div className="card-body">
                        {loading && <div className="text-center py-3">Memuat daftar kelompok...</div>}

                        {!loading && filteredGroups.length === 0 && (
                            <div className="alert alert-info">Belum ada kelompok terbentuk atau data tidak ditemukan untuk tugas ini.</div>
                        )}

                        {!loading && filteredGroups.length > 0 && (
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Nama Kelompok</th>
                                        <th>Ketua Kelompok</th>
                                        <th>Status Penilaian</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredGroups.map((g) => (
                                        <tr key={g.id}>
                                            <td className="fw-bold">{g.nama}</td>
                                            <td>{g.ketua}</td>
                                            <td>
                                                <span className={`badge ${
                                                    g.status === 'Final' ? 'bg-success' : 
                                                    g.status === 'Draft' ? 'bg-warning text-dark' : 'bg-danger'
                                                }`}>
                                                    {g.status}
                                                </span>
                                            </td>
                                            <td>
                                                {/* 🔥 Aksi: Memilih Kelompok (Sesuai PNL-001 dan Activity Diagram) */}
                                                <button 
                                                    className="btn btn-sm btn-primary"
                                                    // Mengarahkan ke RUTE BARU: /dosen/penilaian/:tugasId/:kelompokId
                                                    onClick={() => navigate(`/dosen/penilaian/${g.tugasId}/${g.id}`)}
                                                >
                                                    <i className="bi bi-pencil-square"></i> {g.status === 'Final' ? 'Lihat Nilai' : 'Nilai Sekarang'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            ) : (
                <div className="alert alert-warning">Silakan pilih **Kelas** dan **Tugas Lapangan** di atas untuk menampilkan daftar kelompok penilaian.</div>
            )}
        </div>
    );
};

export default PenilaianListPage;
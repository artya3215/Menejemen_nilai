// src/pages/Dosen/PenilaianListPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// LayoutDosen DIHAPUS
// import api from '../../../utils/api';

const PenilaianListPage = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // --- TITIK INTEGRASI: FUNGSI FETCH DATA KELOMPOK ---
    useEffect(() => {
        /*
        const fetchGroups = async () => {
            try {
                // Asumsi kita menilai kelompok untuk tugas/kelas tertentu
                const response = await api.get('/dosen/penilaian/list'); 
                setGroups(response.data.data);
            } catch (error) {
                console.error('Gagal mengambil data kelompok', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
        */
        // --- SIMULASI ---
        setGroups([
            { id: 101, nama: 'Kelompok 1 (PW)', tugasId: 101, ketua: 'Budi Santoso', status: 'Belum Dinilai' },
            { id: 102, nama: 'Kelompok 2 (PW)', tugasId: 101, ketua: 'Siti Aminah', status: 'Draft' },
            { id: 103, nama: 'Kelompok 3 (SI)', tugasId: 102, ketua: 'Dedi Corbuzier', status: 'Final' },
        ]);
        setLoading(false);
    }, []);
    // ------------------------------------------

    if (loading) return <div className="text-center">Memuat daftar kelompok...</div>;

    // 🔥 HANYA RETURN KONTEN UTAMA (Tanpa LayoutDosen)
    return (
        <div className="container-fluid">
            <h2 className="mb-4">Daftar Kelompok Tugas yang Perlu Dinilai</h2>
            <div className="alert alert-info">Pilih kelompok untuk mulai memberikan penilaian.</div>

            <div className="card shadow">
                <div className="card-body">
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
                            {groups.map((g) => (
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
                                        <button 
                                            className="btn btn-sm btn-primary"
                                            // Mengarahkan ke FormPenilaianPage dengan ID Kelompok
                                            onClick={() => navigate(`/dosen/penilaian/${g.id}`)}
                                        >
                                            <i className="bi bi-pencil-square"></i> {g.status === 'Final' ? 'Lihat Nilai' : 'Nilai Sekarang'}
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

export default PenilaianListPage;
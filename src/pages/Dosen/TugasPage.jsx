// src/pages/Dosen/TugasPage.jsx

import React, { useState, useEffect } from 'react';
import LayoutDosen from '../../layouts/LayoutDosen';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const TugasPage = () => {
    const [tugasList, setTugasList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchTugas = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get('/dosen/tugas'); 
                setTugasList(response.data.data);
            } catch (err) {
                console.error("Fetch Tugas Error:", err);
                setError('Gagal memuat data tugas. Cek koneksi API.');
            } finally {
                setLoading(false);
            }
        };
        fetchTugas();
    }, []);

    const filteredTugas = tugasList.filter(t =>
        t.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.kelas.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handler untuk navigasi ke halaman Kelompok (PNL-001) atau Penilaian (PNL-002)
    const handleAction = (id, action) => {
        if (action === 'kelompok') {
            navigate(`/dosen/tugas/${id}/kelompok`); 
        } else if (action === 'nilai') {
            navigate(`/dosen/tugas/${id}/penilaian`); 
        }
    };

    return (
        <LayoutDosen>
            <h2>Manajemen Tugas Lapangan</h2>
            <p className="lead">Daftar tugas lapangan yang sedang dan telah dilaksanakan.</p>

            <div className="card shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Cari Judul Tugas / Kelas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* Navigasi Buat Tugas Baru (Mengarah ke TugasCreatePage.jsx) */}
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/dosen/tugas/create')}
                    >
                        <i className="bi bi-plus-lg me-1"></i> Buat Tugas Baru
                    </button>
                </div>

                {loading && <div className="text-center">Memuat data tugas...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {!loading && !error && filteredTugas.length > 0 && (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Judul Tugas</th>
                                    <th>Kelas</th>
                                    <th>Lokasi</th>
                                    <th>Tanggal</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTugas.map((t) => (
                                    <tr key={t.id}>
                                        <td>{t.judul}</td>
                                        <td>{t.kelas}</td>
                                        <td>{t.lokasi}</td>
                                        <td>{t.tanggalPelaksanaan}</td>
                                        <td>
                                            <span className={`badge bg-${t.status === 'aktif' ? 'success' : t.status === 'selesai' ? 'secondary' : 'warning'}`}>
                                                {t.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            {/* Tombol Aksi Kelompok (PNL-001) */}
                                            <button 
                                                className="btn btn-sm btn-info me-2"
                                                onClick={() => handleAction(t.id, 'kelompok')}
                                            >
                                                Kelompok
                                            </button>
                                            {/* Tombol Aksi Nilai (PNL-002) */}
                                            <button 
                                                className="btn btn-sm btn-warning"
                                                onClick={() => handleAction(t.id, 'nilai')}
                                            >
                                                Nilai
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {!loading && !error && filteredTugas.length === 0 && <div className="alert alert-info">Tidak ada tugas lapangan yang ditemukan.</div>}
            </div>
        </LayoutDosen>
    );
};

export default TugasPage;
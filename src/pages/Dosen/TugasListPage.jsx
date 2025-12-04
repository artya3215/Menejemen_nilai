// src/pages/Dosen/TugasListPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api'; 

const TugasListPage = () => {
    const navigate = useNavigate();

    const [tugasList, setTugasList] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🔥 Fungsi Fetch Tugas: Memuat data dari API Mock
    useEffect(() => {
        const fetchTugas = async () => {
            setLoading(true);
            setError(null);

            try {
                // Panggil API untuk mendapatkan daftar tugas
                const response = await api.get('/dosen/tugas'); 
                setTugasList(response.data.data);
                setError(null); 
            } catch (err) {
                console.error("Fetch Tugas Error:", err);
                // Jika terjadi kegagalan fetch dari mock API, tampilkan error yang jelas
                setError('Gagal memuat data tugas. Cek apakah endpoint /dosen/tugas di api.js sudah benar.');
                setTugasList([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchTugas();
    }, []); 
    
    // Handler Hapus Tugas
    const handleDelete = async (id, status) => {
        if (status === 'aktif') {
            alert("PERINGATAN: Tugas yang sedang aktif tidak bisa dihapus.");
            return;
        }

        if (!window.confirm("Yakin ingin menghapus tugas ini? Kelompok dan nilai terkait akan hilang.")) return;
        
        try {
            await api.delete(`/dosen/tugas/${id}`);
            // Simulasi penghapusan di Front-end
            setTugasList(tugasList.filter(t => t.id !== id));
            alert('Tugas berhasil dihapus (Simulasi).');
        } catch (error) {
            alert('Gagal menghapus tugas. Cek API Mock.');
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Daftar Tugas Lapangan</h2>
                <Link to="/dosen/tugas/baru" className="btn btn-success">
                    <i className="bi bi-plus-lg"></i> Buat Tugas Baru
                </Link>
            </div>
            
            {loading && <div className="text-center">Memuat data tugas...</div>}
            {error && <div className="alert alert-danger">{error}</div>} 
            
            <div className="row">
                {tugasList.length === 0 && !loading && !error ? (
                    <div className="alert alert-warning">Belum ada tugas lapangan yang dibuat.</div>
                ) : (
                    tugasList.map((tugas) => (
                        <div key={tugas.id} className="col-md-6 mb-3">
                            <div className="card shadow-sm border">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="card-title">{tugas.judul}</h5>
                                        <span className={`badge ${tugas.status === 'aktif' ? 'bg-success' : 'bg-secondary'}`}>
                                            {tugas.status}
                                        </span>
                                    </div>
                                    <p className="card-text text-muted mb-1"><i className="bi bi-geo-alt"></i> {tugas.lokasi}</p>
                                    <p className="card-text text-muted"><i className="bi bi-calendar"></i> {tugas.tanggalPelaksanaan}</p>
                                    
                                    <button 
                                        onClick={() => navigate(`/dosen/tugas/${tugas.id}`)}
                                        className="btn btn-sm btn-outline-info me-2"
                                    >
                                        Detail & Kelompok
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleDelete(tugas.id, tugas.status)}
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TugasListPage;
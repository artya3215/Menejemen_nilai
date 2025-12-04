// src/pages/Dosen/TugasListPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api'; 

const TugasListPage = () => {
    const navigate = useNavigate();

    const [tugasList, setTugasList] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🔥 Fungsi Fetch Tugas: Memuat data dari API Mock + LocalStorage
    useEffect(() => {
        const fetchTugas = async () => {
            setLoading(true);
            setError(null);

            try {
                // 1. Ambil data statis dari mock API
                const response = await api.get('/dosen/tugas'); 
                const staticTasks = response.data.data;
                
                // 2. Ambil data yang dibuat pengguna dari localStorage
                const localTasks = JSON.parse(localStorage.getItem('userTasks')) || [];
                
                // 3. Gabungkan data. Filter duplikat (untuk keamanan) dan gabungkan
                const combinedList = [...staticTasks.filter(st => !localTasks.some(lt => lt.id === st.id)), ...localTasks];
                
                setTugasList(combinedList);
                setError(null); 
            } catch (err) {
                console.error("Fetch Tugas Error:", err);
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
            if (!window.confirm("PERINGATAN: Tugas yang sedang aktif tidak bisa dihapus. Lanjutkan untuk simulasi?")) return;
        }

        if (!window.confirm("Yakin ingin menghapus tugas ini? Kelompok dan nilai terkait akan hilang.")) return;
        
        try {
            // Cek apakah tugas ada di localStorage (dibuat user)
            const localTasks = JSON.parse(localStorage.getItem('userTasks')) || [];
            const isLocalTask = localTasks.some(t => t.id === id);

            if (isLocalTask) {
                // Hapus dari LocalStorage
                const updatedLocalTasks = localTasks.filter(t => t.id !== id);
                localStorage.setItem('userTasks', JSON.stringify(updatedLocalTasks));
            } else {
                // Simulasi Hapus dari Backend/Mock API (untuk tugas statis)
                await api.delete(`/dosen/tugas/${id}`);
            }

            // Update state di Front-end
            setTugasList(tugasList.filter(t => t.id !== id));
            console.log('Tugas berhasil dihapus (Simulasi).');
        } catch (error) {
            console.error('Gagal menghapus tugas. Cek API Mock.', error);
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
                                        <span className={`badge ${tugas.status === 'aktif' ? 'bg-success' : tugas.status === 'selesai' ? 'bg-secondary' : 'bg-warning'}`}>
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
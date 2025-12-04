// src/pages/Dosen/Tugas/TugasListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import api from '../../../utils/api';

const TugasListPage = () => {
    const navigate = useNavigate();

    // Data disimpan di localStorage untuk simulasi persistence tanpa backend
    const [tugasList, setTugasList] = useState(() => {
        const savedTugas = localStorage.getItem('fieldTasks');
        return savedTugas ? JSON.parse(savedTugas) : [
            { id: 1, judul: 'Ekskursi Karangsambung', lokasi: 'Kebumen', tanggal: '2024-12-10', status: 'Aktif' },
            { id: 2, judul: 'Pemetaan Kampus', lokasi: 'Area Kampus', tanggal: '2024-11-20', status: 'Selesai' },
        ];
    });

    useEffect(() => {
        localStorage.setItem('fieldTasks', JSON.stringify(tugasList));
        
        // --- TITIK INTEGRASI: FUNGSI FETCH DATA ---
        /*
        const fetchTugas = async () => {
            try {
                const response = await api.get('/dosen/tugas'); 
                // setTugasList(response.data);
            } catch (error) {
                console.error('Gagal mengambil data tugas', error);
            }
        };
        // fetchTugas();
        */
    }, [tugasList]);

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus tugas ini?")) return;
        
        // --- TITIK INTEGRASI: FUNGSI DELETE ---
        /*
        try {
            await api.delete(`/dosen/tugas/${id}`);
            setTugasList(tugasList.filter(t => t.id !== id));
            alert('Tugas berhasil dihapus.');
        } catch (error) {
            alert('Gagal menghapus tugas.');
        }
        */
        // --- SIMULASI ---
        setTugasList(tugasList.filter(t => t.id !== id));
        alert('Tugas berhasil dihapus (Simulasi)');
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Daftar Tugas Lapangan</h2>
                <Link to="/dosen/tugas/baru" className="btn btn-success">
                    <i className="bi bi-plus-lg"></i> Buat Tugas Baru
                </Link>
            </div>

            <div className="row">
                {tugasList.length === 0 ? (
                    <div className="alert alert-warning">Belum ada tugas lapangan yang dibuat.</div>
                ) : (
                    tugasList.map((tugas) => (
                        <div key={tugas.id} className="col-md-6 mb-3">
                            <div className="card shadow-sm border-start border-4 border-primary">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="card-title">{tugas.judul}</h5>
                                        <span className={`badge ${tugas.status === 'Aktif' ? 'bg-success' : 'bg-secondary'}`}>
                                            {tugas.status}
                                        </span>
                                    </div>
                                    <p className="card-text text-muted mb-1"><i className="bi bi-geo-alt"></i> {tugas.lokasi}</p>
                                    <p className="card-text text-muted"><i className="bi bi-calendar"></i> {tugas.tanggal}</p>
                                    <button 
                                        onClick={() => navigate(`/dosen/tugas/${tugas.id}`)}
                                        className="btn btn-sm btn-outline-info me-2"
                                    >
                                        Detail & Kelompok
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(tugas.id)}
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
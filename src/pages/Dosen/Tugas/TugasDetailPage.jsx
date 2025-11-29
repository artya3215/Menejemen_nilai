// src/pages/Dosen/Tugas/TugasDetailPage.jsx
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
        /*
        const fetchData = async () => {
            try {
                const response = await api.get(`/dosen/tugas/${id}`); 
                setTugas(response.data.tugas);
                setGroups(response.data.groups); // Daftar kelompok
            } catch (error) {
                console.error('Gagal mengambil detail tugas', error);
            }
        };
        fetchData();
        */
        // --- SIMULASI ---
        setTugas({ id: id, judul: `Tugas Lapangan ke-${id}`, lokasi: 'Lokal' });
        setGroups([
            { id: 1, nama: 'Kelompok 1', anggota: 5, status: 'Sudah Dibentuk' },
            { id: 2, nama: 'Kelompok 2', anggota: 5, status: 'Belum Dibentuk' },
        ]);
    }, [id]);

    if (!tugas) return <p>Memuat detail tugas...</p>;

    return (
        <div className="container-fluid">
            <button onClick={() => navigate('/dosen/tugas')} className="btn btn-sm btn-secondary mb-3">
                <i className="bi bi-arrow-left"></i> Kembali ke Daftar Tugas
            </button>
            <h2 className="mb-2">Detail Tugas: {tugas.judul}</h2>
            <p className="text-muted">Lokasi: {tugas.lokasi}</p>

            <div className="card shadow mt-4">
                <div className="card-header bg-success text-white">
                    Pembentukan Kelompok
                </div>
                <div className="card-body">
                    <button className="btn btn-warning mb-3">
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
                            {groups.map((group) => (
                                <tr key={group.id}>
                                    <td>{group.nama}</td>
                                    <td>{group.anggota} orang</td>
                                    <td>{group.status}</td>
                                    <td><button className="btn btn-sm btn-outline-info">Lihat Anggota</button></td>
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
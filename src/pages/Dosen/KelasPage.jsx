// src/pages/Dosen/KelasPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutDosen from '../../layouts/LayoutDosen';
import api from '../../utils/api'; // Import mock API

const KelasPage = () => {
    const navigate = useNavigate();
    const [dataKelas, setDataKelas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchKelas = async () => {
            try {
                const response = await api.get('/dosen/kelas');
                setDataKelas(response.data.data);
            } catch (err) {
                setError("Gagal memuat data kelas. Mohon cek API/Mock data.");
            } finally {
                setLoading(false);
            }
        };

        fetchKelas();
    }, []);

    // --- FUNGSI NAVIGASI YANG DITAMBAHKAN ---
    
    const handleAdd = () => {
        // Navigasi ke halaman pembuatan kelas
        navigate('/dosen/kelas/create'); 
    };

    const handleEdit = (id) => {
        // Navigasi ke halaman edit kelas (misalnya ke PlaceholderPage untuk saat ini)
        // Kita gunakan path placeholder untuk demonstrasi
        navigate(`/dosen/kelas/${id}/edit`);
    };

    const handleDetail = (id) => {
        // Navigasi ke halaman detail kelas (misalnya ke PlaceholderPage untuk saat ini)
        navigate(`/dosen/kelas/${id}/detail`);
    };

    const handleDelete = (id, nama) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus kelas ${nama}? (Hanya Simulasi)`)) {
            // Logika penghapusan (simulasi)
            console.log(`[SIMULASI] Menghapus kelas ID: ${id}`);
            setDataKelas(prev => prev.filter(kelas => kelas.id !== id));
            // Di produksi: kirim request DELETE ke API
        }
    };

    // ------------------------------------------

    if (loading) {
        return <LayoutDosen><div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div><p>Memuat data kelas...</p></div></LayoutDosen>;
    }

    return (
        <LayoutDosen>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Manajemen Kelas Anda</h3>
                <button className="btn btn-primary" onClick={handleAdd}>
                    <i className="bi bi-plus-lg me-2"></i> Tambah Kelas Baru
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nama Kelas</th>
                                    <th>Mata Kuliah</th>
                                    <th className='text-center'>Jml. Mhs</th>
                                    <th className='text-center'>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataKelas.length > 0 ? (
                                    dataKelas.map((kelas, index) => (
                                        <tr key={kelas.id}>
                                            <td>{index + 1}</td>
                                            <td>{kelas.namaKelas}</td>
                                            <td>{kelas.mataKuliah}</td>
                                            <td className='text-center'>{kelas.jumlahMahasiswa}</td>
                                            <td className='text-center'>
                                                <div className="btn-group" role="group">
                                                    {/* TOMBOL DETAIL DENGAN HANDLER */}
                                                    <button 
                                                        className="btn btn-info btn-sm text-white me-1" 
                                                        onClick={() => handleDetail(kelas.id)}
                                                        title="Lihat Detail Kelas"
                                                    >
                                                        <i className="bi bi-eye"></i> Detail
                                                    </button>
                                                    
                                                    {/* TOMBOL EDIT DENGAN HANDLER */}
                                                    <button 
                                                        className="btn btn-warning btn-sm me-1" 
                                                        onClick={() => handleEdit(kelas.id)}
                                                        title="Edit Informasi Kelas"
                                                    >
                                                        <i className="bi bi-pencil-square"></i> Edit
                                                    </button>
                                                    
                                                    {/* TOMBOL DELETE DENGAN HANDLER */}
                                                    <button 
                                                        className="btn btn-danger btn-sm" 
                                                        onClick={() => handleDelete(kelas.id, kelas.namaKelas)}
                                                        title="Hapus Kelas"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted">Belum ada data kelas yang tersedia.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </LayoutDosen>
    );
};

export default KelasPage;
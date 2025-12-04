// src/pages/Dosen/KelasDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import api from '../../utils/api'; <-- Dihapus karena tidak terpakai

const KelasDetail = () => { 
    const { id } = useParams();
    const navigate = useNavigate();
    const [kelas, setKelas] = useState(null);
    const [mahasiswaList, setMahasiswaList] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- FUNGSI FETCH DATA KELAS ---
    useEffect(() => {
        const fetchData = async () => {
             setLoading(true);
             try {
                // Simulasi Fetch Detail Kelas dan Mahasiswa
                const mockKelas = { id: id, nama: `Kelas ${id}`, matkul: 'Geologi Lapangan', tahun: '2024/2025' };
                const mockMahasiswa = [
                    { nim: '121001', nama: 'Budi Santoso' },
                    { nim: '121002', nama: 'Siti Aminah' },
                ];
                setKelas(mockKelas);
                setMahasiswaList(mockMahasiswa);
             } catch (error) {
                 console.error('Gagal mengambil detail kelas', error);
             } finally {
                 setLoading(false);
             }
        };
        fetchData();
    }, [id, navigate]);
    // ------------------------------------------

    // 🔥 HANDLER UNTUK TOMBOL IMPORT MAHASISWA
    const handleImportMahasiswa = () => {
        // PERBAIKAN: Mengganti alert() dengan konsol log simulasi atau membuka modal/halaman
        console.log("Simulasi: Membuka modal/form untuk Import Mahasiswa via CSV/Excel.");
        // Anda bisa menambahkan state modal di sini: setShowImportModal(true)
    };

    // 🔥 HANDLER UNTUK HAPUS MAHASISWA
    const handleDeleteMahasiswa = async (nim) => {
        if (!window.confirm(`Yakin ingin menghapus mahasiswa NIM ${nim} dari kelas ini?`)) {
            return;
        }
        
        try {
            // Simulasi: Panggil await api.delete(`/dosen/kelas/${kelas.id}/mahasiswa/${nim}`); 
            setMahasiswaList(prev => prev.filter(mhs => mhs.nim !== nim));
            // Menghilangkan alert() di sini
            console.log(`Mahasiswa NIM ${nim} telah dihapus (Simulasi).`);
        } catch (error) {
            console.error('Gagal menghapus mahasiswa. Cek API Mock.');
        }
    };
    // ------------------------------------------

    if (loading || !kelas) return <p>Memuat data kelas...</p>;

    return (
        <div className="container-fluid">
            <button onClick={() => navigate('/dosen/kelas')} className="btn btn-sm btn-secondary mb-3">
                <i className="bi bi-arrow-left"></i> Kembali ke Daftar Kelas
            </button>
            <h2 className="mb-2">Detail Kelas: {kelas.nama}</h2>
            <p className="text-muted">{kelas.matkul} | {kelas.tahun}</p>

            <div className="card shadow mt-4">
                <div className="card-header bg-primary text-white">
                    Daftar Mahasiswa ({mahasiswaList.length})
                </div>
                <div className="card-body">
                    {/* TOMBOL IMPORT MAHASISWA DENGAN HANDLER */}
                    <button 
                        className="btn btn-success btn-sm mb-3" 
                        onClick={handleImportMahasiswa} 
                    >
                        <i className="bi bi-upload"></i> Import Mahasiswa
                    </button>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>NIM</th>
                                <th>Nama Mahasiswa</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* DATA MAHASISWA */}
                            {mahasiswaList.map((mhs) => (
                                <tr key={mhs.nim}>
                                    <td>{mhs.nim}</td>
                                    <td>{mhs.nama}</td>
                                    {/* TOMBOL HAPUS MAHASISWA DENGAN HANDLER */}
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-outline-danger" 
                                            onClick={() => handleDeleteMahasiswa(mhs.nim)}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {mahasiswaList.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="text-center text-muted">Belum ada mahasiswa di kelas ini.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default KelasDetail;
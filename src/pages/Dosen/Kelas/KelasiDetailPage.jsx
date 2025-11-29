// src/pages/Dosen/Kelas/KelasDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import api from '../../../utils/api'; 

const KelasDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [kelas, setKelas] = useState(null);
    const [mahasiswaList, setMahasiswaList] = useState([]);

    // --- TITIK INTEGRASI: FUNGSI FETCH DATA KELAS ---
    useEffect(() => {
        /*
        const fetchData = async () => {
            try {
                const kelasResponse = await api.get(`/dosen/kelas/${id}`); 
                setKelas(kelasResponse.data.kelas);
                setMahasiswaList(kelasResponse.data.mahasiswa);
            } catch (error) {
                console.error('Gagal mengambil detail kelas', error);
                alert('Data kelas tidak ditemukan!');
                navigate('/dosen/kelas');
            }
        };
        fetchData();
        */
        // --- SIMULASI ---
        setKelas({ id: id, nama: `Kelas ${id}`, matkul: 'Geologi Lapangan', tahun: '2024/2025' });
        setMahasiswaList([
            { nim: '121001', nama: 'Budi Santoso' },
            { nim: '121002', nama: 'Siti Aminah' },
        ]);
    }, [id, navigate]);
    // ------------------------------------------

    if (!kelas) return <p>Memuat data kelas...</p>;

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
                    <button className="btn btn-success btn-sm mb-3">
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
                            {mahasiswaList.map((mhs) => (
                                <tr key={mhs.nim}>
                                    <td>{mhs.nim}</td>
                                    <td>{mhs.nama}</td>
                                    <td><button className="btn btn-sm btn-outline-danger">Hapus</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default KelasDetailPage;
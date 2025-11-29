// src/pages/Dosen/Kelas/KelasListPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import api from '../../../utils/api'; 

const KelasListPage = () => {
    const navigate = useNavigate();
    
    // Simpan data kelas (Nanti diganti dengan state dari API)
    const [kelasList, setKelasList] = useState([
        { id: 1, nama: 'Geologi Lapangan A', matkul: 'Geologi Dasar', tahun: '2024/2025', mhs: 30 },
        { id: 2, nama: 'Geologi Lapangan B', matkul: 'Geologi Dasar', tahun: '2024/2025', mhs: 28 },
    ]);
    const [newKelas, setNewKelas] = useState({ nama: '', matkul: '' });

    // --- TITIK INTEGRASI: FUNGSI FETCH DATA ---
    /*
    useEffect(() => {
        const fetchKelas = async () => {
            try {
                const response = await api.get('/dosen/kelas'); 
                setKelasList(response.data);
            } catch (error) {
                console.error('Gagal mengambil data kelas', error);
            }
        };
        fetchKelas();
    }, []);
    */
    // ------------------------------------------

    const handleAddKelas = async (e) => {
        e.preventDefault();
        
        // --- TITIK INTEGRASI: FUNGSI POST/CREATE ---
        /*
        try {
            const response = await api.post('/dosen/kelas', newKelas);
            setKelasList([...kelasList, response.data]); // Tambahkan data dari respons server
            setNewKelas({ nama: '', matkul: '' }); 
            alert('Kelas berhasil ditambahkan');
        } catch (error) {
            alert('Gagal menambahkan kelas.');
        }
        */
        // --- SIMULASI ---
        const newItem = { id: kelasList.length + 1, ...newKelas, tahun: '2024/2025', mhs: 0 };
        setKelasList([...kelasList, newItem]);
        setNewKelas({ nama: '', matkul: '' }); 
        alert('Kelas berhasil ditambahkan (Simulasi)');
    };

    const handleDeleteKelas = async (id) => {
        if (!window.confirm("Yakin ingin menghapus kelas ini?")) return;

        // --- TITIK INTEGRASI: FUNGSI DELETE ---
        /*
        try {
            await api.delete(`/dosen/kelas/${id}`);
            setKelasList(kelasList.filter(k => k.id !== id));
            alert('Kelas berhasil dihapus.');
        } catch (error) {
            alert('Gagal menghapus kelas.');
        }
        */
        // --- SIMULASI ---
        setKelasList(kelasList.filter(k => k.id !== id));
        alert('Kelas berhasil dihapus (Simulasi).');
    };
    
    const handleDetailKelas = (id) => {
        // Mengarah ke rute /dosen/kelas/1 (CLS-002)
        navigate(`/dosen/kelas/${id}`); 
    };

    return (
        // ... (JSX sama seperti sebelumnya, dengan fungsi terpasang)
        <div className="container-fluid">
            <h2 className="mb-4">Mengelola Kelas</h2>
            <div className="card mb-4 shadow-sm bg-light">
                <div className="card-body">
                    <h6 className="card-title">Tambah Kelas Baru</h6>
                    <form className="row g-3" onSubmit={handleAddKelas}>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Nama Kelas (ex: Kelas A)" 
                                value={newKelas.nama} onChange={e => setNewKelas({...newKelas, nama: e.target.value})} required/>
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Mata Kuliah" 
                                value={newKelas.matkul} onChange={e => setNewKelas({...newKelas, matkul: e.target.value})} required/>
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-primary w-100">+ Simpan Kelas</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Nama Kelas</th>
                                <th>Mata Kuliah</th>
                                <th>Tahun Ajaran</th>
                                <th>Jml Mahasiswa</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kelasList.map((k) => (
                                <tr key={k.id}>
                                    <td>{k.nama}</td>
                                    <td>{k.matkul}</td>
                                    <td>{k.tahun}</td>
                                    <td>{k.mhs} Mahasiswa</td>
                                    <td>
                                        <button 
                                            onClick={() => handleDetailKelas(k.id)}
                                            className="btn btn-sm btn-outline-info me-2"
                                        >
                                            Detail
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteKelas(k.id)}
                                            className="btn btn-sm btn-outline-danger"
                                        >
                                            Hapus
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

export default KelasListPage;
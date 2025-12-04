// src/pages/Dosen/KelasCreatePage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KelasCreatePage = () => {
    const navigate = useNavigate();
    const [namaKelas, setNamaKelas] = useState('');
    const [mataKuliah, setMataKuliah] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Asumsi: Logic ini hanya placeholder. Persistensi data ditambahkan di sini.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // --- SIMULASI PERSISTENSI KE LOCALSTORAGE ---
        // Biasanya data ini dikirim ke API backend, tetapi kita simpan lokal untuk simulasi.
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        const newKelas = {
            id: String(Math.floor(Math.random() * 1000) + 10),
            namaKelas: namaKelas,
            mataKuliah: mataKuliah,
            jumlahMahasiswa: 0,
        };

        const existingKelas = JSON.parse(localStorage.getItem('userKelas')) || [];
        localStorage.setItem('userKelas', JSON.stringify([...existingKelas, newKelas]));
        
        alert(`Kelas "${namaKelas}" berhasil dibuat! (Simulasi Disimpan Lokal)`);
        
        // Navigasi kembali ke Daftar Kelas
        navigate('/dosen/kelas'); 
    };

    return (
        <div className="card shadow p-4">
            <h3 className="mb-4">Buat Kelas Baru</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nama Kelas</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={namaKelas}
                        onChange={(e) => setNamaKelas(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="form-label">Mata Kuliah</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={mataKuliah}
                        onChange={(e) => setMataKuliah(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                    {loading ? 'Menyimpan...' : 'Simpan Kelas'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/dosen/kelas')} disabled={loading}>
                    Batal
                </button>
            </form>
        </div>
    );
};

export default KelasCreatePage;
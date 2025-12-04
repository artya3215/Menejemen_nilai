// src/pages/Dosen/Tugas/TugasFormPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import api from '../../../utils/api';

const TugasFormPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        judul: '', deskripsi: '', lokasi: '', tanggal: '', status: 'Draft' 
    });
    // [BARU] Kriteria Penilaian
    const [criterias, setCriterias] = useState([{ name: 'Kerjasama', weight: 30 }]);

    const handleCriteriaChange = (index, field, value) => {
        const newCriterias = [...criterias];
        newCriterias[index][field] = value;
        setCriterias(newCriterias);
    };

    const handleAddCriteria = () => {
        setCriterias([...criterias, { name: '', weight: 0 }]);
    };

    const handleRemoveCriteria = (index) => {
        setCriterias(criterias.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Gabungkan data tugas dan kriteria
        const payload = {
            ...formData,
            criterias: criterias.filter(c => c.name.trim() !== '' && c.weight > 0),
        };

        // --- TITIK INTEGRASI: FUNGSI POST/CREATE ---
        /*
        try {
            await api.post('/dosen/tugas', payload);
            alert("Tugas berhasil dibuat!");
            navigate('/dosen/tugas'); 
        } catch (error) {
            alert('Gagal membuat tugas. Pastikan semua field sudah benar.');
        }
        */

        // --- SIMULASI (Menggunakan localStorage) ---
        const savedTugas = localStorage.getItem('fieldTasks');
        const tugasList = savedTugas ? JSON.parse(savedTugas) : [];
        const newId = tugasList.length > 0 ? Math.max(...tugasList.map(t => t.id)) + 1 : 1;
        const updatedList = [...tugasList, { id: newId, ...formData }];
        localStorage.setItem('fieldTasks', JSON.stringify(updatedList));
        
        alert("Tugas berhasil dibuat dan disimpan (Simulasi)! Cek Console log untuk Payload Kriteria.");
        console.log("Payload Kriteria Penilaian:", payload.criterias);
        navigate('/dosen/tugas');
    };

    return (
        <div className="container-fluid">
            <h2 className="mb-4">Buat Tugas Baru</h2>
            <div className="card shadow p-4">
                <form onSubmit={handleSubmit}>
                    {/* Bagian Input Umum Tugas */}
                    <fieldset className="p-3 border rounded mb-4">
                        <legend className="float-none w-auto px-2 fs-6 text-primary">Informasi Tugas</legend>
                        <div className="mb-3">
                            <label className="form-label">Judul Tugas</label>
                            <input type="text" className="form-control" required
                                value={formData.judul} onChange={(e) => setFormData({...formData, judul: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Deskripsi</label>
                            <textarea className="form-control" rows="3" required
                                value={formData.deskripsi} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}></textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Lokasi</label>
                                <input type="text" className="form-control" required
                                    value={formData.lokasi} onChange={(e) => setFormData({...formData, lokasi: e.target.value})}/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Tanggal Pelaksanaan</label>
                                <input type="date" className="form-control" required
                                    value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})}/>
                            </div>
                        </div>
                    </fieldset>

                    {/* Bagian Input Kriteria Penilaian (Sesuai ERD: assessment_criterias) */}
                    <fieldset className="p-3 border rounded mb-4">
                        <legend className="float-none w-auto px-2 fs-6 text-primary">Kriteria Penilaian</legend>
                        {criterias.map((criteria, index) => (
                            <div key={index} className="row g-2 mb-2 align-items-center">
                                <div className="col-6">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Nama Kriteria (mis: Kerjasama)"
                                        value={criteria.name} 
                                        onChange={(e) => handleCriteriaChange(index, 'name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-4">
                                    <div className="input-group">
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            placeholder="Bobot"
                                            min="1"
                                            value={criteria.weight} 
                                            onChange={(e) => handleCriteriaChange(index, 'weight', parseInt(e.target.value))}
                                            required
                                        />
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <button 
                                        type="button" 
                                        className="btn btn-sm btn-outline-danger w-100"
                                        onClick={() => handleRemoveCriteria(index)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" className="btn btn-sm btn-outline-primary mt-2" onClick={handleAddCriteria}>
                            + Tambah Kriteria
                        </button>
                    </fieldset>
                    
                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/dosen/tugas')}>Batal</button>
                        <button type="submit" className="btn btn-primary">Simpan Tugas</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TugasFormPage;
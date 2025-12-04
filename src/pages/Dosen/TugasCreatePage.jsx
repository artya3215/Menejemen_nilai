// src/pages/Dosen/TugasCreatePage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'; // Pastikan path benar

const TugasCreatePage = () => {
    const navigate = useNavigate();
    const [kelasList, setKelasList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    const [tugas, setTugas] = useState({
        kelasId: '',
        judul: '',
        deskripsi: '',
        lokasi: '',
        tanggalPelaksanaan: '',
    });

    // Default kriteria penilaian
    const [kriteria, setKriteria] = useState([
        { nama: 'Kerjasama Kelompok', bobot: 30 },
        { nama: 'Kualitas Laporan', bobot: 40 },
        { nama: 'Presentasi/Sikap', bobot: 30 },
    ]);

    // 1. Fetch Daftar Kelas (Diperlukan untuk dropdown)
    useEffect(() => {
        const fetchKelas = async () => {
            try {
                // Memuat daftar kelas dari mock API
                const response = await api.get('/dosen/kelas'); 
                setKelasList(response.data.data); 
            } catch (err) {
                setError('Gagal memuat daftar kelas.');
            } finally {
                setLoading(false);
            }
        };
        fetchKelas();
    }, []); 

    // 2. Handle Input Tugas Umum
    const handleTugasChange = (e) => {
        setTugas({ ...tugas, [e.target.name]: e.target.value });
    };

    // 3. Handle Input Kriteria Dinamis
    const handleKriteriaChange = (index, field, value) => {
        const newKriteria = [...kriteria];
        if (field === 'bobot') {
            value = Math.max(0, Math.min(100, parseInt(value) || 0)); // Batasi 0-100
        }
        newKriteria[index][field] = value;
        setKriteria(newKriteria);
    };

    const addKriteria = () => {
        setKriteria([...kriteria, { nama: '', bobot: 0 }]);
    };

    const removeKriteria = (index) => {
        setKriteria(kriteria.filter((_, i) => i !== index));
    };

    const totalBobot = kriteria.reduce((sum, item) => sum + (item.bobot || 0), 0);
    
    // 4. Handle Submit Tugas (Mocking POST)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg('');

        // Validasi Kritis: Total Bobot harus 100%
        if (totalBobot !== 100) {
            setError('Total bobot kriteria harus 100% sebelum disimpan.');
            return;
        }

        // Validasi isian
        if (kriteria.some(k => !k.nama) || !tugas.judul || !tugas.kelasId) {
            setError('Semua field bertanda bintang dan nama kriteria tidak boleh kosong.');
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                ...tugas,
                kriteriaPenilaian: kriteria.map(k => ({ nama: k.nama, bobot: k.bobot })),
            };
            
            // Panggil mock API POST
            await api.post('/dosen/tugas/create', payload); 
            
            setSuccessMsg(`Tugas berhasil dibuat! Mengarahkan kembali ke daftar tugas...`);
            
            // 🔥 PERBAIKAN: Redirect dengan alert sukses dan navigasi ke Daftar Tugas (simulasi update)
            setTimeout(() => {
                alert("Simulasi: Tugas berhasil disimpan. Anda perlu me-refresh halaman Daftar Tugas untuk melihat perubahan (karena ini mock data).");
                navigate('/dosen/tugas');
            }, 2000); 

        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan saat menyimpan tugas.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-5"><div className="spinner-border" role="status"></div><p>Memuat data kelas...</p></div>;
    }

    return (
        <> 
            <h2>Buat Tugas Lapangan Baru</h2>
            <p className="lead">Isi detail tugas dan tentukan kriteria penilaian (rubrik).</p>

            <div className="card shadow p-4">
                {error && <div className="alert alert-danger">{error}</div>}
                {successMsg && <div className="alert alert-success">{successMsg}</div>}

                <form onSubmit={handleSubmit}>
                    <h5 className="mb-3">Detail Tugas</h5>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Pilih Kelas <span className="text-danger">*</span></label>
                            <select 
                                className="form-select" 
                                name="kelasId" 
                                value={tugas.kelasId} 
                                onChange={handleTugasChange} 
                                required
                            >
                                <option value="">-- Pilih Kelas --</option>
                                {kelasList.map(k => (
                                    <option key={k.id} value={k.id}>{k.namaKelas} - {k.mataKuliah}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Judul Tugas <span className="text-danger">*</span></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="judul" 
                                value={tugas.judul} 
                                onChange={handleTugasChange} 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Deskripsi Tugas</label>
                        <textarea 
                            className="form-control" 
                            name="deskripsi" 
                            rows="3" 
                            value={tugas.deskripsi} 
                            onChange={handleTugasChange}
                        ></textarea>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Lokasi Kegiatan <span className="text-danger">*</span></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="lokasi" 
                                value={tugas.lokasi} 
                                onChange={handleTugasChange} 
                                required 
                            />
                        </div>
                        <div className="col-md-6 mb-4">
                            <label className="form-label">Tanggal Pelaksanaan <span className="text-danger">*</span></label>
                            <input 
                                type="date" 
                                className="form-control" 
                                name="tanggalPelaksanaan" 
                                value={tugas.tanggalPelaksanaan} 
                                onChange={handleTugasChange} 
                                required 
                            />
                        </div>
                    </div>

                    <hr />

                    <h5 className="mb-3">Kriteria Penilaian (Rubrik)</h5>
                    <p className="small text-muted">Pastikan **Total Bobot mencapai 100%**.</p>
                    
                    {kriteria.map((item, index) => (
                        <div key={index} className="row mb-2 align-items-center border-bottom pb-2">
                            <div className="col-md-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nama Kriteria (mis: Keaktifan)"
                                    value={item.nama}
                                    onChange={(e) => handleKriteriaChange(index, 'nama', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Bobot"
                                        min="1"
                                        max="100"
                                        value={item.bobot}
                                        onChange={(e) => handleKriteriaChange(index, 'bobot', e.target.value)}
                                        required
                                    />
                                    <span className="input-group-text">%</span>
                                </div>
                            </div>
                            <div className="col-md-2 text-end">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => removeKriteria(index)}
                                    disabled={kriteria.length === 1}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={addKriteria}>
                            + Tambah Kriteria
                        </button>
                        <h5 className={`m-0 ${totalBobot === 100 ? 'text-success' : 'text-danger'}`}>
                            Total Bobot: {totalBobot}% 
                            {totalBobot === 100 ? ' (OK)' : ' (Perlu 100%)'}
                        </h5>
                    </div>

                    <div className="mt-4">
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100" 
                            disabled={submitting || totalBobot !== 100}
                        >
                            {submitting ? 'Menyimpan...' : 'Simpan Tugas Lapangan'}
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-outline-secondary w-100 mt-2"
                            onClick={() => navigate('/dosen/tugas')}
                            disabled={submitting}
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default TugasCreatePage;
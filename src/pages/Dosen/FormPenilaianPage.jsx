// src/pages/Dosen/FormPenilaianPage.jsx (Perbaikan Fokus pada Destructuring)

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAssessmentForm, saveAssessment } from '../../services/penilaian'; 

const FormPenilaianPage = () => {
    // Ambil kedua parameter dari URL
    const { tugasId, kelompokId } = useParams(); 
    const navigate = useNavigate();

    const [kelompokNama, setKelompokNama] = useState(`Kelompok ${kelompokId}`); 

    const [kriteria, setKriteria] = useState([]); 
    const [nilaiInputs, setNilaiInputs] = useState({}); 
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false); // Perhatikan: ini harus useState, bukan boolean biasa
    const [error, setError] = useState(null);
    const [currentStatus, setCurrentStatus] = useState('belum dinilai'); 

    // 1. Fetch Kriteria dan Nilai Tersimpan
    const fetchAssessmentData = useCallback(async () => {
        setLoading(true);
        setError('');
        
        if (!tugasId || !kelompokId) {
            setError('ID Tugas atau ID Kelompok tidak ditemukan di URL.');
            setLoading(false);
            return;
        }

        try {
            const responseData = await getAssessmentForm(tugasId, kelompokId);
            
            setKelompokNama(`Kelompok ${kelompokId} (Tugas: ${tugasId})`); 

            // 🔥 PERBAIKAN PENTING: Gunakan Destructuring dengan Default ke Array Kosong
            const fetchedKriteria = responseData.kriteria || [];
            const nilaiYangAda = responseData.nilaiYangAda || [];
            
            // Inisialisasi input dengan nilai yang sudah ada
            const initialInputs = fetchedKriteria.reduce((acc, item) => {
                const existingValue = nilaiYangAda.find(d => d.kriteriaId === item.idKriteria)?.nilai || 0;
                acc[item.idKriteria] = existingValue;
                return acc;
            }, {});
            
            setKriteria(fetchedKriteria.map(k => ({...k, idKriteria: k.id || k.idKriteria}))); 
            setNilaiInputs(initialInputs);
            setFeedback(responseData.feedbackUmum || '');
            setCurrentStatus(responseData.status || 'belum dinilai');

        } catch (err) {
            // Ini akan menangkap kegagalan API jika key tugas/kelompok tidak ada di mock
            setError(err.message || 'Gagal memuat form penilaian. Cek API Mock.');
        } finally {
            setLoading(false);
        }
    }, [tugasId, kelompokId]); 

    useEffect(() => {
        fetchAssessmentData();
    }, [fetchAssessmentData]);

    // useMemo untuk Total Nilai
    const totalNilai = useMemo(() => {
        if (!kriteria.length) return 0.00;

        let totalScore = 0;
        kriteria.forEach(item => {
            const inputScore = nilaiInputs[item.idKriteria] || 0;
            totalScore += (inputScore * item.bobot); 
        });
        return parseFloat(totalScore).toFixed(2);
    }, [kriteria, nilaiInputs]);

    // Handler untuk input nilai
    const handleInputChange = (kriteriaId, value) => {
        const isFinal = currentStatus === 'final';
        if (isFinal) return;

        let score = parseInt(value) || 0;
        score = Math.max(0, Math.min(100, score)); 

        setNilaiInputs(prev => ({
            ...prev,
            [kriteriaId]: score,
        }));
    };
    
    // Handler untuk Submit Nilai (Draft atau Final)
    const handleSubmit = async (isFinal) => {
        setError(null);
        setSubmitting(true);

        const status = isFinal ? 'final' : 'draft';

        const detailNilai = kriteria.map(item => ({
            kriteriaId: item.idKriteria,
            nilai: nilaiInputs[item.idKriteria] || 0,
            catatan: '', 
        }));

        try {
            const message = await saveAssessment(tugasId, kelompokId, detailNilai, feedback, status);
            alert(message);
            setCurrentStatus(status);
            navigate(`/dosen/penilaian`); 

        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const isFinal = currentStatus === 'final';

    // --- Loading & Error State ---
    if (loading) {
        return <div className="text-center mt-5"><div className="spinner-border" role="status"></div><p>Memuat form penilaian...</p></div>;
    }

    if (error && !isFinal) {
         return <div className="alert alert-danger mt-3">{error}</div>;
    }

    // --- Main Render ---
    return (
        <>
            <h2>📝 Form Penilaian</h2>
            <h4 className="text-primary">Kelompok: **{kelompokNama}** (Tugas ID: {tugasId})</h4>

            <div className="card shadow p-4 mt-3">
                {error && <div className="alert alert-danger">{error}</div>}
                
                <h4 className="my-3">
                    <span className={`badge p-3 fs-5 ${isFinal ? 'bg-success' : 'bg-secondary'}`}>
                      {isFinal ? 'Nilai Final:' : 'Nilai Sementara (Draft):'}
                    </span>
                    <span className="fw-bold text-success display-6 ms-2">{totalNilai}</span> / 100
                    {/* Nilai Total ditampilkan di sini */}
                </h4>
                
                {/* KONTEN UTAMA PENILAIAN */}
                <div className="table-responsive mb-4">
                    <table className="table table-bordered align-middle">
                        <thead className="table-primary">
                            <tr>
                                <th style={{ width: '50%' }}>Kriteria Penilaian</th>
                                <th style={{ width: '20%' }} className="text-center">Bobot (0.0 - 1.0)</th>
                                <th style={{ width: '30%' }}>Input Nilai (0-100)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Rendering Input Field Nilai */}
                            {kriteria.map(item => (
                                <tr key={item.idKriteria}>
                                    <td className="fw-medium">{item.namaKriteria}</td> 
                                    <td className="text-center fw-bold">{item.bobot.toFixed(2)}</td>
                                    <td>
                                        <input type="number" className="form-control"
                                            value={nilaiInputs[item.idKriteria] || 0}
                                            onChange={(e) => handleInputChange(item.idKriteria, e.target.value)}
                                            min="0" max="100" disabled={isFinal || submitting} /> 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pesan jika kriteria tidak ditemukan */}
                    {kriteria.length === 0 && <div className="alert alert-warning">Kriteria penilaian tidak ditemukan untuk tugas ini. Pastikan Anda sudah membuat tugas baru.</div>}
                </div>
                
                <div className="mb-4">
                    <label className="form-label fw-bold">Catatan / Feedback Dosen (Opsional)</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        disabled={isFinal || submitting}
                    ></textarea>
                </div>

                {/* Tombol Aksi (Simpan Draft & Submit Final) */}
                <div className="d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)} disabled={submitting}>Batal</button>
                    {!isFinal && (
                        <>
                            <button type="button" className="btn btn-warning" onClick={() => handleSubmit(false)} disabled={submitting}>
                                {submitting ? 'Menyimpan Draft...' : 'Simpan Draft'}
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => handleSubmit(true)} disabled={submitting}>
                                {submitting ? 'Menyimpan Final...' : 'Submit Final'}
                            </button>
                        </>
                    )}
                    {isFinal && <button type="button" className="btn btn-success" disabled>Nilai Sudah Final</button>}
                </div>
            </div>
        </>
    );
};

export default FormPenilaianPage;
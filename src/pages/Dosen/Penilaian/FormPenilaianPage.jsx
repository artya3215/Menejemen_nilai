// src/pages/Dosen/Penilaian/FormPenilaianPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import api from '../../../utils/api';

const FormPenilaianPage = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();

    // Data Penilaian Dummy (Nanti diambil dari API)
    const [criterias, setCriterias] = useState([
        { id: 1, name: 'Kerjasama Tim', weight: 30, score: 0 },
        { id: 2, name: 'Ketepatan Laporan', weight: 50, score: 0 },
        { id: 3, name: 'Keaktifan Lapangan', weight: 20, score: 0 },
    ]);
    const [feedback, setFeedback] = useState('');
    const [groupName, setGroupName] = useState(`Kelompok ${groupId}`);
    const [currentStatus, setCurrentStatus] = useState('Belum Dinilai');

    // --- TITIK INTEGRASI: FETCH DATA (Kriteria & Nilai Lama) ---
    useEffect(() => {
        /*
        const fetchData = async () => {
            try {
                const response = await api.get(`/dosen/penilaian/${groupId}`); 
                // setCriterias(response.data.criterias);
                // setFeedback(response.data.feedback || '');
                // setCurrentStatus(response.data.status);
            } catch (error) {
                console.error('Gagal mengambil data penilaian', error);
            }
        };
        fetchData();
        */
    }, [groupId]);
    // -----------------------------------------------------------

    const handleScoreChange = (id, score) => {
        const newCriterias = criterias.map(c => 
            c.id === id ? { ...c, score: parseInt(score) || 0 } : c
        );
        setCriterias(newCriterias);
    };

    const calculateTotalScore = () => {
        let total = criterias.reduce((sum, c) => {
            // Hitung skor berbobot: (Skor / Max_Score * Bobot)
            // Asumsi max score 100
            return sum + (c.score / 100) * c.weight; 
        }, 0);
        return total.toFixed(2);
    };

    const handleSubmit = async (type) => { // type: 'draft' atau 'final'
        if (type === 'final' && !window.confirm("Penilaian Final tidak dapat diubah lagi. Lanjutkan?")) return;

        const payload = {
            groupId: groupId,
            status: type,
            feedback: feedback,
            scores: criterias.map(c => ({
                criteriaId: c.id,
                score: c.score,
            })),
            totalScore: calculateTotalScore(),
        };

        // --- TITIK INTEGRASI: FUNGSI POST/PUT SIMPAN NILAI (PNL-002) ---
        /*
        try {
            // Gunakan PUT jika sudah ada draft, POST jika baru
            await api.post('/dosen/penilaian/save', payload); 
            alert(`Nilai berhasil disimpan sebagai ${type.toUpperCase()}!`);
            navigate('/dosen/penilaian'); // Kembali ke list penilaian
        } catch (error) {
            alert('Gagal menyimpan nilai.');
        }
        */
        // --- SIMULASI ---
        console.log("Payload Penilaian:", payload);
        alert(`Simulasi: Nilai berhasil disimpan sebagai ${type.toUpperCase()}!`);
        navigate('/dosen/penilaian');
    };

    const isFinal = currentStatus === 'Final';
    const totalWeight = criterias.reduce((sum, c) => sum + c.weight, 0);

    return (
        <div className="container-fluid">
            <h2 className="mb-2">Form Penilaian</h2>
            <h4 className="text-primary mb-3">{groupName}</h4>

            {isFinal && <div className="alert alert-success">Penilaian ini berstatus **FINAL** dan tidak dapat diubah.</div>}
            
            <div className="card shadow">
                <div className="card-header bg-light">
                    **Total Nilai: {calculateTotalScore()}** / 100
                </div>
                <div className="card-body">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-primary">
                            <tr>
                                <th>Kriteria Penilaian</th>
                                <th style={{width: '10%'}}>Bobot</th>
                                <th style={{width: '25%'}}>Input Nilai (0-100)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {criterias.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.name}</td>
                                    <td className="text-center">{c.weight}%</td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            min="0"
                                            max="100"
                                            value={c.score}
                                            onChange={(e) => handleScoreChange(c.id, e.target.value)}
                                            disabled={isFinal}
                                            required
                                        />
                                    </td>
                                </tr>
                            ))}
                            <tr className="fw-bold bg-light">
                                <td>TOTAL BOBOT</td>
                                <td className="text-center">{totalWeight}%</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mb-3 mt-4">
                        <label className="form-label">Catatan / Feedback Dosen (Opsional)</label>
                        <textarea 
                            className="form-control" 
                            rows="3" 
                            value={feedback} 
                            onChange={(e) => setFeedback(e.target.value)} 
                            disabled={isFinal}
                        ></textarea>
                    </div>
                    
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => navigate('/dosen/penilaian')}
                        >
                            <i className="bi bi-x-circle"></i> Batal
                        </button>
                        {!isFinal && (
                            <>
                                <button 
                                    type="button" 
                                    className="btn btn-warning text-dark" 
                                    onClick={() => handleSubmit('draft')}
                                >
                                    <i className="bi bi-save"></i> Simpan Draft
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={() => handleSubmit('final')}
                                >
                                    <i className="bi bi-check-circle"></i> Submit Final
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormPenilaianPage;
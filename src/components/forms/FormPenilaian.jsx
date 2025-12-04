// src/components/forms/FormPenilaian.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { saveAssessment, getAssessmentForm } from '../../services/penilaian.jsx'; 
// Asumsi: taskId dan groupId didapat dari parent component

// MOCK API Service untuk simulasi
const MOCK_DB = {}; // Database simulasi

const getAssessmentForm = async (taskId, groupId) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulasi delay API

  // Data kriteria tetap (Contoh dari spesifikasi)
  const kriteria = [
    { idKriteria: 1, nama: 'Kerja Sama Tim', bobot: 0.3 },
    { idKriteria: 2, nama: 'Ketepatan Laporan', bobot: 0.5 },
    { idKriteria: 3, nama: 'Inisiatif Lapangan', bobot: 0.2 },
  ];

  const key = `${taskId}-${groupId}`;
  const existingData = MOCK_DB[key] || {
    nilaiPerKriteria: [],
    feedbackUmum: '',
    status: 'draft',
  };

  return {
    kriteria: kriteria,
    nilaiYangAda: existingData.nilaiPerKriteria,
    feedbackUmum: existingData.feedbackUmum,
    status: existingData.status,
  };
};

const saveAssessment = async (taskId, groupId, data, status) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulasi delay API
  const key = `${taskId}-${groupId}`;
  
  // Hitung nilai total
  let totalNilai = 0;
  let error = null;
  
  data.kriteria.forEach(k => {
    const nilaiAngka = parseFloat(k.nilai);
    if (isNaN(nilaiAngka) || nilaiAngka < 1 || nilaiAngka > 100) {
      error = `Nilai untuk '${k.nama}' harus antara 1-100.`;
    }
    totalNilai += (nilaiAngka * k.bobot);
  });
  
  if (error) {
    throw new Error(error);
  }

  // Simpan ke DB simulasi
  MOCK_DB[key] = {
    nilaiPerKriteria: data.kriteria.map(k => ({
      kriteriaId: k.idKriteria,
      nilai: parseFloat(k.nilai),
      catatan: k.catatan,
    })),
    feedbackUmum: data.feedbackUmum,
    status: status,
    totalNilai: totalNilai,
    tanggalDinilai: new Date().toISOString(),
  };

  return MOCK_DB[key];
};

const FormPenilaian = ({ taskId = 'TGS001', groupId = 'GRUP01', onAssessmentSaved }) => {
  const [kriteria, setKriteria] = useState([]);
  const [feedbackUmum, setFeedbackUmum] = useState('');
  const [currentStatus, setCurrentStatus] = useState('draft');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Hitung Total Nilai Saat Ini
  const totalNilai = kriteria.reduce((sum, k) => {
    const nilaiAngka = parseFloat(k.nilai);
    return sum + (isNaN(nilaiAngka) ? 0 : nilaiAngka * k.bobot);
  }, 0).toFixed(2);
  
  const isFinal = currentStatus === 'final';

  const fetchAssessmentData = useCallback(async () => {
    if (!taskId || !groupId) return;
    setLoading(true);
    setError('');
    try {
      // 🚨 MENGGUNAKAN MOCK SERVICE
      const data = await getAssessmentForm(taskId, groupId);
      
      // Menggabungkan kriteria dengan nilai yang sudah ada (jika ada)
      const mappedKriteria = data.kriteria.map(k => {
        const existingDetail = data.nilaiYangAda.find(dn => dn.kriteriaId === k.idKriteria) || {};
        return {
          ...k,
          nilai: existingDetail.nilai || '', // Nilai dari 1-100
          catatan: existingDetail.catatan || '',
        };
      });

      setKriteria(mappedKriteria);
      setFeedbackUmum(data.feedbackUmum || '');
      setCurrentStatus(data.status || 'draft');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [taskId, groupId]);

  useEffect(() => {
    fetchAssessmentData();
  }, [fetchAssessmentData]);

  // Handler untuk input nilai dan catatan per kriteria
  const handleInputChange = (idKriteria, field, value) => {
    if (isFinal) return; // Tidak bisa diubah jika status final
    
    setKriteria(prev => prev.map(k => {
      if (k.idKriteria === idKriteria) {
        // Validasi input nilai: hanya angka dan range 1-100
        if (field === 'nilai') {
          const numericValue = value === '' ? '' : Math.max(1, Math.min(100, parseInt(value || 0, 10)));
          return { ...k, [field]: numericValue };
        }
        return { ...k, [field]: value };
      }
      return k;
    }));
  };

  // Handler untuk menyimpan draft atau submit final
  const handleSave = async (status) => {
    setLoading(true);
    setError('');
    try {
      const dataToSave = {
        kriteria: kriteria,
        feedbackUmum: feedbackUmum,
      };
      
      // 🚨 MENGGUNAKAN MOCK SERVICE
      const result = await saveAssessment(taskId, groupId, dataToSave, status);
      
      alert(`Penilaian berhasil disimpan sebagai ${status.toUpperCase()}! Total Nilai: ${result.totalNilai.toFixed(2)}`);
      
      setCurrentStatus(result.status);
      
      // Panggil callback jika ada
      if (onAssessmentSaved) {
        onAssessmentSaved(result);
      }

    } catch (err) {
      setError(`Gagal menyimpan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  if (loading && kriteria.length === 0) {
    return <div className="alert alert-info">Memuat form penilaian...</div>;
  }
  
  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className='p-4 border rounded shadow-sm bg-white'>
      <h3 className="mb-4 text-primary">Form Penilaian Tugas Lapangan</h3>
      
      {/* Informasi Kelompok (Simulasi) */}
      <div className="alert alert-light border-start border-4 border-primary">
          <p className="mb-1"><strong>Tugas:</strong> Proyek Pengembangan Web</p>
          <p className="mb-0"><strong>Kelompok:</strong> {groupId} (Anggota: Budi, Sinta, Andi)</p>
      </div>

      {/* Nilai Total (Display) */}
      <div className="text-end mb-4">
        <span className={`badge p-3 fs-5 ${isFinal ? 'bg-success' : 'bg-secondary'}`}>
          Total Nilai: {isFinal ? totalNilai : `${totalNilai} (Draft)`}
        </span>
      </div>

      {/* Daftar Kriteria Penilaian */}
      <h4 className='mb-3'>Kriteria Penilaian (Bobot Total: {kriteria.reduce((sum, k) => sum + k.bobot, 0).toFixed(1)})</h4>
      <div className="row g-3">
        {kriteria.map((k) => (
          <div key={k.idKriteria} className="col-12 border-bottom pb-3">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label fw-bold">{k.nama} (Bobot: {k.bobot * 100}%)</label>
                <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Nilai (1-100)"
                      min="1"
                      max="100"
                      value={k.nilai}
                      onChange={(e) => handleInputChange(k.idKriteria, 'nilai', e.target.value)}
                      disabled={isFinal} // Final tidak bisa diedit
                      required
                    />
                    <span className="input-group-text">/ 100</span>
                </div>
              </div>
              <div className="col-md-8">
                <label className="form-label">Catatan Kriteria ({k.nama}) (Opsional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tambahkan catatan spesifik untuk kriteria ini"
                  value={k.catatan}
                  onChange={(e) => handleInputChange(k.idKriteria, 'catatan', e.target.value)}
                  disabled={isFinal} // Final tidak bisa diedit
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Umum */}
      <div className="mb-4">
        <label htmlFor="feedbackUmum" className="form-label fw-bold">Feedback Umum Kelompok</label>
        <textarea
          className="form-control"
          id="feedbackUmum"
          rows="3"
          value={feedbackUmum}
          onChange={(e) => setFeedbackUmum(e.target.value)}
          disabled={isFinal} // Final tidak bisa diedit
        ></textarea>
      </div>

      {/* Tombol Aksi */}
      <div className="d-flex justify-content-end">
        {!isFinal && (
          <>
            <button 
              className="btn btn-secondary me-2" 
              onClick={() => handleSave('draft')} 
              disabled={loading}
            >
              Simpan Draft
            </button>
            <button 
              className="btn btn-success" 
              onClick={() => handleSave('final')} 
              disabled={loading}
            >
              Submit Final
            </button>
          </>
        )}
        {isFinal && (
          <button className="btn btn-info" disabled>
            Nilai Sudah Final
          </button>
        )}
      </div>
    </div>
  );
};

export default FormPenilaian;
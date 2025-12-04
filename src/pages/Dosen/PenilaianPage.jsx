// src/pages/Dosen/PenilaianPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import LayoutDosen from '../../layouts/LayoutDosen';
import FormPenilaian from '../../components/forms/FormPenilaian'; // Import komponen yang sudah dibuat sebelumnya
// import api from '../../utils/api'; // Sudah di-import di FormPenilaian, tapi bisa di-import di sini juga jika diperlukan

// --- DUMMY DATA UNTUK SIMULASI (Ganti dengan API Call ke backend Anda) ---
const DUMMY_KELAS = [
  { idKelas: 1, namaKelas: 'TI-2022', mataKuliah: 'Pemrograman Web' },
  { idKelas: 2, namaKelas: 'SI-2023', mataKuliah: 'Sistem Informasi' },
];

const DUMMY_TUGAS = [
  { idTugas: 101, judul: 'Studi Kasus Toko Online', tanggalPelaksanaan: '2025-11-20' },
  { idTugas: 102, judul: 'Analisis Lapangan Logistik', tanggalPelaksanaan: '2025-12-01' },
];

// Data ini akan datang dari API /dosen/tugas/{taskId}/kelompok-penilaian
const DUMMY_KELOMPOK = [
  { idKelompok: 1, nomorKelompok: 1, totalAnggota: 5, statusPenilaian: 'final', nilaiTotal: 89.5, taskId: 101 },
  { idKelompok: 2, nomorKelompok: 2, totalAnggota: 4, statusPenilaian: 'draft', nilaiTotal: 75.0, taskId: 101 },
  { idKelompok: 3, nomorKelompok: 3, totalAnggota: 5, statusPenilaian: 'belum dinilai', nilaiTotal: null, taskId: 101 },
];

const PenilaianPage = () => {
  const [kelasId, setKelasId] = useState('');
  const [tugasId, setTugasId] = useState('');
  const [daftarKelompok, setDaftarKelompok] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null); // State untuk PNL-002
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- LOGIKA PENGAMBILAN DATA KELOMPOK ---

  const fetchKelompok = useCallback(async (taskId) => {
    if (!taskId) return;
    setLoading(true);
    setError('');
    
    // GANTI DENGAN API CALL SEBENARNYA KE BACKEND
    // try {
    //   const response = await api.get(`/dosen/tugas/${taskId}/kelompok-penilaian`);
    //   setDaftarKelompok(response.data.data);
    // } catch (err) {
    //   setError('Gagal mengambil daftar kelompok.');
    // } finally {
    //   setLoading(false);
    // }

    // Menggunakan Dummy Data:
    setTimeout(() => {
      // Filter dummy data sesuai tugas yang dipilih
      const filtered = DUMMY_KELOMPOK.filter(k => k.taskId === parseInt(taskId));
      setDaftarKelompok(filtered);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchKelompok(tugasId);
  }, [tugasId, fetchKelompok]);
  
  // --- HANDLER ---
  
  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };
  
  const handleAssessmentSaved = (newStatus) => {
    // Logic: Setelah simpan, update status kelompok di tabel, lalu kembali ke daftar
    setDaftarKelompok(prev => 
      prev.map(k => 
        k.idKelompok === selectedGroup.idKelompok ? { ...k, statusPenilaian: newStatus } : k
      )
    );
    setSelectedGroup(null); // Kembali ke list (PNL-001)
  };

  // --- TAMPILAN KONDISIONAL ---
  
  // KONDISI 1: Tampilkan Form Penilaian (PNL-002)
  if (selectedGroup) {
    return (
      <LayoutDosen>
        <button 
          className="btn btn-outline-secondary mb-3" 
          onClick={() => setSelectedGroup(null)}
        >
          <i className="bi bi-arrow-left me-2"></i> Kembali ke Daftar Kelompok
        </button>
        {/* Mengirim ID Tugas dan ID Kelompok ke FormPenilaian */}
        <FormPenilaian 
          taskId={selectedGroup.taskId} 
          groupId={selectedGroup.idKelompok} 
          onAssessmentSaved={handleAssessmentSaved}
        />
      </LayoutDosen>
    );
  }

  // KONDISI 2: Tampilkan Daftar Kelompok (PNL-001)
  return (
    <LayoutDosen>
      <h2>Penilaian Tugas Kelompok</h2>
      <p className="lead">Pilih Tugas Lapangan yang akan dinilai.</p>

      {/* Filter Kelas dan Tugas */}
      <div className="card mb-4 p-3 shadow-sm">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Pilih Kelas</label>
            <select 
              className="form-select" 
              value={kelasId} 
              onChange={(e) => { setKelasId(e.target.value); setTugasId(''); setDaftarKelompok([]); }}
            >
              <option value="">-- Pilih Kelas --</option>
              {DUMMY_KELAS.map(k => (
                <option key={k.idKelas} value={k.idKelas}>{k.namaKelas} - {k.mataKuliah}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Pilih Tugas Lapangan</label>
            <select 
              className="form-select" 
              value={tugasId} 
              onChange={(e) => setTugasId(e.target.value)}
              disabled={!kelasId} // Tugas hanya aktif jika kelas dipilih
            >
              <option value="">-- Pilih Tugas --</option>
              {/* Di sini Anda perlu memfilter DUMMY_TUGAS berdasarkan kelasId jika menggunakan API */}
              {kelasId && DUMMY_TUGAS.map(t => (
                <option key={t.idTugas} value={t.idTugas}>{t.judul}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Tabel Daftar Kelompok */}
      {tugasId && (
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">
            Daftar Kelompok Tugas: {DUMMY_TUGAS.find(t => t.idTugas === parseInt(tugasId))?.judul || '...'}
          </div>
          <div className="card-body">
            {loading && <div className="text-center"><div className="spinner-border text-primary" role="status"></div><p>Memuat data kelompok...</p></div>}
            {error && <div className="alert alert-danger">{error}</div>}
            
            {!loading && daftarKelompok.length === 0 && !error && (
              <div className="alert alert-info">Belum ada kelompok yang terbentuk untuk tugas ini.</div>
            )}

            {!loading && daftarKelompok.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No. Kelompok</th>
                      <th>Anggota</th>
                      <th>Status Penilaian</th>
                      <th>Nilai Total</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daftarKelompok.map((k) => (
                      <tr key={k.idKelompok}>
                        <td>{k.nomorKelompok}</td>
                        <td>{k.totalAnggota} Mahasiswa</td>
                        <td>
                          <span className={`badge ${k.statusPenilaian === 'final' ? 'bg-success' : k.statusPenilaian === 'draft' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                            {k.statusPenilaian.toUpperCase()}
                          </span>
                        </td>
                        <td>{k.nilaiTotal ? k.nilaiTotal.toFixed(2) : '-'}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-primary" 
                            onClick={() => handleSelectGroup(k)}
                          >
                            {k.statusPenilaian === 'final' ? 'Lihat' : 'Nilai Sekarang'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </LayoutDosen>
  );
};

export default PenilaianPage;
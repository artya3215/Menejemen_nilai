// src/pages/Dosen/RekapNilaiPage.jsx

import React, { useState, useEffect } from 'react'; 
import api from '../../utils/api'; 
// ... (DUMMY DATA) ...

const exportRekapNilai = (format) => {
    alert(`[MOCK] Memproses Export ke ${format.toUpperCase()}...`);
};

// --- DATA MOCK KELAS & TUGAS (Untuk Dropdown) ---
const MOCK_KELAS_LIST = [
    { id: '1', nama: 'TI-2022', mataKuliah: 'Pemrograman Web' },
    { id: '2', nama: 'SI-2023', mataKuliah: 'Analisis Sistem' },
];

const MOCK_TUGAS_LIST = [
    { id: '101', kelasId: '1', judul: 'Studi Kasus Toko Online (Mock Data OK)' },
    { id: '102', kelasId: '2', judul: 'Analisis Lapangan Logistik' },
    { id: '103', kelasId: '1', judul: 'Tugas Proyek Akhir' },
];
// ----------------------------------------------------

const RekapNilaiPage = () => {
  const [rekapData, setRekapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  
  // SET NILAI DEFAULT AGAR FETCH TERPICU SAAT INI
  const [kelasId, setKelasId] = useState('1'); 
  const [tugasId, setTugasId] = useState('101'); 

  // Filter tugas berdasarkan kelas yang dipilih
  const filteredTugas = MOCK_TUGAS_LIST.filter(t => t.kelasId === kelasId);

  useEffect(() => {
    const fetchRekap = async () => {
        // Hanya fetch jika TUGAS ID sudah terpilih
        if (!tugasId) {
            setRekapData([]);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Panggil API Mock untuk Tugas ID yang dipilih
            const response = await api.get(`/dosen/rekap/tugas/${tugasId}`); 
            setRekapData(response.data.data);
            setError(null); 
        } catch (err) {
            console.error("Fetch Rekap Nilai Error:", err);
            // Menangkap dan menampilkan pesan error dari mock (misalnya 404)
            setError(err.message || `Gagal memuat data rekap. Pastikan Tugas ID ${tugasId} memiliki data mock.`);
            setRekapData([]);
        } finally {
            setLoading(false);
        }
    };
    
    // Panggil fetch saat tugasId berubah (termasuk saat initial render)
    fetchRekap();
  }, [tugasId]); 

  // --- HANDLER UTAMA ---
  
  // Handler saat Kelas diubah (mengunci tugas dan mereset tugasId)
  const handleKelasChange = (e) => {
      const newKelasId = e.target.value;
      setKelasId(newKelasId);
      
      // Reset tugasId saat kelas berubah 
      const newFilteredTugas = MOCK_TUGAS_LIST.filter(t => t.kelasId === newKelasId);
      const tugasPertama = newFilteredTugas.length > 0 ? newFilteredTugas[0] : null;
      
      // Set tugasId ke tugas pertama di kelas baru.
      setTugasId(tugasPertama ? tugasPertama.id : ''); 
      setRekapData([]);
      setError(null);
  };

  // Handler saat Tugas diubah (memicu fetch)
  const handleTugasChange = (e) => {
      // Mengubah state tugasId yang akan memicu useEffect
      setTugasId(e.target.value); 
  };
  
  // --- RENDER ---

  if (loading && tugasId) {
      return <div className="text-center mt-5"><div className="spinner-border" role="status"></div><p>Memuat data rekap...</p></div>;
  }
  
  return (
    <> 
      <h2>Rekapitulasi Nilai Tugas Lapangan</h2>
      <p className="lead">Lihat rekap nilai kelompok dan unduh laporannya (NIL-002).</p>

       <div className="card mb-4 p-3 shadow-sm">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="selectKelas">Pilih Kelas</label>
            <select 
                className="form-select" 
                value={kelasId} 
                onChange={handleKelasChange}
                id="selectKelas"
            >
              <option value="">-- Pilih Kelas --</option>
              {MOCK_KELAS_LIST.map(k => (
                  <option key={k.id} value={k.id}>{k.nama} - {k.mataKuliah}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="selectTugas">Pilih Tugas Lapangan</label>
            <select 
              className="form-select" 
              value={tugasId} 
              onChange={handleTugasChange} 
              disabled={!kelasId} 
              id="selectTugas"
            >
              <option value="">-- Pilih Tugas --</option>
              {filteredTugas.map(t => (
                  <option key={t.id} value={t.id}>{t.id} - {t.judul}</option> 
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Container Rekap Nilai */}
      {tugasId && (
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white"> {/* PENYELARASAN WARNA */}
            Rekap Nilai Tugas ID: {tugasId}
            <div className="btn-group">
                <button className="btn btn-sm btn-light" onClick={() => exportRekapNilai('excel')}>Export Excel</button>
                <button className="btn btn-sm btn-light" onClick={() => exportRekapNilai('pdf')}>Export PDF</button>
            </div>
          </div>
          <div className="card-body">
            
            {/* Menampilkan Error dengan box merah */}
            {error && rekapData.length === 0 && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}
            
            {rekapData.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No. Kelompok</th>
                      <th>Jml. Anggota</th>
                      <th>Nilai Total</th>
                      <th>Status</th>
                      <th>Feedback Umum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rekapData.map((r) => (
                      <tr key={r.idKelompok}> 
                        <td>{r.nomorKelompok}</td>
                        <td>{r.totalAnggota}</td>
                        <td className="fw-bold">{r.nilaiTotal || '-'}</td>
                        <td>
                          <span className={`badge ${r.statusPenilaian === 'final' ? 'bg-success' : r.statusPenilaian === 'draft' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                              {r.statusPenilaian.toUpperCase()}
                          </span>
                        </td>
                        <td>{r.feedback || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Pesan saat data tidak ditemukan (dan tidak ada error) */}
            {!error && rekapData.length === 0 && tugasId &&
              <div className="alert alert-warning">Tidak ditemukan rekap nilai untuk tugas ini.</div>
            }
          </div>
        </div>
      )}
       {/* Pesan Awal Jika Filter Belum Dipilih */}
       {(!kelasId && !tugasId) && <div className="alert alert-info mt-3">Silakan pilih **Kelas** dan **Tugas Lapangan** untuk melihat rekap nilai.</div>}
    </>
  );
};

export default RekapNilaiPage;
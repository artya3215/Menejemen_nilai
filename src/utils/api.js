// src/utils/api.js

import axios from 'axios';

const IS_MOCKING_ENABLED = true; 
const REAL_API_URL = 'http://localhost:8000/api'; 

const api = axios.create({
  baseURL: REAL_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Kunci unik di localStorage untuk menyimpan semua data penilaian yang dibuat user
const LOCAL_SCORE_KEY = 'user_assessment_scores';

// Fungsi helper untuk menghitung Total Nilai (dengan bobot mock)
const calculateTotalScore = (detailNilai, kriteria) => {
    let totalScore = 0;
    detailNilai.forEach(detail => {
        const kriteriaItem = kriteria.find(k => k.idKriteria === detail.kriteriaId);
        if (kriteriaItem) {
            totalScore += (detail.nilai * kriteriaItem.bobot);
        }
    });
    return parseFloat(totalScore).toFixed(2);
};


// Data Kriteria Penilaian Dasar (Digunakan sebagai fallback untuk semua tugas)
const BASE_CRITERIA_MOCK = {
    kriteria: [
        { idKriteria: 1, namaKriteria: 'Kualitas Laporan', bobot: 0.5 },
        { idKriteria: 2, namaKriteria: 'Kerja Sama Tim', bobot: 0.3 },
        { idKriteria: 3, namaKriteria: 'Inisiatif Lapangan', bobot: 0.2 },
    ],
    message: 'Kriteria berhasil dimuat',
};

const MOCK_DATA = {
    // 🔥 Kunci Kritis: DATA REKAP NILAI 101 (Disarankan untuk dihapus jika menggunakan local storage)
    '/dosen/rekap/tugas/101': {
        data: [
          { idKelompok: 201, nomorKelompok: 1, totalAnggota: 5, nilaiTotal: 92.5, statusPenilaian: 'final', feedback: 'Pekerjaan sangat memuaskan.' },
          { idKelompok: 202, nomorKelompok: 2, totalAnggota: 4, nilaiTotal: 78.0, statusPenilaian: 'draft', feedback: null },
        ],
        message: 'Rekap nilai berhasil dimuat',
    },
    
    // Data Tugas dan Kelas Statis
    '/dosen/tugas': {
        data: [
          { id: '101', judul: 'Ekskursi Karangsambung (Tugas Mock OK)', lokasi: 'Kebumen', tanggalPelaksanaan: '2024-12-10', status: 'aktif' },
          { id: '102', judul: 'Pemetaan Kampus (Tugas Mock OK)', lokasi: 'Area Kampus', tanggalPelaksanaan: '2024-11-20', status: 'selesai' },
        ],
        message: 'Daftar tugas berhasil dimuat.',
    },
    '/dosen/kelas': {
        data: [
          { id: '1', namaKelas: 'TI-2022', mataKuliah: 'Pemrograman Web', jumlahMahasiswa: 35 },
        ],
        message: 'Kelas berhasil dimuat',
    },
};

const mockApi = {
  get: (url) => {
    
    // 1. Penanganan GET untuk Kriteria Penilaian (RUTE: /dosen/penilaian/:tugasId/:kelompokId)
    const matchPenilaian = url.match(/\/dosen\/penilaian\/(\d+)\/(\d+)/);
    if (matchPenilaian) {
        const taskId = matchPenilaian[1]; 
        const kelompokId = matchPenilaian[2];
        const key = `${taskId}-${kelompokId}`;
        
        // 🔥 PERBAIKAN KRITIS: Memuat data tersimpan dari localStorage
        const allScores = JSON.parse(localStorage.getItem(LOCAL_SCORE_KEY)) || {};
        const existingScore = allScores[key];

        // Tentukan nilai awal berdasarkan data yang tersimpan atau default
        const nilaiYangAda = existingScore ? existingScore.detailNilai : [];
        const status = existingScore ? existingScore.status : 'belum dinilai';
        const feedbackUmum = existingScore ? existingScore.feedbackUmum : '';

        // Selalu kembalikan BASE_CRITERIA_MOCK
        const finalResponse = {
            kriteria: BASE_CRITERIA_MOCK.kriteria, 
            nilaiYangAda: nilaiYangAda,
            feedbackUmum: feedbackUmum,
            status: status
        };

        console.log(`[MOCK API SUCCESS] GET ${url}: Form Penilaian Loaded. Status: ${status}`);
        return new Promise(resolve => setTimeout(() => resolve({ 
            data: finalResponse, 
            status: 200 
        }), 500));
    }

    // 2. Penanganan GET endpoint statis (diutamakan)
    const mockResponse = MOCK_DATA[url];
    if (mockResponse) {
      console.log(`[MOCK API SUCCESS] GET ${url}: Statis Ditemukan.`);
      return new Promise(resolve => setTimeout(() => resolve({ data: mockResponse, status: 200 }), 500));
    }

    // 3. Penanganan permintaan GET untuk Rekap Nilai
    if (url.match(/\/dosen\/rekap\/tugas\/(\d+)/)) {
        // ... (Logika Rekap Nilai tetap sama) ...
        const parts = url.split('/');
        const taskId = parts[3];
        const key = `/dosen/rekap/tugas/${taskId}`; 
        const mockResponse = MOCK_DATA[key];
        
        if (mockResponse) {
             console.log(`[MOCK API SUCCESS] GET ${url}: Rekap Ditemukan.`);
             return new Promise(resolve => setTimeout(() => resolve({ data: mockResponse, status: 200 }), 100));
        } else {
             console.error(`[MOCK API FAILED] GET ${url}: Kunci tidak ditemukan di MOCK_DATA.`);
             return Promise.reject({ response: { status: 404, data: { message: `Tugas ID ${taskId} tidak memiliki data mock.` } } });
        }
    }
    
    // Default Reject jika tidak ada yang cocok
    return Promise.reject({ response: { status: 404, data: { message: `Endpoint ${url} tidak ditemukan di Mock Data.` } } });
  },
  
  // 4. Penanganan POST (Menyimpan Penilaian ke localStorage)
  post: (url, data) => {
    // POST untuk menyimpan nilai
    const matchPenilaianSave = url.match(/\/dosen\/tugas\/(\d+)\/kelompok\/(\d+)\/nilai/);
    if (matchPenilaianSave) {
        const taskId = matchPenilaianSave[1]; 
        const kelompokId = matchPenilaianSave[2];
        const key = `${taskId}-${kelompokId}`;
        const status = data.status;

        // 🔥 PERBAIKAN KRITIS: Hitung skor dan simpan ke localStorage
        const totalScore = calculateTotalScore(data.detailNilai, BASE_CRITERIA_MOCK.kriteria);
        
        const newScoreData = {
            detailNilai: data.detailNilai,
            feedbackUmum: data.feedbackUmum,
            status: status,
            totalNilai: totalScore,
            tanggalDinilai: new Date().toISOString()
        };
        
        const allScores = JSON.parse(localStorage.getItem(LOCAL_SCORE_KEY)) || {};
        allScores[key] = newScoreData;
        
        localStorage.setItem(LOCAL_SCORE_KEY, JSON.stringify(allScores));
        
        console.log(`[MOCK API SUCCESS] POST ${url}: Nilai tersimpan sebagai ${status.toUpperCase()}. Total: ${totalScore}`);
        return new Promise(resolve => setTimeout(() => resolve({ 
            data: { message: `Nilai kelompok berhasil disimpan sebagai ${status.toUpperCase()}!`, totalNilai: totalScore }, 
            status: 201 
        }), 1000));
    }

    // POST untuk membuat tugas baru (tetap sama)
    if (url === '/dosen/tugas/create') {
        const newId = Math.floor(Math.random() * 1000) + 10;
        console.log(`[MOCK API SUCCESS] POST ${url}: Tugas baru dibuat ID ${newId}`);
        return new Promise(resolve => setTimeout(() => resolve({ 
            data: { message: `Tugas berhasil disimpan (Mocked)`, idTugas: newId }, 
            status: 201 
        }), 1000));
    }
    return new Promise(resolve => setTimeout(() => resolve({ data: { message: 'Operasi POST berhasil (Mocked)' }, status: 201 }), 500));
  },
  
  put: (url, data) => {
    return new Promise(resolve => setTimeout(() => resolve({ data: { message: 'Operasi PUT berhasil (Mocked)' }, status: 200 }), 500));
  },
  delete: (url) => {
    return new Promise(resolve => setTimeout(() => resolve({ data: { message: 'Operasi DELETE berhasil (Mocked)' }, status: 204 }), 500));
  }
};

export default IS_MOCKING_ENABLED ? mockApi : api;
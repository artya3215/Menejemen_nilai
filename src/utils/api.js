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

const MOCK_DATA = {
    // 🔥 Kunci Kritis: DATA REKAP NILAI 101
    '/dosen/rekap/tugas/101': {
        data: [
          { idKelompok: 201, nomorKelompok: 1, totalAnggota: 5, nilaiTotal: 92.5, statusPenilaian: 'final', feedback: 'Pekerjaan sangat memuaskan.' },
          { idKelompok: 202, nomorKelompok: 2, totalAnggota: 4, nilaiTotal: 78.0, statusPenilaian: 'draft', feedback: null },
        ],
        message: 'Rekap nilai berhasil dimuat',
    },
    '/dosen/rekap/tugas/102': { /* ... data ... */ },
    '/dosen/rekap/tugas/103': { /* ... data ... */ },
    
    // Data Kriteria (untuk Form Penilaian)
    '/dosen/tugas/101/kriteria': {
        data: [
            { idKriteria: 1, namaKriteria: 'Kualitas Laporan', bobot: 0.5 },
            { idKriteria: 2, namaKriteria: 'Kerja Sama Tim', bobot: 0.3 },
            { idKriteria: 3, namaKriteria: 'Inisiatif Lapangan', bobot: 0.2 },
        ],
        message: 'Kriteria berhasil dimuat',
    },
    
    // Data statis lainnya
    '/dosen/tugas': {
        data: [
          { id: '1', judul: 'Ekskursi Karangsambung', lokasi: 'Kebumen', tanggalPelaksanaan: '2024-12-10', status: 'aktif' },
          { id: '2', judul: 'Pemetaan Kampus', lokasi: 'Area Kampus', tanggalPelaksanaan: '2024-11-20', status: 'selesai' },
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
    // 1. Penanganan permintaan GET untuk Rekap Nilai
    if (url.match(/\/dosen\/rekap\/tugas\/(\d+)/)) {
        const parts = url.split('/');
        const taskId = parts[3];
        const key = `/dosen/rekap/tugas/${taskId}`; 
        const mockResponse = MOCK_DATA[key];

        if (mockResponse) {
             console.log(`[MOCK API SUCCESS] GET ${url}: Rekap Ditemukan.`);
             // Mengurangi timeout untuk memastikan Promise berhasil terselesaikan
             return new Promise(resolve => setTimeout(() => resolve({ data: mockResponse, status: 200 }), 100));
        } else {
             console.error(`[MOCK API FAILED] GET ${url}: Kunci tidak ditemukan di MOCK_DATA.`);
             return Promise.reject({ response: { status: 404, data: { message: `Tugas ID ${taskId} tidak memiliki data mock.` } } });
        }
    }
    
    // 2. Penanganan permintaan GET untuk Kriteria Penilaian
    if (url.match(/\/dosen\/tugas\/(\d+)\/kelompok\/(\d+)\/kriteria/)) {
        const parts = url.split('/');
        const taskId = parts[3];
        const mockResponse = MOCK_DATA[`/dosen/tugas/${taskId}/kriteria`];
        
        const nilaiYangAda = (taskId === '101' && parts[5] === '102') 
            ? [{ kriteriaId: 1, nilai: 70, catatan: 'Baik' }, { kriteriaId: 2, nilai: 80 }]
            : []; 

        if (mockResponse) {
             console.log(`[MOCK API SUCCESS] GET ${url}: Kriteria Ditemukan.`);
             return new Promise(resolve => setTimeout(() => resolve({ 
                 data: { 
                     kriteria: mockResponse.data, 
                     nilaiYangAda: nilaiYangAda,
                     feedbackUmum: nilaiYangAda.length > 0 ? 'Revisi bagian 2.' : '',
                     status: nilaiYangAda.length > 0 ? 'draft' : 'belum dinilai'
                 }, 
                 status: 200 
            }), 500));
        }
    }

    // 3. Penanganan GET endpoint statis lainnya
    const mockResponse = MOCK_DATA[url];
    if (mockResponse) {
      console.log(`[MOCK API SUCCESS] GET ${url}: Statis Ditemukan.`);
      return new Promise(resolve => setTimeout(() => resolve({ data: mockResponse, status: 200 }), 500));
    }
    return Promise.reject({ response: { status: 404, data: { message: `Endpoint ${url} tidak ditemukan di Mock Data.` } } });
  },
  
  // 4. Penanganan POST, PUT, DELETE
  post: (url, data) => {
    if (url.match(/\/dosen\/tugas\/(\d+)\/kelompok\/(\d+)\/nilai/)) {
        const status = data.status.toUpperCase();
        return new Promise(resolve => setTimeout(() => resolve({ 
            data: { message: `Nilai kelompok berhasil disimpan sebagai ${status} (Mocked)` }, 
            status: 201 
        }), 1000));
    }
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
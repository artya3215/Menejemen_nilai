// src/services/penilaian.js

import api from '../utils/api'; 

// Endpoint placeholder
// /dosen/tugas/{tugasId}/kelompok/{kelompokId}/kriteria -> GET
// /dosen/tugas/{tugasId}/kelompok/{kelompokId}/nilai -> POST

/**
 * Mengambil daftar kriteria penilaian, nilai yang sudah ada (draft), dan status.
 * @param {string} taskId - ID Tugas Lapangan.
 * @param {string} kelompokId - ID Kelompok yang dinilai.
 * @returns {Promise<Object>} - Detail kriteria, nilai yang sudah ada (jika draft), dan feedback.
 */
export const getAssessmentForm = async (taskId, kelompokId) => {
  try {
    // Path disesuaikan dengan skema RUTE BARU di App.jsx dan API mock: /dosen/penilaian/{taskId}/{kelompokId}
    const response = await api.get(`/dosen/penilaian/${taskId}/${kelompokId}`); 
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Gagal mengambil form penilaian.';
    throw new Error(errorMessage);
  }
};

/**
 * Menyimpan nilai kelompok (Draft atau Final).
 * @param {string} taskId - ID Tugas Lapangan.
 * @param {string} kelompokId - ID Kelompok.
 * @param {Array<Object>} detailNilai - Array objek {kriteriaId: number, nilai: float, catatan: string}.
 * @param {string} feedbackUmum - Feedback umum dari dosen.
 * @param {string} status - 'draft' atau 'final'.
 */
export const saveAssessment = async (taskId, kelompokId, detailNilai, feedbackUmum, status) => {
  try {
    // Path POST API tetap menggunakan skema yang jelas
    const response = await api.post(`/dosen/tugas/${taskId}/kelompok/${kelompokId}/nilai`, {
      detailNilai,
      feedbackUmum,
      status
    });
    return response.data.message;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Gagal menyimpan nilai.';
    throw new Error(errorMessage);
  }
};
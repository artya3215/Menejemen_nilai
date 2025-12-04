// src/components/DetailTugasModal.jsx

import React from 'react';

const DetailTugasModal = ({ show, onClose, tugasData }) => {
    if (!show || !tugasData) return null;

    // MOCK data detail tugas yang lebih kaya
    // Dalam implementasi backend, data ini akan diambil dari API
    const mockDetail = {
        deskripsi: "Proyek ini bertujuan merancang dan mengimplementasikan solusi e-commerce berbasis React.js dan Node.js. Fokus pada otentikasi aman, manajemen state yang efisien, dan integrasi API pembayaran (simulasi).",
        filePanduan: "Dokumen-Panduan-Proyek-PW2025.pdf",
        tanggalTugas: "2024-09-01",
        tugasKelompok: true,
        bobotNilai: "40% Project, 60% Presentasi",
    };

    return (
        // Struktur Modal Bootstrap Sederhana
        <div 
            className="modal fade show" 
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', overflowY: 'auto' }} 
            tabIndex="-1"
            // Tambahkan event handler untuk menutup modal saat klik di luar
            onClick={(e) => {
                // Hanya tutup jika klik terjadi pada backdrop (div modal fade show)
                if (e.target.classList.contains('modal')) {
                    onClose();
                }
            }}
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-info text-white">
                        <h5 className="modal-title">Detail Tugas: {tugasData.nama}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <h6>**Informasi Umum**</h6>
                        <ul className="list-group list-group-flush mb-3">
                            <li className="list-group-item"><strong>Deadline:</strong> {tugasData.deadline}</li>
                            <li className="list-group-item"><strong>Jenis Tugas:</strong> {mockDetail.tugasKelompok ? 'Kelompok' : 'Individu'}</li>
                            <li className="list-group-item"><strong>Dibuat Pada:</strong> {mockDetail.tanggalTugas}</li>
                            <li className="list-group-item"><strong>Bobot Penilaian:</strong> {mockDetail.bobotNilai}</li>
                        </ul>

                        <h6>**Deskripsi Tugas**</h6>
                        <p className="alert alert-light border-start border-4 border-info">{mockDetail.deskripsi}</p>

                        <h6>**Dokumen Panduan**</h6>
                        <div className="d-flex justify-content-between align-items-center">
                            <i className="bi bi-file-earmark-arrow-down-fill text-primary fs-5 me-2"></i>
                            <span className='me-auto'>{mockDetail.filePanduan}</span>
                            <button className='btn btn-sm btn-outline-primary'>
                                <i className="bi bi-download me-1"></i> Unduh
                            </button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Tutup</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailTugasModal;
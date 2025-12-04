// src/components/DraftPreviewModal.jsx

import React from 'react';

const DraftPreviewModal = ({ show, onClose, draftData }) => {
    if (!show || !draftData) return null;

    // Data draft simulasi (disesuaikan agar terlihat lebih nyata)
    const mockDraftDetail = {
        deskripsi: "Ini adalah draf yang disimpan pada tanggal 2025-10-15 pukul 10:30. Bagian Pendahuluan sudah selesai, namun Bab II masih kosong.",
        fileTersimpan: [
            { id: 1, nama: `Laporan-${draftData.id}-Draft-v1.docx`, ukuran: '150 KB' },
            { id: 2, nama: 'Diagram_Konsep.png', ukuran: '320 KB' },
        ],
        terakhirDisimpan: '2025-10-15 10:30:00',
    };

    return (
        <div 
            className="modal fade show" 
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', overflowY: 'auto' }} 
            tabIndex="-1"
            onClick={(e) => {
                if (e.target.classList.contains('modal')) {
                    onClose();
                }
            }}
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-warning text-dark">
                        <h5 className="modal-title">💾 Preview Draft Tugas: {draftData.nama}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        
                        <div className="alert alert-warning small">
                            Draft ini **belum disubmit** dan hanya dapat dilihat oleh Anda.
                            <br/>Terakhir Disimpan: **{mockDraftDetail.terakhirDisimpan}**
                        </div>

                        <h6>Deskripsi Draft Tersimpan:</h6>
                        <p className="border p-3 bg-light rounded">{mockDraftDetail.deskripsi}</p>

                        <h6 className="mt-4">Dokumen Tersimpan:</h6>
                        <ul className="list-group">
                            {mockDraftDetail.fileTersimpan.map(file => (
                                <li key={file.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>
                                        <i className="bi bi-file-earmark-text me-2 text-primary"></i> {file.nama}
                                    </span>
                                    <span className="badge bg-secondary">{file.ukuran}</span>
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Tutup</button>
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={() => {
                                onClose();
                                alert('Simulasi: Mengunduh semua file...');
                            }}
                        >
                            <i className="bi bi-download me-1"></i> Unduh Semua Draft
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DraftPreviewModal;
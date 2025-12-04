// src/components/DetailSubmissionModal.jsx

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetailSubmissionModal = ({ show, onClose, submissionData }) => {
    if (!submissionData) return null;

    const { nama, file, deskripsi, tanggalSubmit } = submissionData;

    // Handler simulasi download
    const handleDownload = () => {
        alert(`Simulasi: Mengunduh file ${file}...`);
        // Di aplikasi nyata, gunakan window.open(submissionData.fileURL) atau API call
    };

    return (
        // 🔥 FIX: Correcting the typo in onHide handler (it should be onHide={onClose})
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title><i className="bi bi-file-earmark-check-fill me-2"></i> Detail Submission: {nama}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Submission ini telah dikirim pada tanggal <strong>{tanggalSubmit}</strong>.</p>
                
                <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">
                        <strong>File Terunggah:</strong> {file} 
                        {/* FIX ACCESSIBILITY: Ganti <a> dengan <span> role="button" */}
                        <span 
                            role="button" 
                            className="ms-2 badge bg-info text-white"
                            onClick={handleDownload} 
                        >
                            Download
                        </span>
                    </li>
                    <li className="list-group-item">
                        <strong>Deskripsi/Catatan:</strong> 
                        <p className="mt-2 p-2 bg-light border rounded">{deskripsi || "Tidak ada catatan."}</p>
                    </li>
                </ul>

                <small className="text-muted">Status: Menunggu Penilaian Dosen.</small>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Tutup</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailSubmissionModal;
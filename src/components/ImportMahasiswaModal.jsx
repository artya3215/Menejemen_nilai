// src/components/ImportMahasiswaModal.jsx

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ImportMahasiswaModal = ({ show, onClose, kelasId, onImportSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);
    };

    const handleImportSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Harap pilih file CSV atau Excel.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // SIMULASI UPLOAD FILE
            console.log(`[API CALL SIMULATION] Mengunggah file ${file.name} ke Kelas ID: ${kelasId}`);
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            // Simulasi success (Mengembalikan jumlah data yang diimpor)
            const importedCount = Math.floor(Math.random() * 10) + 5; 
            
            alert(`Sukses! ${importedCount} data mahasiswa dari file ${file.name} berhasil diimpor (Simulasi).`);
            
            if (onImportSuccess) {
                onImportSuccess(importedCount);
            }
            onClose();
            setFile(null);

        } catch (e) {
            setError('Gagal memproses file. Pastikan formatnya benar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title><i className="bi bi-upload me-2"></i> Import Daftar Mahasiswa</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleImportSubmit}>
                <Modal.Body>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <p className="text-muted">
                        Silakan unggah file CSV atau Excel yang berisi data **NIM** dan **Nama** mahasiswa.
                    </p>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Pilih File Import:</Form.Label>
                        <Form.Control 
                            type="file" 
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleFileChange}
                            required
                        />
                    </Form.Group>
                    <small className="d-block mt-2 text-primary">Kelas Target: {kelasId}</small>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose} disabled={loading}>
                        Batal
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading || !file}>
                        {loading ? 'Mengimpor...' : 'Mulai Import'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ImportMahasiswaModal;
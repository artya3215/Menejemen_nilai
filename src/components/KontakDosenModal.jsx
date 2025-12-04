// src/components/KontakDosenModal.jsx

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const KontakDosenModal = ({ show, onClose, dosenName }) => {
    // 🚨 Simulasi Data Kontak
    const kontak = {
        email: dosenName.replace(/ /g, '').toLowerCase().replace(/dr\.|m\.kom\./g, '') + '@univ.ac.id',
        whatsapp: '+6281234567890',
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title><i className="bi bi-chat-dots-fill me-2"></i> Kontak Dosen Pembimbing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Silakan hubungi <strong>{dosenName}</strong> melalui saluran berikut:</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <i className="bi bi-envelope-fill me-2 text-primary"></i> 
                        <strong>Email:</strong> <a href={`mailto:${kontak.email}`}>{kontak.email}</a>
                    </li>
                    <li className="list-group-item">
                        <i className="bi bi-whatsapp me-2 text-success"></i> 
                        <strong>WhatsApp:</strong> <a href={`https://wa.me/${kontak.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer">{kontak.whatsapp}</a>
                    </li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Tutup</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default KontakDosenModal;
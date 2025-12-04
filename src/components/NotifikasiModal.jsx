// src/components/NotifikasiModal.jsx

import React from 'react';
import { Modal, Button } from 'react-bootstrap'; 

const NotifikasiModal = ({ show, onClose, notifikasiList }) => {
    
    // Fungsi untuk mendapatkan ikon berdasarkan tipe notifikasi
    const getIcon = (tipe) => {
        switch (tipe) {
            case 'Tugas': return 'bi-journal-check text-warning';
            case 'Nilai': return 'bi-bar-chart-fill text-success';
            case 'Pengumuman': return 'bi-megaphone-fill text-info';
            default: return 'bi-info-circle-fill text-secondary';
        }
    };

    const handleTandaiDibaca = () => {
        alert("Semua notifikasi ditandai sudah dibaca!");
        onClose();
        // Logika nyata: panggil API untuk membersihkan notifikasi
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-primary">🔔 Notifikasi Terbaru</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {notifikasiList && notifikasiList.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {notifikasiList.map((notif) => (
                            <li key={notif.id} className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold d-flex align-items-center">
                                        <i className={`bi ${getIcon(notif.tipe)} me-2`}></i> {notif.tipe}
                                    </div>
                                    {notif.pesan}
                                </div>
                                <span className="badge bg-light text-muted rounded-pill mt-1">{notif.waktu}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="alert alert-light text-center">
                        Tidak ada notifikasi baru saat ini.
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Tutup
                </Button>
                {notifikasiList && notifikasiList.length > 0 && (
                    <Button variant="outline-primary" onClick={handleTandaiDibaca}>
                        Tandai Sudah Dibaca
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default NotifikasiModal;
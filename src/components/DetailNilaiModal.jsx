// src/components/DetailNilaiModal.jsx

import React from 'react';
import { Modal, Button } from 'react-bootstrap'; // Asumsi Anda menggunakan React Bootstrap

const DetailNilaiModal = ({ show, onClose, semesterData }) => {
    // Jika tidak ada data, jangan tampilkan modal
    if (!semesterData) {
        return null;
    }

    // Fungsi helper untuk menghitung bobot angka dari nilai huruf (Contoh)
    const getBobotAngka = (nilaiHuruf) => {
        const bobot = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'D': 1.0, 'E': 0.0 };
        return bobot[nilaiHuruf] || 0.0;
    };

    return (
        // Gunakan Modal dari react-bootstrap
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Rincian Nilai: {semesterData.semester}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <p><strong>IP Semester:</strong> <span className="text-success fw-bold">{semesterData.ipk}</span></p>
                    </div>
                    <div className="col-md-6 text-end">
                        <p><strong>Total SKS:</strong> <span className="fw-bold">{semesterData.mataKuliah.reduce((sum, mk) => sum + mk.sks, 0)}</span></p>
                    </div>
                </div>

                <h5>Daftar Mata Kuliah</h5>
                <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                        <thead className="table-light">
                            <tr>
                                <th>Kode</th>
                                <th>Mata Kuliah</th>
                                <th>SKS</th>
                                <th className='text-center'>Nilai Huruf</th>
                                <th className='text-center'>Bobot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {semesterData.mataKuliah.map((mk, index) => (
                                <tr key={index}>
                                    <td>{mk.kode}</td>
                                    <td>{mk.nama}</td>
                                    <td>{mk.sks}</td>
                                    <td className='text-center fw-bold'>{mk.nilaiHuruf}</td>
                                    <td className='text-center'>{getBobotAngka(mk.nilaiHuruf).toFixed(1)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Tutup
                </Button>
                <Button variant="primary">
                    <i className="bi bi-printer me-1"></i> Cetak KHS
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailNilaiModal;
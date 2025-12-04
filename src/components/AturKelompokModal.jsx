// src/components/AturKelompokModal.jsx

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AturKelompokModal = ({ show, onClose, taskId, totalMahasiswa = 20, onGroupCreated }) => {
    const [metode, setMetode] = useState('otomatis'); // 'otomatis' atau 'manual'
    const [jumlahAnggota, setJumlahAnggota] = useState(5); // Hanya relevan untuk Otomatis
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Hitung total kelompok yang akan terbentuk (untuk simulasi)
    const totalKelompok = Math.ceil(totalMahasiswa / (jumlahAnggota || 1));

    // Handler utama untuk proses Pembentukan Kelompok
    const handleCreateGroups = async () => {
        setError(null);
        setLoading(true);

        if (metode === 'otomatis' && (jumlahAnggota <= 0 || jumlahAnggota > totalMahasiswa)) {
            setError('Jumlah anggota tidak valid.');
            setLoading(false);
            return;
        }

        try {
            // SIMULASI API POST ke endpoint /dosen/tugas/{id}/kelompok/create
            console.log(`[API CALL] Membentuk Kelompok untuk Tugas ID ${taskId}`);
            console.log(`Metode: ${metode}, Jumlah Anggota: ${jumlahAnggota}`);
            
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            alert(`Simulasi: Berhasil membentuk ${totalKelompok} kelompok secara ${metode.toUpperCase()}.`);
            
            // Panggil callback untuk me-refresh halaman utama
            if (onGroupCreated) {
                onGroupCreated({ totalKelompok, metode }); 
            }
            onClose();

        } catch (e) {
            setError('Gagal memproses pembentukan kelompok. Cek log API.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title><i className="bi bi-people-fill me-2"></i> Atur Pembentukan Kelompok</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div className="alert alert-danger">{error}</div>}
                
                <p>Tugas ID: **{taskId}** | Total Mahasiswa di Kelas: **{totalMahasiswa}** orang.</p>
                
                {/* PILIH METODE PEMBENTUKAN */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Pilih Metode Pembentukan:</label>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="metodePembentukan" 
                            id="otomatis" 
                            value="otomatis"
                            checked={metode === 'otomatis'}
                            onChange={(e) => setMetode(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="otomatis">
                            Otomatis (System Random)
                        </label>
                    </div>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="metodePembentukan" 
                            id="manual" 
                            value="manual"
                            checked={metode === 'manual'}
                            onChange={(e) => setMetode(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="manual">
                            Manual (Dosen Memilih Anggota)
                        </label>
                    </div>
                </div>

                {/* SET JUMLAH ANGGOTA PER KELOMPOK (Hanya untuk Otomatis) */}
                {metode === 'otomatis' && (
                    <div className="mb-4 p-3 bg-light rounded">
                        <label className="form-label fw-bold">Set Jumlah Anggota per Kelompok:</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            min="1"
                            max={totalMahasiswa}
                            value={jumlahAnggota}
                            onChange={(e) => setJumlahAnggota(parseInt(e.target.value) || 1)}
                        />
                        <small className="text-muted mt-2 d-block">
                            *Akan membentuk **{totalKelompok}** kelompok dari {totalMahasiswa} mahasiswa.
                        </small>
                    </div>
                )}
                
                {/* INFORMASI TAMBAHAN UNTUK MANUAL */}
                {metode === 'manual' && (
                    <div className="alert alert-info">
                        Setelah memilih Manual, Anda akan diarahkan ke halaman khusus untuk memilih anggota dan mengelompokkannya satu per satu.
                    </div>
                )}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                    Batal
                </Button>
                <Button variant="primary" onClick={handleCreateGroups} disabled={loading}>
                    {loading ? 'Memproses...' : (metode === 'manual' ? 'Lanjut ke Pemilihan Manual' : 'Bentuk Kelompok Otomatis')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AturKelompokModal;
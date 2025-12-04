// src/components/KirimPesanModal.jsx

import React, { useState } from 'react';

const KirimPesanModal = ({ show, onClose, target }) => {
    const [pesan, setPesan] = useState('');
    
    if (!show || !target) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // 🔥 SIAP BACKEND: Lakukan API POST untuk mengirim pesan di sini
        console.log(`[API CALL] Mengirim pesan ke ${target} dengan isi: ${pesan}`);
        
        alert(`Pesan berhasil dikirim ke ${target}.`);
        setPesan('');
        onClose();
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Kirim Pesan ke {target}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="pesan-text" className="form-label">Isi Pesan Anda:</label>
                                <textarea 
                                    className="form-control" 
                                    id="pesan-text" 
                                    rows="4" 
                                    value={pesan}
                                    onChange={(e) => setPesan(e.target.value)}
                                    required
                                    placeholder={`Tulis pertanyaan atau keperluan Anda untuk ${target}...`}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
                            <button type="submit" className="btn btn-primary">
                                <i className="bi bi-envelope-fill me-1"></i> Kirim Pesan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default KirimPesanModal;
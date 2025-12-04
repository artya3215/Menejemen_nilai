// src/pages/Mahasiswa/NilaiPage.jsx

import React from 'react';

const NilaiPage = () => {
    // Data simulasi Nilai KHS
    const nilaiList = [
        { kode: 'SI101', matkul: 'Pemrograman Web', sks: 3, nilai: 'A', bobot: 4.00 },
        { kode: 'SI102', matkul: 'Basis Data', sks: 3, nilai: 'A-', bobot: 3.70 },
        { kode: 'SI103', matkul: 'Algoritma & Struktur Data', sks: 3, nilai: 'B+', bobot: 3.30 },
    ];

    const totalSKS = nilaiList.reduce((sum, item) => sum + item.sks, 0);
    const totalBobot = nilaiList.reduce((sum, item) => sum + (item.sks * item.bobot), 0);
    const ipk = totalSKS > 0 ? (totalBobot / totalSKS).toFixed(2) : 'N/A';

    return (
        <>
            <h2 className="mb-4"><i className="bi bi-bar-chart-fill me-2"></i> Nilai Saya (KHS)</h2>
            
            <div className="alert alert-success d-flex justify-content-between align-items-center shadow-sm">
                <h4>IPK Kumulatif: <strong>{ipk}</strong></h4>
                <div>Total SKS: <strong>{totalSKS}</strong></div>
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Kode</th>
                                <th>Mata Kuliah</th>
                                <th>SKS</th>
                                <th>Nilai</th>
                                <th>Bobot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nilaiList.map((item) => (
                                <tr key={item.kode}>
                                    <td>{item.kode}</td>
                                    <td>{item.matkul}</td>
                                    <td>{item.sks}</td>
                                    <td><span className="badge bg-info">{item.nilai}</span></td>
                                    <td>{item.bobot.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="mt-3 text-muted small">
                *Data ini adalah simulasi Kartu Hasil Studi (KHS) mahasiswa.
            </div>
        </>
    );
};

export default NilaiPage;
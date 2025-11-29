import React from 'react';

const NilaiTugasPage = () => {
  // Simulasi Data dari Backend
  const dataNilai = {
    tugas: "Kuliah Lapangan Geologi",
    status: "Final", // Coba ubah jadi 'Draft' untuk tes logika
    totalScore: 85,
    feedback: "Analisis batuan sangat detail, namun dokumentasi foto perlu diperbaiki.",
    detail: [
        { kriteria: "Kerja Sama", nilai: 90 },
        { kriteria: "Ketepatan Laporan", nilai: 80 }
    ]
  };

  // Logika Activity Diagram Mahasiswa [cite: 106, 107]
  const isAvailable = dataNilai.status === 'Final';

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Nilai Tugas Saya</h2>
        <button className="btn btn-danger btn-sm" onClick={() => window.location.href='/login'}>Logout</button>
      </div>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
            <h5 className="mb-0">{dataNilai.tugas}</h5>
        </div>
        <div className="card-body">
            {isAvailable ? (
                // Flow: Ya (Nilai Final) -> Tampilkan [cite: 108]
                <div>
                    <div className="text-center mb-4">
                        <h1 className="display-4 fw-bold text-success">{dataNilai.totalScore}</h1>
                        <span className="badge bg-success">LULUS</span>
                    </div>
                    
                    <h6 className="fw-bold">Rincian Nilai:</h6>
                    <ul className="list-group mb-3">
                        {dataNilai.detail.map((d, idx) => (
                            <li key={idx} className="list-group-item d-flex justify-content-between">
                                {d.kriteria} <span>{d.nilai}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="alert alert-secondary">
                        <strong>Feedback Dosen:</strong> <br/>
                        "{dataNilai.feedback}"
                    </div>
                </div>
            ) : (
                // Flow: Belum Final -> Tampilkan Pesan [cite: 109]
                <div className="text-center py-5">
                    <i className="bi bi-hourglass-split display-1 text-warning"></i>
                    <h4 className="mt-3">Nilai Belum Tersedia</h4>
                    <p className="text-muted">Dosen sedang melakukan penilaian atau nilai belum difinalisasi.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default NilaiTugasPage;
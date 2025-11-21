import React, { useState } from 'react';

const NilaiTugasPage = () => {
  // Dummy Data untuk menguji Logika NIL-001
  const [nilaiData, setNilaiData] = useState({
    totalScore: 88.5,
    status: 'Draft', // Ganti ke 'Final' untuk menguji tampilan nilai
    detailScores: [
      { name: 'Kerja Sama Tim', score: 90, weight: 30 },
      { name: 'Ketepatan Laporan', score: 85, weight: 70 },
    ],
    feedback: 'Laporan sudah baik.',
  });

  // Logika Kritis: Apakah nilai sudah Final? (NIL-001)
  const isFinal = nilaiData.status === 'Final';

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Nilai Tugas Lapangan</h2>
      
      {!isFinal ? (
        // Tampilkan pesan jika status BUKAN Final
        <div className="alert alert-warning" role="alert">
          Nilai belum tersedia. Dosen masih dalam proses penilaian atau status masih **Draft**.
        </div>
      ) : (
        // Tampilkan rincian jika status = Final
        <div className="card shadow">
          <div className="card-body">
            <h5 className="card-title text-success">Nilai Total Anda: {nilaiData.totalScore}</h5>
            <hr />
            <h6>Rincian Nilai per Kriteria:</h6>
            <ul className="list-group list-group-flush mb-3">
              {nilaiData.detailScores.map((detail, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {detail.name}
                  <span className="badge bg-info">{detail.score}</span>
                </li>
              ))}
            </ul>
            <h6>Feedback Dosen:</h6>
            <blockquote className="blockquote bg-light p-3 border-start border-3 border-primary">
              <p className="mb-0 small">{nilaiData.feedback}</p>
            </blockquote>
          </div>
        </div>
      )}
    </div>
  );
};

export default NilaiTugasPage;
import React from 'react';
// Import LayoutMahasiswa sekarang seharusnya dapat di-resolve
import LayoutMahasiswa from '../../layouts/LayoutMahasiswa'; 
// Asumsi menggunakan Bootstrap 5 (classes seperti row, card, bg-primary)

const DashboardPage = () => {
    // Data simulasi (seharusnya diambil dari API di aplikasi nyata)
    const activeTugasCount = 1;
    const activeTugasDetail = '"Analisis Lapangan Logistik" akan dilaksanakan 1 Desember 2025.';
    const latestNilai = 89.5;
    const latestNilaiMatkul = 'Studi Kasus Toko Online';

    // Data simulasi Ringkasan Proyek
    const namaProyek = "Sistem Informasi Akademik Next-Gen";
    const dosenPembimbing = "Dr. Budi Santoso";
    const anggotaCount = 3;
    const projectStatus = "Tahap Pengembangan (80%)";

    return (
        // Pembungkus LayoutMahasiswa yang kini tersedia
        <LayoutMahasiswa>
            <div className="container-fluid p-4">
                <h2 className="mb-3 text-gray-800">
                    <i className="bi bi-speedometer2 me-2"></i> Dashboard Mahasiswa
                </h2>
                <p className="lead text-muted">Selamat datang kembali! Lihat pengumuman dan ringkasan akademik Anda.</p>
                
                <div className="row mt-4 g-4">
                    
                    {/* Card Tugas Aktif - Aksen Primary (Biru) */}
                    <div className="col-lg-6 col-md-12">
                        <div className="card shadow-lg h-100 rounded-lg border-start border-primary border-5">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 className="text-primary text-uppercase fw-semibold">
                                            <i className="bi bi-list-check me-2"></i> Tugas Aktif
                                        </h6>
                                        <h3 className="card-title fw-bold mt-2">
                                            {activeTugasCount} Tugas Baru
                                        </h3>
                                    </div>
                                    <span className="badge bg-primary text-white p-2 rounded-pill fs-6">{activeTugasCount}</span>
                                </div>
                                <p className="card-text text-muted small mt-2">
                                    Detail: {activeTugasDetail}
                                </p>
                                <a href="/mahasiswa/tugas" className="btn btn-sm btn-outline-primary mt-3 rounded-pill">
                                    Lihat Semua Tugas <i className="bi bi-arrow-right-short"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Card Nilai Terbaru - Aksen Success (Hijau) */}
                    <div className="col-lg-6 col-md-12">
                        <div className="card shadow-lg h-100 rounded-lg border-start border-success border-5">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 className="text-success text-uppercase fw-semibold">
                                            <i className="bi bi-award-fill me-2"></i> Nilai Terbaru
                                        </h6>
                                        <h3 className="card-title fw-bold mt-2">Nilai Kelompok: {latestNilai}</h3>
                                    </div>
                                    <i className="bi bi-patch-check-fill text-success display-6"></i>
                                </div>
                                <p className="card-text text-muted small mt-2">
                                    Mata Kuliah: {latestNilaiMatkul}
                                </p>
                                <a href="/mahasiswa/nilai" className="btn btn-sm btn-outline-success mt-3 rounded-pill">
                                    Lihat Semua Nilai <i className="bi bi-arrow-right-short"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Card Ringkasan Proyek Kelompok - Aksen Info (Cyan) */}
                    <div className="col-lg-6 col-md-12">
                        <div className="card shadow-lg h-100 rounded-lg border-start border-info border-5">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 className="text-info text-uppercase fw-semibold">
                                            <i className="bi bi-people-fill me-2"></i> Proyek Kelompok Saya
                                        </h6>
                                        <h3 className="card-title fw-bold mt-2">
                                            {namaProyek}
                                        </h3>
                                    </div>
                                    <span className="badge bg-info text-dark p-2 rounded-pill fs-6">{anggotaCount} Anggota</span>
                                </div>
                                <p className="card-text mb-2 small text-muted">
                                    Pembimbing: {dosenPembimbing}
                                </p>
                                <p className="card-text mb-3 fw-bold text-dark">
                                    Status: <span className="text-info">{projectStatus}</span>
                                </p>
                                <a href="/mahasiswa/kelompok" className="btn btn-sm btn-outline-info mt-1 rounded-pill">
                                    Detail Kelompok <i className="bi bi-arrow-right-short"></i>
                                </a>
                            </div>
                        </div>
                    </div>


                    {/* Card Pengumuman Cepat - Aksen Warning (Kuning) */}
                    <div className="col-lg-6 col-md-12">
                        <div className="card shadow-lg h-100 rounded-lg border-start border-warning border-5">
                            <div className="card-body">
                                <h6 className="card-title text-warning text-uppercase fw-semibold">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i> Pengumuman Penting
                                </h6>
                                <p className="card-text mb-1 mt-3 text-dark">
                                    Jadwal Ujian Akhir Semester (UAS) telah dirilis. Mohon cek halaman akademik.
                                </p>
                                <small className="text-muted">Diposting: 20 Nov 2025</small>
                                <div className="mt-3">
                                    <a href="#" className="btn btn-sm btn-outline-warning rounded-pill">
                                        Selengkapnya <i className="bi bi-box-arrow-up-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </LayoutMahasiswa>
    );
};

export default DashboardPage;
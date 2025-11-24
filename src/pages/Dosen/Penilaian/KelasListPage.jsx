import React, { useState, useMemo } from 'react';
import DataTable from '../../../components/ui/DataTable.jsx';
import { Link } from 'react-router-dom';

// DATA DUMMY LENGKAP (20 data untuk simulasi 2 halaman)
const DUMMY_ALL_DATA = [
    { id: 'KL001', namaKelas: 'Geologi Lapangan A', tugasAktif: 2, totalMhs: 30 },
    { id: 'KL002', namaKelas: 'Sistem Informasi B', tugasAktif: 1, totalMhs: 35 },
    { id: 'KL003', namaKelas: 'Fisika Dasar 1', tugasAktif: 3, totalMhs: 40 },
    { id: 'KL004', namaKelas: 'Matematika Terapan', tugasAktif: 0, totalMhs: 25 },
    { id: 'KL005', namaKelas: 'Kimia Analitik', tugasAktif: 1, totalMhs: 28 },
    { id: 'KL006', namaKelas: 'Struktur Data', tugasAktif: 4, totalMhs: 32 },
    { id: 'KL007', namaKelas: 'Basis Data Lanjut', tugasAktif: 2, totalMhs: 38 },
    { id: 'KL008', namaKelas: 'Jaringan Komputer', tugasAktif: 1, totalMhs: 33 },
    { id: 'KL009', namaKelas: 'Kalkulus I', tugasAktif: 5, totalMhs: 50 },
    { id: 'KL010', namaKelas: 'Algoritma Pemrograman', tugasAktif: 2, totalMhs: 45 },
    // Data untuk Halaman 2
    { id: 'KL011', namaKelas: 'Bahasa Inggris Teknik', tugasAktif: 1, totalMhs: 20 },
    { id: 'KL012', namaKelas: 'Kewirausahaan', tugasAktif: 0, totalMhs: 22 },
    { id: 'KL013', namaKelas: 'Etika Profesi', tugasAktif: 1, totalMhs: 27 },
    { id: 'KL014', namaKelas: 'Logika Pemrograman', tugasAktif: 3, totalMhs: 31 },
    { id: 'KL015', namaKelas: 'Pengantar Akuntansi', tugasAktif: 2, totalMhs: 36 },
    { id: 'KL016', namaKelas: 'Statistika', tugasAktif: 1, totalMhs: 41 },
    { id: 'KL017', namaKelas: 'Termodinamika', tugasAktif: 0, totalMhs: 48 },
    { id: 'KL018', namaKelas: 'Mekanika Fluida', tugasAktif: 2, totalMhs: 52 },
    { id: 'KL019', namaKelas: 'Teknologi Informasi', tugasAktif: 1, totalMhs: 44 },
    { id: 'KL020', namaKelas: 'Sistem Operasi', tugasAktif: 3, totalMhs: 39 },
];

const KelasListPage = () => {
    // Kami menggunakan state dummy ini untuk paginasi di dalam DataTable (asumsi)
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 10;

    // Kami memotong data untuk halaman saat ini (SIMULASI BEKERJA SEPERTI BACKEND)
    const currentData = useMemo(() => {
        const firstIndex = (currentPage - 1) * dataPerPage;
        const lastIndex = firstIndex + dataPerPage;
        return DUMMY_ALL_DATA.slice(firstIndex, lastIndex);
    }, [currentPage]);

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Nama Kelas', accessor: 'namaKelas' },
        { header: 'Tugas Aktif', accessor: 'tugasAktif' },
        { header: 'Total Mhs', accessor: 'totalMhs' },
        {
            header: 'Aksi',
            render: (item) => (
                <Link to={`/dosen/penilaian/${item.id}`} className="btn btn-primary btn-sm">
                    Lihat Detail
                </Link>
            ),
        },
    ];

    // Total halaman (Digunakan oleh komponen DataTable internal jika ada)
    const totalPages = Math.ceil(DUMMY_ALL_DATA.length / dataPerPage);

    // Catatan: Kami tidak membuat komponen Pagination di sini.
    // Kami mengandalkan logika paginasi ada di dalam DataTable.jsx.

    // Fungsi dummy untuk Paginasi, agar bisa diteruskan ke DataTable jika diperlukan
    const dummyPaginationProps = {
        currentPage: currentPage,
        totalPages: totalPages,
        onPageChange: setCurrentPage // Fungsi yang dipanggil saat tombol paginasi di klik
    };

    return (
        <div>
            <h2>Mengelola Kelas</h2>
            <p className="text-muted">Daftar semua kelas yang Anda ajar.</p>

            <button className="btn btn-success mb-3">Tambah Kelas Baru</button>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 fw-bold text-primary">Daftar Kelas yang Anda Ajar</h6>
                </div>
                <div className="card-body">
                    {/* Input Cari Data */}
                    <input type="text" className="form-control mb-3" placeholder="Cari data..." />

                    {/* Mengirim data yang sudah dipotong dan props paginasi ke DataTable */}
                    <DataTable
                        columns={columns}
                        data={currentData}
                        paginationProps={dummyPaginationProps} // Opsional: Mengirim props paginasi ke DataTable
                    />

                    {/* PENTING: Komponen Pagination yang sebelumnya kita buat sudah DIHAPUS 
                       untuk menghindari rendering ganda. */}
                </div>
            </div>
        </div>
    );
};

export default KelasListPage;
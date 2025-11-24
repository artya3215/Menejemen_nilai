import React from 'react';

// DataTable menerima data, columns, dan paginationProps
const DataTable = ({ columns, data, paginationProps }) => {


    const { currentPage, totalPages, onPageChange } = paginationProps || {};

    // -----------------------------------------------------
    // 1. KOMPONEN PAGINASI INTERNAL
    // -----------------------------------------------------
    const Pagination = () => {
        if (!totalPages || totalPages <= 1 || !onPageChange) return null; // Jangan tampilkan jika hanya 1 halaman

        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        return (
            <nav className="mt-3">
                <ul className="pagination justify-content-end">
                    {pages.map(page => (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                            <button 
                                className="page-link"
                                onClick={() => onPageChange(page)} // Panggil fungsi setCurrentPage di KelasListPage.jsx
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };
    // -----------------------------------------------------


    return (
        <div>
            {/* Tabel Data Utama */}
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-light">
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index}>{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            {/* Tampilkan data berdasarkan accessor, atau render kustom */}
                                            {col.render ? col.render(item) : item[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center text-muted">
                                    Tidak ada data yang tersedia.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 2. RENDERING PAGINASI DI BAWAH TABEL */}
            {/* Component ini akan merender tombol 1, 2, 3, dst. */}
            <Pagination />

        </div>
    );
};

export default DataTable;
import React from 'react';

const DataTable = ({ columns, data, title }) => {
    // Dummy Data untuk testing CLS-001
    const dummyColumns = [{ header: 'ID', accessor: 'id' }, { header: 'Nama Kelas', accessor: 'name' }];
    const dummyData = [{ id: 1, name: 'Geologi Lapangan A' }, { id: 2, name: 'Sistem Informasi B' }];

    return (
        <div className="card shadow-sm p-4 mt-3">
            <h5 className="card-title mb-3">{title || 'Daftar Data'}</h5>
            
            {/* Input Search (CLS-001) */}
            <input type="text" className="form-control mb-3" placeholder="Cari data..." />

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            {(columns || dummyColumns).map((col, index) => (
                                <th key={index}>{col.header}</th>
                            ))}
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data || dummyData).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {(columns || dummyColumns).map((col, colIndex) => (
                                    <td key={colIndex}>{row[col.accessor]}</td>
                                ))}
                                <td>
                                    <button className="btn btn-sm btn-primary">Lihat Detail</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <nav className="d-flex justify-content-end">
                <ul className="pagination pagination-sm">
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default DataTable;
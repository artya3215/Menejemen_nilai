import React from 'react';
import DataTable from '../../../components/ui/DataTable';

const KelasListPage = () => {
    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Nama Kelas', accessor: 'name' },
        { header: 'Tugas Aktif', accessor: 'activeTasks' },
        { header: 'Total Mhs', accessor: 'totalStudents' },
    ];
    
    const data = [
        { id: 'KL001', name: 'Geologi Lapangan A', activeTasks: 2, totalStudents: 30 },
        { id: 'KL002', name: 'Sistem Informasi B', activeTasks: 1, totalStudents: 35 },
    ];

    return (
        <div>
            <h2>Mengelola Kelas</h2>
            <button className="btn btn-success mb-3">Tambah Kelas Baru</button>
            
            <DataTable 
                columns={columns} 
                data={data} 
                title="Daftar Kelas yang Anda Ajar"
            />
        </div>
    );
};

export default KelasListPage;
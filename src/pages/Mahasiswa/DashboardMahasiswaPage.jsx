import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardMahasiswaPage = () => {
    const [stats, setStats] = useState({
        latestGrade: 'N/A', 
        totalActiveTasks: 0, 
        pendingSubmission: 0, 
        gradeStatus: 'Aman',
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const studentId = localStorage.getItem('userId') || '101'; 
    const API_URL = `http://localhost:8000/api/mahasiswa/dashboard/${studentId}`; 

    const fetchDashboardStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL);
            setStats(response.data); 
        } catch (err) {
            console.error("Gagal mengambil data Dashboard Mahasiswa:", err);
            setError("Gagal terhubung ke API Backend Mahasiswa. Pastikan server aktif."); 
            setStats({ latestGrade: 'N/A', totalActiveTasks: 0, pendingSubmission: 0, gradeStatus: 'Error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardStats();
    }, []); 

    const StatCard = ({ title, value, color, linkTo = '#' }) => (
        <div className="col-lg-3 col-md-6 mb-4">
            <Link to={linkTo} style={{ textDecoration: 'none' }}>
                <div className={`card bg-${color} text-white shadow`}>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col me-2">
                                <div className="text-xs fw-bold text-uppercase mb-1">{title}</div>
                                {loading ? (
                                    <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                                ) : (
                                    <div className="h5 mb-0 fw-bold">{value}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );


    return (
        <div>
            <h1 className="h3 mb-4 text-gray-800">Dashboard Mahasiswa</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                <StatCard 
                    title="Nilai Tugas Terbaru" 
                    value={stats.latestGrade} 
                    color={stats.latestGrade !== 'N/A' && stats.latestGrade < 70 ? 'danger' : 'success'}
                    linkTo="/mahasiswa/nilai"
                />
                <StatCard 
                    title="Tugas Aktif Belum Selesai" 
                    value={stats.totalActiveTasks} 
                    color="warning" 
                    linkTo="/mahasiswa/tugas"
                />
                <StatCard 
                    title="Total Tugas Perlu Dikumpulkan" 
                    value={stats.pendingSubmission} 
                    color="info" 
                    linkTo="/mahasiswa/tugas"
                />
                <StatCard 
                    title="Status Akademik" 
                    value={stats.gradeStatus} 
                    color="primary" 
                />
            </div>
            
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 fw-bold text-primary">Akses Cepat</h6>
                </div>
                <div className="card-body">
                    <p className="text-muted">Gunakan menu di samping atau kartu di atas untuk navigasi cepat.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardMahasiswaPage;
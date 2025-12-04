// src/App.jsx

import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// IMPORTS HALAMAN DAN KOMPONEN
import LoginPage from './pages/Auth/LoginPage.jsx'; 
import NotFoundPage from './pages/NotFoundPage.jsx'; 
import ProtectedRoute from './utils/ProtectedRoute.jsx'; 

import LayoutDosen from './layouts/LayoutDosen.jsx'; 
import LayoutMahasiswa from './layouts/LayoutMahasiswa.jsx'; 

// Dosen Pages
import DashboardDosenPage from './pages/Dosen/DashboardDosenPage.jsx';
import TugasCreatePage from './pages/Dosen/TugasCreatePage.jsx'; 
import TugasListPage from './pages/Dosen/TugasListPage.jsx';     
import TugasDetailPage from './pages/Dosen/TugasDetailPage.jsx'; 
import KelasListPage from './pages/Dosen/KelasListPage.jsx';
import KelasDetail from './pages/Dosen/KelasDetail.jsx'; 
import RekapNilaiPage from './pages/Dosen/RekapNilaiPage.jsx';
import PenilaianListPage from './pages/Dosen/PenilaianListPage.jsx'; 
import FormPenilaianPage from './pages/Dosen/FormPenilaianPage.jsx';

// Mahasiswa Pages
import DashboardMahasiswaPage from './pages/Mahasiswa/DashboardMahasiswaPage.jsx';
import TugasSayaPage from './pages/Mahasiswa/TugasSayaPage.jsx';
import FormSubmitTugasPage from './pages/Mahasiswa/FormSubmitTugasPage.jsx';
import NilaiPage from './pages/Mahasiswa/NilaiPage.jsx';
import KelompokProyekPage from './pages/Mahasiswa/KelompokProyekPage.jsx';

// ************************************************************
// 1. AUTH CONTEXT 
// ************************************************************

export const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ 
        role: localStorage.getItem('role') || 'Guest',
        token: localStorage.getItem('token') || null,
    }); 
    const navigate = useNavigate();
    
    const login = (role, token) => {
        localStorage.setItem('role', role);
        localStorage.setItem('token', token);
        setUser({ role, token });
        
        if (role === 'Dosen') {
            navigate('/dosen/dashboard', { replace: true });
        } else if (role === 'Mahasiswa') {
            navigate('/mahasiswa/dashboard', { replace: true });
        } else {
            navigate('/', { replace: true });
        }
    };
    
    const logout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        setUser({ role: 'Guest', token: null });
        navigate('/login', { replace: true });
    };

    const value = { user, login, logout }; 

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


// ************************************************************
// 2. KOMPONEN UTAMA
// ************************************************************

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Rute Publik */}
                    <Route path="/login" element={<LoginPage />} /> 
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<NotFoundPage />} />

                    {/* Rute DOSEN */}
                    <Route element={<ProtectedRoute requiredRole="Dosen" />}>
                        <Route path="/dosen" element={<LayoutDosen />}>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<DashboardDosenPage />} />
                            
                            {/* Kelas */}
                            <Route path="kelas" element={<KelasListPage />} />
                            <Route path="kelas/:id" element={<KelasDetail />} /> 
                            
                            {/* Tugas */}
                            <Route path="tugas" element={<TugasListPage />} />
                            <Route path="tugas/baru" element={<TugasCreatePage />} />
                            <Route path="tugas/:id" element={<TugasDetailPage />} /> 

                            {/* Penilaian */}
                            <Route path="penilaian" element={<PenilaianListPage />} /> 
                            <Route path="penilaian/:kelompokId" element={<FormPenilaianPage />} /> 

                            {/* Rekap */}
                            <Route path="rekap" element={<RekapNilaiPage />} />
                        </Route>
                    </Route>

                    {/* Rute MAHASISWA */}
                    <Route element={<ProtectedRoute requiredRole="Mahasiswa" />}>
                        <Route path="/mahasiswa" element={<LayoutMahasiswa />}>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<DashboardMahasiswaPage />} />
                            <Route path="tugas" element={<TugasSayaPage />} />
                            <Route path="tugas/submit/:tugasId" element={<FormSubmitTugasPage />} /> 
                            <Route path="nilai" element={<NilaiPage />} />
                            <Route path="kelompok" element={<KelompokProyekPage />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import Pages
import LoginPage from './pages/Auth/LoginPage';
import DashboardPage from './pages/Dosen/DashboardPage';

// Import Pages Dosen (Fungsional Penuh)
import KelasListPage from './pages/Dosen/Kelas/KelasListPage'; 
import TugasListPage from './pages/Dosen/Tugas/TugasListPage';
import TugasFormPage from './pages/Dosen/Tugas/TugasFormPage'; // Halaman Form Baru
import PenilaianListPage from './pages/Dosen/Penilaian/PenilaianListPage'; // Halaman List Grup
import FormPenilaianPage from './pages/Dosen/Penilaian/FormPenilaianPage';

// Import Pages Mahasiswa
import NilaiTugasPage from './pages/Mahasiswa/NilaiTugasPage';

import SidebarDosen from './components/navigation/SidebarDosen';
import LayoutAuth from './layouts/LayoutAuth';

// Layout Dosen
const LayoutDosen = () => (
    <div className="d-flex">
        <div className="bg-light border-end" style={{ width: '250px', minHeight: '100vh' }}>
            <div className="p-3 fw-bold text-primary border-bottom">Dosen Panel</div>
            <SidebarDosen />
        </div>
        <div className="flex-grow-1 p-4" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
            <Outlet /> 
        </div>
    </div>
);

// Guard Route
const ProtectedRoute = ({ allowedRole, children }) => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== allowedRole) return <Navigate to="/login" replace />;
    return children ? children : <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LayoutAuth><LoginPage /></LayoutAuth>} />
        
        {/* Rute Dosen */}
        <Route element={<ProtectedRoute allowedRole="dosen" />}>
            <Route element={<LayoutDosen />}>
                <Route path="/dosen/dashboard" element={<DashboardPage />} />
                
                {/* Modul Kelas */}
                <Route path="/dosen/kelas" element={<KelasListPage />} />
                
                {/* Modul Tugas */}
                <Route path="/dosen/tugas" element={<TugasListPage />} />
                <Route path="/dosen/tugas/baru" element={<TugasFormPage />} /> {/* Form Buat Tugas */}
                
                {/* Modul Penilaian */}
                <Route path="/dosen/penilaian" element={<PenilaianListPage />} /> {/* Pilih Kelompok */}
                <Route path="/dosen/penilaian/:id" element={<FormPenilaianPage />} /> {/* Form Nilai */}
            </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="mahasiswa" />}>
            <Route path="/mahasiswa/nilai" element={<NilaiTugasPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
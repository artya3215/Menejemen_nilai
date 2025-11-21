import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

// Import Layouts
import LayoutDosen from './layouts/LayoutDosen.jsx';
import LayoutAuth from './layouts/LayoutAuth.jsx'; 

// Import Pages (Dosen)
import LoginPage from './pages/Auth/LoginPage.jsx';
import DashboardPage from './pages/Dosen/DashboardPage.jsx';
import KelasListPage from './pages/Dosen/Penilaian/KelasListPage.jsx'; 
import FormPenilaianPage from './pages/Dosen/Penilaian/FormPenilaianPage.jsx';
import TugasPage from './pages/Dosen/TugasPage.jsx'; 

// Import Pages (Mahasiswa)
import NilaiTugasPage from './pages/Mahasiswa/NilaiTugasPage.jsx';

// Import Keamanan
import ProtectedRoute from './router/ProtectedRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<LayoutAuth><LoginPage /></LayoutAuth>} />
        
        {/* Rute Terlindungi (Role: Dosen) */}
        <Route element={<ProtectedRoute allowedRoles={['dosen']} />}>
          <Route element={<LayoutDosen />}>
            <Route path="/dosen/dashboard" element={<DashboardPage />} />
            <Route path="/dosen/kelas" element={<KelasListPage />} />
            <Route path="/dosen/tugas" element={<TugasPage />} />
            <Route path="/dosen/penilaian" element={<FormPenilaianPage />} />
          </Route>
        </Route>
        
        {/* Rute Terlindungi (Role: Mahasiswa) */}
        <Route element={<ProtectedRoute allowedRoles={['mahasiswa']} />}>
          <Route path="/mahasiswa/nilai" element={<NilaiTugasPage />} />
        </Route>

        {/* Redirect Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
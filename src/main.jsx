<<<<<<< HEAD
// src/main.jsx (atau src/index.js)

import React from 'react';
// Import createRoot untuk React 18
import { createRoot } from 'react-dom/client'; 

// Import komponen AppRouter yang kita buat
import AppRouter from './router/AppRouter'; 

// Import file CSS/Bootstrap (Asumsi Anda menggunakan Bootstrap atau file CSS global)
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import 'bootstrap-icons/font/bootstrap-icons.css'; 
// import './styles/global.css'; // Asumsi CSS kustom Anda

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* 🔥 SOLUSI: AppRouter harus menjadi komponen utama yang di-render */}
    <AppRouter /> 
  </React.StrictMode>
=======
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import { AuthProvider } from './contexts/AuthContext';
import App from './App';

// Catatan: Jika Anda menggunakan index.css, Anda bisa mengimpornya di sini

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
>>>>>>> 75a86da2dbdb1494463279778354cd848c6a6ad1
);
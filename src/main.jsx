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
);
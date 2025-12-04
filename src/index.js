// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';

// Styling: Wajib dipertahankan
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
// 🔥 Perbaikan Path CSS
import './assets/styles/DosenLayout.css'; // Sesuaikan jika DosenLayout.css berada di lokasi lain

// Import komponen utama App
import App from './App.jsx'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);
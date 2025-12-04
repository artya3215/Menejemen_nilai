<<<<<<< HEAD
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
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Wajib: Import CSS Bootstrap

// Pastikan DIV yang ditargetkan di index.html bernama 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
>>>>>>> 75a86da2dbdb1494463279778354cd848c6a6ad1
  </React.StrictMode>
);
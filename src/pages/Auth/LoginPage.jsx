<<<<<<< HEAD
// src/pages/Auth/LoginPage.jsx

import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom'; (Dihapus karena sudah ditangani context)
import { AuthContext } from '../../App.jsx'; 
import { login as authLogin } from '../../services/auth.js'; 
import LayoutAuth from '../../layouts/LayoutAuth.jsx'; 

const LoginPage = () => {
    const [email, setEmail] = useState('dosen@test.com'); 
    const [password, setPassword] = useState('password');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { login: setAuthContext } = useContext(AuthContext); 
    // const navigate = useNavigate(); (Dihapus)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const role = await authLogin(email, password);
            setAuthContext(role, 'mock-token-123'); 
        
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Simulasi Validasi Akun [cite: 119]
        if (!role) {
            alert("Harap pilih peran (Dosen/Mahasiswa)!");
            return;
        }

        // Simpan sesi dummy & Redirect sesuai Role 
        localStorage.setItem('userRole', role);
        
        if (role === 'dosen') {
            navigate('/dosen/dashboard');
        } else {
            navigate('/mahasiswa/nilai');
>>>>>>> 75a86da2dbdb1494463279778354cd848c6a6ad1
        }
    };

    return (
<<<<<<< HEAD
        <LayoutAuth>
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="card-title text-center text-primary mb-4"><i className="bi bi-person-circle me-2"></i> Sistem Penilaian</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@example.com"
                            required
                            autocomplete="username"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="******"
                            required
                            autocomplete="current-password"
                        />
                    </div>
                    <div className="d-grid mt-4">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Memuat...' : <><i className="bi bi-box-arrow-in-right me-1"></i> Login</>}
                        </button>
                    </div>
                    <p className="text-center mt-3 text-muted">Demo: <strong>dosen@test.com</strong> atau <strong>mahasiswa@test.com</strong> | Password: **password**</p>
                </form>
            </div>
        </LayoutAuth>
=======
        <div className="card shadow" style={{ width: '400px' }}>
            <div className="card-body p-4">
                <h4 className="text-center mb-4 text-primary">Sistem Penilaian Lapangan</h4>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Peran</label>
                        <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">-- Pilih Peran --</option>
                            <option value="dosen">Dosen</option>
                            <option value="mahasiswa">Mahasiswa</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email" required />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Masukkan password" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
>>>>>>> 75a86da2dbdb1494463279778354cd848c6a6ad1
    );
};

export default LoginPage;
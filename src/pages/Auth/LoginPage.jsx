// src/pages/Auth/LoginPage.jsx

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App.jsx'; 
import { login as authLogin } from '../../services/auth.js'; 
import LayoutAuth from '../../layouts/LayoutAuth.jsx'; 

const LoginPage = () => {
    // Biarkan state email/password diatur ke nilai default demo untuk kemudahan pengujian
    const [email, setEmail] = useState('dosen@test.com'); 
    const [password, setPassword] = useState('password');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { login: setAuthContext } = useContext(AuthContext); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Memanggil service login (yang menggunakan hardcoded demo user)
            const role = await authLogin(email, password);
            setAuthContext(role, 'mock-token-123'); 
        
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LayoutAuth>
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                {/* Judul dan Ikon */}
                <h3 className="card-title text-center text-primary mb-4">
                    <i className="bi bi-person-circle me-2"></i> Sistem Penilaian
                </h3>
                
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    {/* Input Email */}
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
                            autoComplete="username"
                        />
                    </div>
                    {/* Input Password */}
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
                            autoComplete="current-password"
                        />
                    </div>
                    {/* Tombol Login */}
                    <div className="d-grid mt-4">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Memuat...' : <><i className="bi bi-box-arrow-in-right me-1"></i> Login</>}
                        </button>
                    </div>
                    
                    {/* Keterangan Demo Login telah dihapus dari sini */}
                    
                </form>
            </div>
        </LayoutAuth>
    );
};

export default LoginPage;
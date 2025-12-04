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
        }
    };

    return (
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
    );
};

export default LoginPage;
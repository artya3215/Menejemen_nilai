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
        }
    };

    return (
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
    );
};

export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Akan digunakan di tahap API

const LoginPage = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    // --- FUNGSI KRITIS: DISIAPKAN UNTUK KONEKSI BACKEND/PHPMyAdmin ---
    const handleLogin = async (e) => {
        e.preventDefault();

        if (role === '') {
            alert("Mohon pilih Peran (Dosen atau Mahasiswa).");
            return;
        }

        try {
            // Placeholder: Di tahap berikutnya, hapus 3 baris di bawah, dan gunakan kode API ini:
            /* const response = await axios.post('http://localhost:5000/api/login', {
                email, password, role
            });
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('userRole', response.data.role); 
            */
            
            // --- Logika Dummy Sementara ---
            localStorage.setItem('userRole', role); 
            
            // --- Navigasi ---
            if (role === 'dosen') {
                navigate('/dosen/dashboard');
            } else if (role === 'mahasiswa') {
                navigate('/mahasiswa/nilai'); 
            }

        } catch (error) {
            // Simulasi API Error jika login gagal
            alert("Login Gagal. (Cek: Peran harus dipilih)");
        }
    };

    return (
        <div className="card shadow-lg" style={{ maxWidth: '400px', width: '90%' }}>
            <div className="card-header bg-primary text-white text-center">
                <h4 className="mb-0">Sistem Penilaian Lapangan</h4>
            </div>
            <div className="card-body p-4">
                <h5 className="card-title text-center mb-4">Login</h5>
                
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email/Username</label>
                        <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="role" className="form-label">Pilih Peran</label>
                        <select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="">Pilih...</option>
                            <option value="dosen">Dosen</option>
                            <option value="mahasiswa">Mahasiswa</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
<<<<<<< HEAD
// src/services/auth.js

/**
 * Fungsi untuk melakukan proses login.
 */
export const login = async (email, password) => { 
    
  // --- MULAI BYPASS SEMENTARA ---
  const DUMMY_ACCOUNTS = {
    'dosen@test.com': { token: 'dosen-token-123', role: 'Dosen' }, 
    'mahasiswa@test.com': { token: 'mhs-token-456', role: 'Mahasiswa' },
    'dosen@example.com': { token: 'dosen-token-123', role: 'Dosen' },
    'mahasiswa@example.com': { token: 'mhs-token-456', role: 'Mahasiswa' },
  };

  await new Promise(resolve => setTimeout(resolve, 500)); 

  const user = DUMMY_ACCOUNTS[email];

  if (user && (password === 'password' || password === '123456')) { 
    return user.role;
  } else {
    throw new Error('Email atau Password salah. Gunakan akun tes: dosen@test.com / mahasiswa@test.com, Password: password.');
  }
  // --- AKHIR BYPASS SEMENTARA ---
};

/**
 * Menghapus token otentikasi.
 */
export const logout = () => { 
  localStorage.removeItem('token');
  localStorage.removeItem('role'); 
};

/**
 * Mendapatkan role pengguna saat ini.
 */
export const getCurrentUserRole = () => { 
  return localStorage.getItem('role');
=======
// Dibuat oleh tim Front-End untuk diisi oleh BE Programmer.

/**
 * Fungsi dummy untuk mengirim kredensial login ke API.
 * @param {string} email
 * @param {string} password
 * @returns {object} { success: boolean, token: string, role: 'dosen' | 'mahasiswa' }
 */
export const loginUser = async (email, password) => {
  // Lakukan validasi sederhana di sisi klien
  if (password === 'fail') {
    return { success: false, message: 'Password salah.' };
  }

  // --- NANTINYA AKAN ADA AXIOS/FETCH KE API ENDPOINT LOGIN ---
  console.log(`[AUTH SERVICE]: Mencoba login sebagai ${email}`);

  // Simulasikan role-based success
  const role = email.includes('dosen') ? 'dosen' : 'mahasiswa';
  
  return { 
    success: true, 
    token: 'dummy-jwt-token-12345', 
    role: role,
    message: `Login sukses sebagai ${role}`
  };
>>>>>>> 75a86da2dbdb1494463279778354cd848c6a6ad1
};
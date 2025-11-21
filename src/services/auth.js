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
};
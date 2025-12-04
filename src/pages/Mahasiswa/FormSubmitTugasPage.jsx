import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Using Bootstrap 5 classes (assumed via className)

const FormSubmitTugasPage = () => {
    const { tugasId } = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [deskripsi, setDeskripsi] = useState('');
    const [loading, setLoading] = useState(true);
    const [namaTugas, setNamaTugas] = useState('');
    const [isDraft, setIsDraft] = useState(false); 
    const [submitMessage, setSubmitMessage] = useState(null); 

    useEffect(() => {
        const fetchTugasData = async () => {
            // [API CALL]: GET /api/mahasiswa/tugas/:tugasId/details
            setTimeout(() => {
                // Simulasi data yang diambil dari backend saat memuat halaman
                const mockDetail = { 
                    id: tugasId, 
                    nama: tugasId === '1' ? 'Proyek Website' : 'Tugas Lain ID '+tugasId, 
                    // Jika tugasId=1, statusnya sudah DRAFT dari backend
                    status: tugasId === '1' ? 'DRAFT' : 'BELUM' 
                };
                
                setNamaTugas(mockDetail.nama);
                
                // Set isDraft berdasarkan data awal dari backend
                if (mockDetail.status === 'DRAFT') {
                    setIsDraft(true);
                    // Simulasi pemuatan data draft sebelumnya
                    setDeskripsi('Ini adalah draft submission sebelumnya.');
                }
                setLoading(false);
            }, 500);
        };
        fetchTugasData();
    }, [tugasId]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSaveDraft = (e) => {
        e.preventDefault();
        
        const apiMethod = isDraft ? 'PUT/PATCH' : 'POST';
        // 🚨 SIAP BACKEND: Gunakan Axios/Fetch untuk mengirim data (dengan status 'Draft')
        // const response = await axios.request({ method: apiMethod, url: `/api/mahasiswa/tugas/${tugasId}/draft`, data: formData });

        console.log(`[API CALL - ${apiMethod}] Menyimpan DRAFT untuk Tugas: ${namaTugas}`);
        
        // 🔥 PERBAIKAN: Update state lokal setelah sukses
        if (!isDraft) {
            setIsDraft(true); // Status berubah dari 'BELUM' menjadi 'DRAFT'
        }

        // Tampilkan umpan balik visual
        const timestamp = new Date().toLocaleTimeString();
        setSubmitMessage({ 
            type: 'warning', 
            text: `Draft Tugas ${namaTugas} berhasil disimpan pada ${timestamp}. File dan deskripsi Anda aman.` 
        });

        // Hilangkan pesan setelah 5 detik
        setTimeout(() => {
            setSubmitMessage(null);
        }, 5000); 
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        
        // Mengganti alert() dengan modal/toast kustom di aplikasi nyata
        if (!file && !isDraft) {
            console.error("Harap unggah file sebelum Final Submit jika ini adalah submission pertama.");
            setSubmitMessage({ 
                type: 'danger', 
                text: 'Harap unggah file sebelum Final Submit jika ini adalah submission pertama, atau simpan draft terlebih dahulu.' 
            });
            setTimeout(() => setSubmitMessage(null), 5000);
            return;
        }

        const apiMethod = isDraft ? 'PUT/PATCH' : 'POST';
        // 🚨 SIAP BACKEND: Gunakan Axios/Fetch untuk mengirim data (dengan status 'Submitted/Final')
        // const response = await axios.request({ method: apiMethod, url: `/api/mahasiswa/tugas/${tugasId}/submit`, data: formData });

        console.log(`[API CALL - ${apiMethod}] FINAL SUBMIT untuk Tugas: ${namaTugas}`);
        
        // Mengganti alert() dengan navigasi dan pesan sukses di halaman tujuan
        console.log(`Sukses! Tugas ${namaTugas} berhasil diunggah/diperbarui.`);
        navigate('/mahasiswa/tugas', { state: { successMessage: `Tugas ${namaTugas} berhasil diunggah/diperbarui.` } }); 
    };
    
    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-3">Memuat Form Tugas...</span>
        </div>
    );

    return (
        <>
            <h2 className="mb-4">
                <i className="bi bi-link-45deg me-2"></i> 
                {isDraft ? 'Edit Draft' : 'Submit'} Tugas: **{namaTugas}**
            </h2>
            <p className="text-muted">
                Status: **{isDraft ? 'Draft Tersimpan' : 'Belum Pernah Submit'}**
                {isDraft && <i className="bi bi-check-circle-fill text-success ms-2"></i>} 
            </p>
            
            {submitMessage && (
                <div className={`alert alert-${submitMessage.type} shadow-sm`} role="alert">
                    <i className={`bi bi-${submitMessage.type === 'danger' ? 'x-octagon-fill' : 'info-circle-fill'} me-2`}></i>
                    {submitMessage.text}
                </div>
            )}

            <div className="card shadow p-4">
                <form>
                    <div className="mb-3">
                        <label htmlFor="fileUpload" className="form-label">Unggah/Perbarui File Tugas (.zip/.pdf)</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            id="fileUpload" 
                            onChange={handleFileChange} 
                        />
                        {file && <small className="text-success">File terpilih: {file.name}</small>}
                        {isDraft && !file && <small className="text-info d-block">Biarkan kosong untuk mempertahankan file yang sudah diunggah sebelumnya.</small>}
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="deskripsi" className="form-label">Deskripsi Tambahan / Catatan</label>
                        <textarea 
                            className="form-control" 
                            id="deskripsi" 
                            rows="3" 
                            value={deskripsi} 
                            onChange={(e) => setDeskripsi(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Tombol Final Submit */}
                    <button 
                        type="button" 
                        onClick={handleFinalSubmit}
                        className="btn btn-primary me-2"
                    >
                        <i className="bi bi-send-fill me-1"></i> Final Submit
                    </button>
                    
                    {/* Tombol Simpan Draft */}
                    <button 
                        type="button" 
                        onClick={handleSaveDraft} 
                        className="btn btn-warning me-2"
                    >
                        <i className="bi bi-save-fill me-1"></i> Simpan Draft
                    </button>
                    
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/mahasiswa/tugas')}>
                        <i className="bi bi-x-circle-fill me-1"></i> Batal
                    </button>
                </form>
            </div>
        </>
    );
};

export default FormSubmitTugasPage;
import React from 'react';

const FormPenilaian = ({ isDisabled, nilaiInput, setNilaiInput }) => {
    // Dummy Data Kriteria sesuai Mockup (Kerjasama, dll) [cite: 175]
    const kriteria = [
        { id: 1, name: "Kerja Sama Tim", bobot: 30 },
        { id: 2, name: "Ketepatan Laporan", bobot: 40 },
        { id: 3, name: "Keaktifan Lapangan", bobot: 30 },
    ];

    const handleInputChange = (kriteriaId, value) => {
        // Mencegah edit jika status sudah Final [cite: 142]
        if (isDisabled) return;
        
        setNilaiInput(prev => ({ 
            ...prev, 
            [kriteriaId]: value 
        }));
    };

    return (
        <div className="card shadow-sm p-4">
            <h6 className="mb-3 fw-bold">Form Penilaian Kelompok</h6>
            {kriteria.map((item) => (
                <div key={item.id} className="row mb-3 align-items-center">
                    <div className="col-md-5">
                        <label className="form-label">{item.name} (Bobot: {item.bobot}%)</label>
                    </div>
                    <div className="col-md-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="0-100"
                            min="0"
                            max="100"
                            value={nilaiInput[item.id] || ''}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            disabled={isDisabled} // Logic kuncian form
                            required
                        />
                    </div>
                </div>
            ))}
            
            <div className="mt-4">
                 <label className="form-label fw-bold">Feedback / Catatan:</label>
                 <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Masukkan catatan untuk mahasiswa..."
                    disabled={isDisabled}
                 ></textarea>
            </div>
        </div>
    );
};

export default FormPenilaian;
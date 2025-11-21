import React from 'react';

const FormPenilaian = ({ isDisabled, nilaiInput, setNilaiInput }) => {
    // Dummy Data Kriteria (Sesuai Struktur Bobot)
    const kriteria = [
        { id: 1, name: "Kerja Sama Tim", bobot: 30 },
        { id: 2, name: "Ketepatan Laporan", bobot: 70 },
    ];

    const handleInputChange = (kriteriaId, value) => {
        // Hanya menerima angka 0-100 dan jika form tidak di-disabled
        if (isDisabled || value < 0 || value > 100) return;
        
        setNilaiInput(prev => ({ 
            ...prev, 
            [kriteriaId]: value 
        }));
    };

    return (
        <div className="card shadow-sm p-4">
            <h6 className="mb-3">Kriteria Penilaian:</h6>
            {kriteria.map((item) => (
                <div key={item.id} className="row mb-3 align-items-center">
                    <div className="col-md-5">
                        <label className="form-label">{item.name} ({item.bobot}%)</label>
                    </div>
                    <div className="col-md-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Nilai (0-100)"
                            min="0"
                            max="100"
                            value={nilaiInput[item.id] || ''}
                            onChange={(e) => handleInputChange(item.id, parseInt(e.target.value))}
                            // Logika PNL-002: Input di-disable
                            disabled={isDisabled} 
                            required
                        />
                    </div>
                </div>
            ))}
            
            <div className="mt-4">
                 <label className="form-label">Feedback Umum:</label>
                 <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Masukkan feedback untuk kelompok"
                    disabled={isDisabled}
                 ></textarea>
            </div>
        </div>
    );
};

export default FormPenilaian;
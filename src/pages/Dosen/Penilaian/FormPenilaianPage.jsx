import React, { useState } from 'react';
import FormPenilaian from '../../../components/forms/FormPenilaian.jsx'; 

const FormPenilaianPage = () => {
  const [currentStatus, setCurrentStatus] = useState('Draft'); 
  const [nilaiInput, setNilaiInput] = useState({}); 

  const isFinal = currentStatus === 'Final';

  const assignmentData = {
    course: "Geologi Lapangan A",
    group: "Kelompok 5 (Ketua: Budi)",
    status: currentStatus
  };

  const handleSubmit = (isFinalSubmit) => {
    console.log("Nilai yang akan dikirim:", nilaiInput);
    
    if (isFinalSubmit) {
      alert("Nilai Berhasil Disubmit sebagai FINAL. Form akan dikunci.");
      setCurrentStatus('Final');
      
    } else {
      alert("Nilai Berhasil Disimpan sebagai Draft.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-2">Form Penilaian Tugas</h2>
      <p className="text-muted">Tugas: {assignmentData.course} | Kelompok: {assignmentData.group}</p>
      
      <div className={`alert ${isFinal ? 'alert-danger' : 'alert-warning'} p-2 d-inline-block fw-bold`}>
        Status Penilaian: {assignmentData.status}
      </div>

      <div className="mt-3">
        <FormPenilaian 
          isDisabled={isFinal} 
          nilaiInput={nilaiInput} 
          setNilaiInput={setNilaiInput} 
        />
      </div>

      <div className="mt-4">
        {!isFinal && (
          <>
            <button 
              className="btn btn-warning me-2" 
              onClick={() => handleSubmit(false)}
              disabled={Object.keys(nilaiInput).length === 0}
            >
              Simpan Draft
            </button>
            <button 
              className="btn btn-success" 
              onClick={() => handleSubmit(true)}
              disabled={Object.keys(nilaiInput).length === 0}
            >
              Submit Final
            </button>
          </>
        )}
        {isFinal && (
             <button className="btn btn-secondary" disabled>
                Penilaian Sudah Final dan Dikunci
             </button>
        )}
      </div>
    </div>
  );
};

export default FormPenilaianPage;
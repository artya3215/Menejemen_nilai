<<<<<<< HEAD
// src/layouts/LayoutAuth.jsx

=======
>>>>>>> 75a86da2dbdb1494463279778354cd848c6a6ad1
import React from 'react';

const LayoutAuth = ({ children }) => {
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center" 
             style={{ 
                 background: 'linear-gradient(to right, #007bff, #00bfff)' // Latar Belakang Biru Gradient
             }}>
            {children}
        </div>
    );
};

export default LayoutAuth;
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
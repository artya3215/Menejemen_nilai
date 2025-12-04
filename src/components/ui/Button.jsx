import React from 'react';

// Komponen Tombol generik
const Button = ({ children, onClick, type = "button", className = "btn-primary", disabled = false }) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={className} // Styling akan datang dari CSS/UIUX
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
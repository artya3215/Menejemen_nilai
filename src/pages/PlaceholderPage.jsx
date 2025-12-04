// src/pages/PlaceholderPage.jsx

import React from 'react';
import LayoutDosen from '../layouts/LayoutDosen';
import { useNavigate } from 'react-router-dom';

const PlaceholderPage = ({ name }) => {
    const navigate = useNavigate();

    return (
        <LayoutDosen>
            <div className="alert alert-info mt-3">
                <h4 className="alert-heading">Fitur: {name} - Dalam Pengembangan 🏗️</h4>
                <p>Halaman ini akan menjadi area kerja untuk **{name}** sesuai alur kerja sistem.</p>
                <hr />
                <button 
                    className="btn btn-primary" 
                    onClick={() => navigate(-1)}
                >
                    &larr; Kembali
                </button>
            </div>
        </LayoutDosen>
    );
};

export default PlaceholderPage;
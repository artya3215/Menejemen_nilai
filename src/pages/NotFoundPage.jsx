import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-danger">404</h1>
      <p className="lead">Halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/login" className="btn btn-primary">Kembali ke Login</Link>
    </div>
  );
};
export default NotFoundPage;
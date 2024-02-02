// src/components/AboveNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
const AboveNavbar = () => {
  return (
    <div className="above-navbar">
      <div className="auth-buttons">
      <Link className="reg" to="/login">Login <i className="fas fa-sign-in-alt"></i></Link>
        <span>Register <i className="fas fa-user-plus"></i></span>
      </div>
      <div className="social-buttons">
        <button className="social-button" aria-label="Facebook">
          <i className="fab fa-facebook"></i>
        </button>
        <button className="social-button" aria-label="Twitter">
         <i className="fab fa-twitter"></i>
        </button>
        <button className="social-button" aria-label="Google">
          <i className="fab fa-google"></i>
        </button>
        <button className="social-button" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </button>
        <button className="social-button" aria-label="YouTube">
          <i className="fab fa-youtube"></i>
        </button>
        <button className="social-button" aria-label="LinkedIn">
          <i className="fab fa-linkedin"></i>
        </button>
      </div>
    </div>
  );
};

export default AboveNavbar;

// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './company.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Company Logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>

        <div className="navbar-dropdown">
          Doctors
          <div className="dropdown-content">
            <div className="dropdown-item">Radiologist</div>
            <div className="dropdown-item">Physiotherapist</div>
            <div className="dropdown-item">View All</div>
          </div>
          <div className="arrow">&#9662;</div>
        </div>

        <Link to="/#info-section" className="navbar-link">
          About Us
        </Link>

        <div className="navbar-dropdown">
          Services
          <div className="dropdown-content">
            <div className="dropdown-item">Dental</div>
            <div className="dropdown-item">Labrotary</div>
            <div className="dropdown-item">View All Services</div>
          </div>
          <div className="arrow">&#9662;</div>
        </div>

        <Link to="/contact" className="navbar-link"> {/* Add this line for the Contact Us link */}
          Contact Us
        </Link>

        <Link to="/make-appointment" className="apb">
          Make an Appointment <i className="far fa-calendar-alt"></i>
        </Link>
      </div>
      <div className="marquee-text">
        <p>Appointment Made Easy</p>
      </div>
    </div>
  );
};

export default Navbar;

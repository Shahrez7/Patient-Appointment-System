// src/components/AppointmentSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const AppointmentSection = () => {
  return (
    <div className="appointment-section">
      <h1 className="main-text">Appointment and Patient Data Management</h1>
      <br></br><br></br>
      <p className="mini">Streamlining healthcare access: Your path to hassle-free appointments and personalized care.</p>
      <Link to="/make-appointment" className="appointment-button">
        Make an Appointment <i className="far fa-calendar-alt"></i>
      </Link>
    </div>
  );
};

export default AppointmentSection;

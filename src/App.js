// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppointmentSection from './components/AppointmentSection';
import AboveNavbar from './components/AboveNavbar';
import InfoSection from './components/InfoSection';
import PatientForm from './components/PatientForm';
import './App.css';
import Login from './components/Login';
import Appointments from './components/Appointments';
import ContactForm from './components/ContactForm'; // Import the ContactForm component
import TwoColumnLayout from './components/TwoColumnLayout';
import EndSection from './components/EndSection';

const App = () => {
  return (
    <Router>
      <div className='Whole'>
        <div className="app-container">
          <div className="background-image">
            <AboveNavbar />
            <Navbar />
            <Routes>
              <Route path="/" element={<AppointmentSection />} />
              <Route path="/make-appointment" element={<PatientForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/appointments/:doctorCode" element={<Appointments />} />
              {/* Add a new route for the contact form */}
              <Route path="/contact" element={<ContactForm />} />
            </Routes>
          </div>
        </div>
        <InfoSection />
        <div className="additional">
          <TwoColumnLayout />
        </div>
        <div className="end">
          <EndSection />
        </div>
      </div>
    </Router>
  );
};

export default App;

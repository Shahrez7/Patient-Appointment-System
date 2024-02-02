// Appointments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Appointments.css';

const Appointments = () => {
  const { doctorCode } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null); // Added state to store selected patient details

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/doctors/${doctorCode}/appointments/`);
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorCode]);

  const handleBuzzerClick = async () => {
    try {
      // Hit the API to delete the first appointment for the specified doctor code
      await axios.delete(`http://127.0.0.1:8000/delete_first_appointment/${doctorCode}/`);

      // Display a message when the buzzer is clicked
      setDeleteMessage('First entry deleted.');

      // Reload the page after hitting the buzzer
      window.location.reload();
    } catch (error) {
      console.error('Error hitting buzzer:', error);
      setDeleteMessage('Error deleting entry. Please try again.');
    }
  };

  const handlePatientSelect = async (patientId) => {
    try {
      // Hit the API to get patient details by ID
      const response = await axios.get(`http://127.0.0.1:8000/api/patients/${patientId}/`);
      setSelectedPatient(response.data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  return (
    <div className="appointments-container">
      <div className="appointments-list-container">
        <h2 className="appointments-heading">Appointments for Dr. {doctorCode}</h2>
        <button onClick={handleBuzzerClick} className="buzzer-button">
          Buzzer
        </button>
        {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
        {appointments.length === 0 ? (
          <p>No appointments available.</p>
        ) : (
          <ul className="appointments-list">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="appointment-item">
                <p><strong>Waiting Number:</strong> {appointment.waiting_number}</p>
                <p><strong>Patient id:</strong> {appointment.patient}</p>
                <p><strong>Estimated Checkup Time:</strong> {new Date(appointment.estimated_checkuptime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}</p>
                <button className='bt' onClick={() => handlePatientSelect(appointment.patient)}>More Info</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="patient-details-container">
        {selectedPatient && (
          <div className="patient-details">
            <center><h1 className="patient-details-heading">Patient Details</h1></center>
            <div className="patient-details-item">
              <strong>Name:</strong> {selectedPatient.name}
            </div>
            <div className="patient-details-item">
              <strong>Age:</strong> {selectedPatient.age}
              
            </div>
            <div className="patient-details-item">
              <strong>Email:</strong> {selectedPatient.email}
            </div>
            <div className="patient-details-item">
              <strong>Symptoms:</strong> {selectedPatient.symptoms}
            </div>
            <div className="patient-details-item">
              <strong>Entry Time: </strong>{new Date(selectedPatient.entry_time).toLocaleTimeString('en-US', {} )}
              </div>
            {/* Add more patient details as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;

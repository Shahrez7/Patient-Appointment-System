// PatientForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientForm.css';

const PatientForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    symptoms: '',
    doctor_code: '',
  });
  const [doctors, setDoctors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Fetch doctors from the backend when the component mounts
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/doctors/');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make API call to create a new patient
      await axios.post('http://127.0.0.1:8000/api/create-patient/', formData);
  
      // Set submit success to true
      setSubmitSuccess(true);
  
      // Optionally, you can reset the form after successful submission
      setFormData({
        name: '',
        age: '',
        email: '',
        symptoms: '',
        doctor_code: '',
      });
  
      // Reload the page after a delay
      setTimeout(() => {
        window.location.reload();
      }, 10000); // Reload the page after 2 seconds
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };
  

  return (
    <div className="patient-form-container">
      {submitSuccess ? (
        <div className="submit-success-message">
          <p>Thank you! Your Form has been Submitted. <span role="img" aria-label="Green tick">&#9989;</span>. Kindly Check your Email.</p>
          Reloading Home page in 10 seconds...
         {/* Reload the page after 2 seconds */}
        </div>
      ) : (
        <div>
          <h2>Patient Form</h2>
          <form onSubmit={handleSubmit}>
          <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Symptoms:</label>
            <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} required />

            <label>Doctor:</label>
            <select name="doctor_code" value={formData.doctor_code} onChange={handleChange} required>
              <option value="" disabled>Select a doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.code} value={doctor.code}>
                  {doctor.username}
                </option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PatientForm;

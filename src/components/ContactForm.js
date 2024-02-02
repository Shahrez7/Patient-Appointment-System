// src/components/ContactForm.js
import React, { useState } from 'react';
import './ContactForm.css'; // You can create this CSS file for styling

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // You can perform any additional logic here if needed
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="contact-form-container">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="contact-form">
          <center><h3>Contact Us</h3></center>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </label>
          <label>
            Mobile Number:
            <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} required />
          </label>
          <label>
            Subject:
            <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required />
          </label>
          <label>
            Message:
            <textarea name="message" value={formData.message} onChange={handleInputChange} required />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="success-message">
          <p>Thank you for your Feedback! Your response has been submitted. <span role="img" aria-label="Green tick">&#9989;</span> We'll Get Back to You Shortly :)</p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;

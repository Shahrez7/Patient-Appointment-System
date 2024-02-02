// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your custom styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Fetch the list of doctors
      const response = await axios.get('http://127.0.0.1:8000/api/doctors/');

      // Find the doctor with matching username and password
      const doctor = response.data.find(
        (doc) => doc.username === username && doc.password === password
      );

      if (doctor) {
        // Set login message
        setLoginMessage(`Welcome, Dr. ${doctor.username}!`);

        // Redirect to the appointments page for the logged-in doctor
        navigate(`/appointments/${doctor.code}`);
      } else {
        setLoginMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-input">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="login-input">
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      {loginMessage && <p className="login-message">{loginMessage}</p>}
    </div>
  );
};

export default Login;

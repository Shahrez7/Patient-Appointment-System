// EndSection.js
import React from 'react';
import { BiMap, BiPhone, BiEnvelope, BiMailSend } from 'react-icons/bi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './EndSection.css';

const EndSection = () => {
  return (
    <div className="end-section ">
      <div className="container">
        <div className="row">
          <div className="col-md-4 end-column">
            <h4 className="end-heading">BASIC INFO</h4>
            <p><BiMap className="icon" /> Address Line 1, Address Line 2, City, Country, 0123456</p>
            <p><BiPhone className="icon" /> 1234567890</p>
            <p><BiEnvelope className="icon" /> support@pepdev.com</p>
          </div>
          <div className="col-md-4 end-column">
            <h4 className="end-heading">QUICK LINKS</h4>
            <ul className="list-unstyled">
              <li><i className="bi bi-caret-right"></i> Contact Us</li>
              <li><i className="bi bi-caret-right"></i> About Us</li>
              <li><i className="bi bi-caret-right"></i> Doctor</li>
              <li><i className="bi bi-caret-right"></i> Home</li>
              <li><i className="bi bi-caret-right"></i> Services</li>
              <li><i className="bi bi-caret-right"></i> Login</li>
              <li><i className="bi bi-caret-right"></i> Register</li>
              <li><i className="bi bi-caret-right"></i> Forgot Password</li>
            </ul>
          </div>
          <div className="col-md-4 end-column">
            <h4 className="end-heading">NEWSLETTER</h4>
            <p><BiMailSend className="icon" /> Email Address</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Enter your email" aria-label="Email" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </div>
            <div className="social-icons mt-3">
              <FaFacebook className="icon" />
              <FaTwitter className="icon" />
              <FaInstagram className="icon" />
              <FaLinkedin className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndSection;

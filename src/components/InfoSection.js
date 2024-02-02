// src/components/InfoSection.js
import React from 'react';
import './InfoSection.css'; // Import your custom styles
import Image from './doc.jpg'; // Import the image
import ImageGrid from './ImageGrid'; // Import the ImageGrid component

const InfoSection = () => {
  return (
    <div className="info-section container">
      <center><h1>What We Do</h1></center>
      <div className="row">
        <div className="col-md-6">
          <div className="info-image">
            <img src={Image} alt="Info Section Image" className="img-fluid" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="info-text">
           
            <p>
            At KliniKal, our commitment to your well-being goes beyond medical care; it extends to a comprehensive range of services designed to cater to your unique needs. Our team of dedicated healthcare professionals is here to ensure that you receive the highest quality care in a compassionate and supportive environment.
            </p>
          </div>
          <ImageGrid /> {/* Include the ImageGrid component here */}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;

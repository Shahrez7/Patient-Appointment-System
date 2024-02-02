// src/components/ImageGrid.js
import React from 'react';
import './ImageGrid.css'; // Import your custom styles

// Import your images
import image1 from './card.png';
import image2 from './cb.png';
import image3 from './cad.png';
import image4 from './sc.png';
import image5 from './ls.png';
import image6 from './ps.png';

const ImageGrid = () => {
  // Dummy data for demonstration, you can replace it with your actual data
  const images = [
    { id: 1, title: 'CC', description: 'Cardiovascular Center', image: image1 },
    { id: 2, title: 'CB', description: 'Child Birth', image: image2 },
    { id: 3, title: 'CD', description: 'Cardiology', image: image3 },
    { id: 4, title: 'SC', description: 'Skin Care', image: image4 },
    { id: 5, title: 'LS', description: 'Labrotary Services', image: image5 },
    { id: 6, title: 'PT', description: 'Physiotherapy', image: image6 },
  ];

  return (
    <div className="image-grid">
      <div className="row">
        {images.map((image) => (
          <div key={image.id} className="col-md-4">
            <div className="image-container">
              <img src={image.image} alt={`Image ${image.id}`} className="img-fluid" />
              <div className="image-overlay">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </div>
            <center><p>{image.description}</p></center>
          </div>
          
        ))}
      </div>
      
    </div>
  );
};

export default ImageGrid;

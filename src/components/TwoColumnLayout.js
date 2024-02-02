// TwoColumnLayout.js
import React, { useState } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { FaCalendarAlt, FaUserMd } from 'react-icons/fa'; // Importing icons
import './TwoColumnLayout.css';

const TwoColumnLayout = () => {
  const slides = [
    { id: 1, image: 'room.jpg', caption: '20 ROOMS' },
    { id: 2, image: 'docs.jpg', caption: '10 DOCTORS' },
    { id: 3, image: 'beat.jpg', caption: '23 Years + Experience' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={6} className="left-column">
          <div className="left-content">
            <h1>Welcome to Klinikal Patient System</h1>
            <p>
            Welcome to our hospital, where excellence in healthcare is not just a commitment but a way of life. Our dedicated team comprises 10 skilled doctors, each bringing a unique set of expertise cultivated over a collective experience of 23 years. These professionals work tirelessly to ensure the well-being of our patients, offering a diverse range of specialized medical services.
            </p>
            <br></br>
            <p>Nestled within our state-of-the-art facility are 20 well-equipped rooms, designed to provide a comfortable and conducive environment for consultations, examinations, and treatments. We understand the importance of accessibility, which is why we operate for a total of 40 hours per week. This extended availability reflects our unwavering dedication to accommodating diverse schedules and ensuring that our community receives exceptional and compassionate healthcare services whenever they need it.

</p>
            <div className="button-container">
              <button className="animated-button">
                <FaCalendarAlt /> Book Appointment
              </button>
              <button className="animated-button">
                <FaUserMd /> Meet Your Doctor
              </button>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6} className="right-column">
          <Carousel
            className="slideshow"
            activeIndex={currentIndex}
            onSelect={handleSelect}
            prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
            nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
          >
            {slides.map((slide) => (
              <Carousel.Item key={slide.id}>
                <img
                  className="d-block w-100"
                  src={`${process.env.PUBLIC_URL}/${slide.image}`}
                  alt={slide.caption}
                />
                <Carousel.Caption className="caption">
                  <h3>{slide.caption}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default TwoColumnLayout;

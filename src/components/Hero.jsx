import React, { useState, useEffect } from "react";
import "./Hero.css";
import hero1 from "../assets/hero-image1.png";
import hero2 from "../assets/hero-image2.jpeg";
import hero3 from "../assets/hero-image3.jpeg";

const slides = [
  {
    image: hero1,
    title: "Next-Gen Mobility",
    description: "Power, performance, and style—experience the future of smartphones today."
  },
  {
    image: hero2,
    title: "Capture Every Moment",
    description: "Experience exceptional clarity and precision with our new high-performance cameras."
  },
  {
    image: hero3,
    title: "Power Meets Portability",
    description: "Unmatched performance and sleek design—built for work and play."
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" style={{ backgroundImage: `url(${slides[currentIndex].image})` }}>
      <div className="hero-content">
        <h1>{slides[currentIndex].title}</h1>
        <p>{slides[currentIndex].description}</p>
        <button className="shopnow">Shop Now</button>
      </div>
    </section>
  );
};

export default Hero;

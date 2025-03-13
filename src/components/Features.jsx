import React from "react";
import "./Features.css";
import { FaShippingFast, FaLightbulb, FaGem } from "react-icons/fa";

const Features = () => {
  return (
    <section className="features">
      <div className="features-content">
        <h2>We're tackling the biggest challenges in laptops and electronic products.</h2>
        <div className="features-grid">
          <div className="feature-item">
            <FaShippingFast className="feature-icon" />
            <h3>Fast & Free Shipping</h3>
            <p>Every single order ships for free. No minimums, no tiers, no fine print whatsoever.</p>
          </div>
          <div className="feature-item">
            <FaLightbulb className="feature-icon" />
            <h3>Innovative, User-Centric Design</h3>
            <p>Our cutting-edge designs prioritize performance, portability, and seamless integration into your lifestyle.</p>
          </div>
          <div className="feature-item">
            <FaGem className="feature-icon" />
            <h3>Durable, High-Quality Materials</h3>
            <p>We use premium aluminum, high-resolution OLED displays, and durable batteries for superior quality.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

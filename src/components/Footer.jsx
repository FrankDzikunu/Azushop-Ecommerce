import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-payment">
          <img src="/images/visa.png" alt="Visa" />
          <img src="/images/paypal.png" alt="PayPal" />
          <img src="/images/mastercard.png" alt="MasterCard" />
        </div>
        <div className="footer-text">
        <p >2022 Evershop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import "./RegisterModal.css"; 

const RegisterModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="Full name" required />
          <input type="email" placeholder="Email address *" required />
          <input type="password" placeholder="Password *" required />
          <input type="password" placeholder="Confirm password *" required />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <span className="login-link" onClick={onClose}>login in here →</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;

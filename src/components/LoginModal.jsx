import React from "react";
import "./LoginModal.css"; 

const LoginModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email address *" required />
          <input type="password" placeholder="Password *" required />
          <button type="submit">Log in</button>
        </form>
        <p>
          New customer? <a href="/register">Create your account →</a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;

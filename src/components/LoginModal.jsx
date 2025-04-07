import React, { useState } from "react";
import "./LoginModal.css";
import API from "../api";

const LoginModal = ({ onClose, setUser }) => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/api/login/", {
        username_or_email: username,
        password,
      });

      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      onClose();
    } catch (err) {
      const message = err.response?.data?.detail || "Login failed";
      setError(message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Username or Email *" 
            required 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password *" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
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

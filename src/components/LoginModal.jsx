import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ onClose, setUser }) => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username_or_email: username,  
          password 
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Login failed");

      // Store entire response including tokens in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      onClose();
    } catch (err) {
      setError(err.message);
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

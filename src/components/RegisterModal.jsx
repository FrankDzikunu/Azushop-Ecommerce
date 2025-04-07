import React, { useState } from "react";
import "./RegisterModal.css";
import API from "../api";

const RegisterModal = ({ onClose, setUser, openLogin }) => {
  const [name, setName] = useState(""); // Full name, will be used as username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await API.post(
        "/api/register/",
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      const data = response.data; // Axios auto parses JSON
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="r-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Full name" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="Email address *" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password *" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Confirm password *" 
            required 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          <button className="submit" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <span className="login-link" onClick={() => { onClose(); openLogin(); }}>
            Login in here →
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;

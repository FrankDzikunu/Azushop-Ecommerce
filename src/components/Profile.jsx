import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
  };

  return (
    <div className="profile-container">
      <Link to="/" className="backbutton">← Back</Link>
      <div className="product-container1">
      <div className="profile-card">
        <div className="profile-tabs">
          <span className="active-tab">Update Profile</span>
          <Link to="/admin/myorders/:id"><span className="inactive-tab">My orders</span></Link>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="profile-input disabled"
            disabled
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="profile-input disabled"
            disabled
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="profile-input"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="profile-input"
          />

          <button type="submit" className="update-button">Update</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Profile;

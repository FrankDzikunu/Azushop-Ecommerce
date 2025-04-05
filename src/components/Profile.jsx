import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Get token from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.access;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        toast.error("You must be logged in to view profile");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get("http://127.0.0.1:8000/api/profile/", config);
        setFormData({
          name: res.data.username,
          email: res.data.email,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        toast.error("Failed to load profile. Please login again.");
        console.error(error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        "http://127.0.0.1:8000/api/profile/update/",
        { name, email, password },
        config
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      <ToastContainer />
      <Link to="/" className="backbutton">← Back</Link>
      <div className="product-container1">
        <div className="profile-card">
          <div className="profile-tabs">
            <span className="active-tab">Update Profile</span>
            <Link to="/myorders/:id">
              <span className="inactive-tab">My orders</span>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="profile-input"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="profile-input"
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

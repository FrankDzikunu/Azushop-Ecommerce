import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./AdminCategory.css";


const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch categories from backend on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true); // Start loading
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.access;
      const response = await API.get(`/api/category/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.access;
    if (!token) {
      setError("Authentication required. Please log in.");
      return;
    }

    try {
      if (isEditing) {
        // Update category (using PUT)
        await API.put(
          `/api/category/${selectedCategory.id}/`,
          { name: category },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Add new category (using POST)
        await API.post(
          `/api/category/`,
          { name: category },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      // Refresh categories from backend
      fetchCategories();
      setCategory("");
      setIsEditing(false);
      setSelectedCategory(null);
    } catch (err) {
      console.error("Error submitting category:", err);
      setError("Failed to submit category.");
    }
  };

  const handleEdit = (categoryObj) => {
    setCategory(categoryObj.name);
    setIsEditing(true);
    setSelectedCategory(categoryObj);
  };

  return (
    <div className="admin-category">
      <Link to="/" className="backbutton">← Back</Link>
      {loading ? (
          <div className="loading-container">
          <img
            src="/load-35_256.gif" 
            alt="Loading..."
            className="loading-gif"
          />
            <div class="wave-container">
              <h1 class="wave-text">
              <span>L</span> <span>O</span> <span>A</span> <span>D</span> <span>I</span> <span>N</span> <span>G</span> <span> . </span> <span>.</span> <span>.</span> 
              </h1>
            </div>
        </div>
      ) : (
        <div className="product-container1" style={{ marginBottom: "290px" }}>
          <h3 className="admin-tabs"> Update Category</h3>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="category-form">
          <input
            type="text"
            placeholder="Write category name"
            value={category || ""}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-button">
            {isEditing ? "Update" : "Submit"}
          </button>
        </form>

        <div className="category-list">
          {categories.map((item) => (
            <button key={item.id} className="category-item" onClick={() => handleEdit(item)}>
              {item.name}
            </button>
          ))}
        </div>
      </div>
      )}
    </div>
  );
};

export default AdminCategory;

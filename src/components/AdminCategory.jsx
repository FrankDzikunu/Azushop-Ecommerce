import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminCategory.css";

const AdminCategory = () => {
  const [categories, setCategories] = useState([
    "Laptop",
    "Phone",
    "Camera",
    "Watch",
    "Tablet",
  ]);
  const [category, setCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing category
      setCategories(
        categories.map((item) => (item === selectedCategory ? category : item))
      );
      setIsEditing(false);
      setSelectedCategory(null);
    } else {
      // Add new category
      if (category && !categories.includes(category)) {
        setCategories([...categories, category]);
      }
    }

    setCategory("");
  };

  const handleEdit = (categoryName) => {
    setCategory(categoryName);
    setIsEditing(true);
    setSelectedCategory(categoryName);
  };

  return (
    <div className="admin-category">
      <Link to="/" className="backbutton">← Back</Link>
      <div className="product-container1" style={{ marginBottom: "290px" }}>
      <h3 className="admin-tabs"> Update Category</h3>

      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          placeholder="Write category name"
          value={category}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">
          {isEditing ? "Update" : "Submit"}
        </button>
      </form>

      <div className="category-list">
        {categories.map((item, index) => (
          <button key={index} className="category-item" onClick={() => handleEdit(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AdminCategory;

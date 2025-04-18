import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminProducts.css";
import { FaPen } from "react-icons/fa";
import API, { BASE_URL } from "../api";

// Helper function to get the image URL
const getImageUrl = (image) => {
  if (!image) return "/images/default.png"; // Default image if no image is provided
  if (image.startsWith("http")) return image; // Return the full URL if it's already absolute
  return `${BASE_URL}/${image.replace(/^\/+/, "")}`;
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.access;

    API
      .get(`/api/products/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // Data has loaded
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Stop loading even if there's an error
      });
  }, []);

  return (
    <div className="admin-products">
      <Link to="/" className="backbutton">← Back</Link>
      <div className="product-container1">
        <div className="adminheader">
          <div className="admin-tabs">
            <Link to="/admin/products">
              <span className="active-tab">Products</span>
            </Link>
            <Link to="/admin/createproduct">
              <span className="createproduct">Create Product</span>
            </Link>
          </div>
          <span className="total-products">
            Total: {products.length.toString().padStart(2, "0")}
          </span>
        </div>

        <div className="admin-product-grid">
          {isLoading ? (
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
            products.map((product, index) => (
              <div className="Admin-product-card" key={product.id || index}>
                <img 
                  src={getImageUrl(product.image)} 
                  alt={product.name || "Product Image"} 
                  className="product-image" 
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="productprice">${product.price}</p>
                <div className="product-footer">
                  <div className="straigthline"></div>
                  <Link to={`/admin/updateproduct/${product.id}`}>
                    <FaPen className="edit-icon" />
                  </Link>
                  <span className="product-date">
                    {new Date(product.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

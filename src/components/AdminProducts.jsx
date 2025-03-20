import React from "react";
import { Link } from "react-router-dom";
import "./AdminProducts.css";
import { FaPen } from "react-icons/fa";

const AdminProducts = () => {
  // Placeholder product data
  const products = Array(6).fill({
    id: 1,
    name: "Apple MacBook Pro 2019 | 16\"",
    description: "RAM 16.0 GB │ Memory 512 GB Keyboard layout Eng (English)",
    price: "$749.99",
    date: "05/07/2025",
    image: "/images/macbook.png", 
  });

  return (
    <div className="admin-products">
      <Link to="/" className="backbutton">← Back</Link>
      <div className="product-container1">
      <div className="adminheader">
        <div className="admin-tabs">
          <Link to="/admin/products"><span className="active-tab">Products</span></Link>
          <Link to="/admin/createproduct" ><span className="createproduct">Create Product</span></Link>
        </div>
        <span className="total-products">Total: {products.length.toString().padStart(2, "0")}</span>
      </div>

      <div className="admin-product-grid">
        {products.map((product, index) => (
          <div className="Admin-product-card" key={index}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="productprice">{product.price}</p>
            <div className="product-footer">
              <Link to="/admin/updateproduct"><FaPen className="edit-icon" /></Link>
              <span className="product-date">{product.date}</span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default AdminProducts;

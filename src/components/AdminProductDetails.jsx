import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminProductDetails.css";

const AdminProductDetails = () => {
  const [product, setProduct] = useState({
    name: "Apple MacBook Pro 2019 | 16\"",
    price: "$749.99",
    quantity: "20",
    brand: "Apple",
    countInStock: "10",
    category: "Laptop",
    description: "RAM 16.0 GB | Memory 512 GB  Keyboard layout Eng (English)",
    image: "/images/macbook.png", 
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Product Updated:", product);
  };

  const handleDelete = () => {
    console.log("Product Deleted:", product.name);
  };

  return (
    <div className="admin-product-details">
        <Link to="/" className="backbutton">← Back</Link>
        <div className="product-container1">
      <div className="admin-tabs">
          <Link to="/admin/products"><span className="non-active-tap">Products</span></Link>
        <span className="active-tab">Update Product</span>
      </div>

      <div className="product-image-container">
        <img src={product.image} alt="Product" className="product-image" />
        <div className="file-upload">
          <input type="file" id="file" onChange={handleFileChange} hidden />
          <label htmlFor="file" className="file-label">Choose file</label>
          <span className="file-chosen">No file chosen</span>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="productform">
        <div className="input-group">
          <input type="text" name="name" value={product.name} onChange={handleChange} />
          <input type="text" name="price" value={product.price} onChange={handleChange} />
        </div>

        <div className="input-group">
          <input type="text" name="quantity" value={product.quantity} onChange={handleChange} />
          <input type="text" name="brand" value={product.brand} onChange={handleChange} />
        </div>

        <div className="input-group">
          <input type="text" name="countInStock" value={product.countInStock} onChange={handleChange} />
          <select name="category" value={product.category} onChange={handleChange}>
            <option value="Laptop">Laptop</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>

        <textarea name="description" value={product.description} onChange={handleChange} readOnly />

        <div className="button-group">
          <button type="submit" className="update-button">Update</button>
          <button type="button" className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AdminProductDetails;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminCreateProduct.css";

const AdminCreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    brand: "",
    countInStock: "",
    category: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Submitted:", product);
  };

  return (
    <div className="admin-create-product">
      <Link to="/" className="backbutton">← Back</Link>
      <div className="product-container1">
      <div className="admin-tabs">
        <Link to="/admin/products"><span className="non-active-tap">Products</span></Link>
        <Link to="/admin/createproduct"><span className="active-tab">Create Product</span></Link>
      </div>

      <form onSubmit={handleSubmit} className="productform">
        <div className="file-upload">
          <input type="file" id="file" onChange={handleFileChange} hidden />
          <label htmlFor="file" className="file-label">Choose file</label>
        </div>

        <div className="input-group">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} />
          <input type="text" name="price" placeholder="Price" onChange={handleChange} />
        </div>

        <div className="input-group">
          <input type="text" name="quantity" placeholder="Quantity" onChange={handleChange} />
          <input type="text" name="brand" placeholder="Brand" onChange={handleChange} />
        </div>

        <div className="input-group">
          <input type="text" name="countInStock" placeholder="Count in stock" onChange={handleChange} />
          <select name="category" onChange={handleChange}>
            <option value="">Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
          </select>
        </div>

        <textarea name="description" placeholder="Description" onChange={handleChange} />

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default AdminCreateProduct;

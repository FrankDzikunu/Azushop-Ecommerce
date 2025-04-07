import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminCreateProduct.css";
import API from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminCreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    brand: "",
    count_in_stock: "",
    category: "",
    description: "",
    image: null,
  });

  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.access;
  
    API.get(`/api/categories/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setCategories(res.data))
    .catch((err) => {
      console.error("Error fetching categories:", err);
      setFetchError("Failed to load categories.");
    });
  }, []);
  

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
  
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.access;
  
    if (!token) {
      toast.error("Authentication required. Please log in.");
      setLoading(false);
      return;
    }
  
    if (!product.image) {
      toast.error("Image is required!");
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("brand", product.brand);
    formData.append("count_in_stock", product.count_in_stock);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("is_active", "true");
    formData.append("image", product.image); 
  
    try {
      const response = await API.post(`/api/products/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Product Created:", response.data);
      setSuccess(true);
      toast.success("Product created successfully!");
  
      setProduct({
        name: "",
        price: "",
        quantity: "",
        brand: "",
        count_in_stock: "",
        category: "",
        description: "",
        image: null,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  
    setLoading(false);
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
          <ToastContainer position="top-right" autoClose={3000} />
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Product created successfully!</p>}
          {fetchError && <p className="error-message">{fetchError}</p>}

          <div className="file-upload">
            <input type="file" id="file" onChange={handleFileChange} hidden />
            <label htmlFor="file" className="file-label" >Choose file</label>
            {product.image && <span className="file-name">{product.image.name}</span>}
          </div>

          <div className="input-group">
            <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
            <input type="text" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <input type="text" name="quantity" placeholder="Quantity" value={product.quantity} onChange={handleChange} required />
            <input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <input type="text" name="count_in_stock" placeholder="Count in stock" value={product.count_in_stock} onChange={handleChange} required />
            <select
              name="category"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required />

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateProduct;

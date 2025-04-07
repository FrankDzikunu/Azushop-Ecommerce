import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./AdminProductDetails.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";





const AdminProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Initialize product state
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    brand: "",
    count_in_stock: "",
    category: "",
    description: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Retrieve token from localStorage stored under "user"
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.access; 

  // Fetch product details and categories with authentication header
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/api/products/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await API.get("/api/categories/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id, token]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("brand", product.brand);
    formData.append("count_in_stock", product.count_in_stock);
    formData.append("category", product.category);
    formData.append("description", product.description);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      await API.put(`/api/products/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire("Success!", "Product updated successfully!", "success");
    } catch (error) {
      toast.error("Error updating product. Please try again.");
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await API.delete(`/api/products/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire("Deleted!", "The product has been deleted.", "success");
          navigate("/admin/products");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the product.", "error");
        }
      }
    });
  };
  

  return (
    <div className="admin-product-details">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Link to="/" className="backbutton">← Back</Link>
      <div className="product-container1">
        <div className="admin-tabs">
          <Link to="/admin/products">
            <span className="non-active-tab">Products</span>
          </Link>
          <span className="active-tab">Update Product</span>
        </div>

        <div className="product-image-container">
        <img 
            src={selectedFile ? URL.createObjectURL(selectedFile) : product.image || null} 
            alt="Product" 
            className="product-image" 
          />
          <div className="file-upload">
            <input type="file" id="file" onChange={handleFileChange} hidden />
            <label htmlFor="file" className="file-label">Choose file</label>
            <span className="file-chosen">
              {selectedFile ? selectedFile.name : "No file chosen"}
            </span>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="productform">
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="count_in_stock"
              value={product.count_in_stock}
              onChange={handleChange}
              required
            />
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />

          <div className="button-group">
            <button type="submit" className="update-button">
              Update
            </button>
            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductDetails;

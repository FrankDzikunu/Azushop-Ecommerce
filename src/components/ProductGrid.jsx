import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProductGrid.css";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";

const BASE_URL = "http://127.0.0.1:8000";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // For brands, we'll derive from products if no separate endpoint is provided
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Set());

  // Retrieve token from localStorage (if using JWT, include headers accordingly)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.access;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchFavorites();
    fetchCart();
  }, []);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setProducts(response.data);
      // Derive unique brands from products if not provided by backend
      const brandSet = new Set(response.data.map((p) => p.brand));
      setBrands([...brandSet]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/categories/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch favorites from backend
  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/favorites/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });
      setFavorites(new Set(response.data.map((fav) => fav.product)));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/cart/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });
      setCart(new Set(response.data.map((item) => item.product)));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Toggle favorite (add/remove)
  const toggleFavorite = async (productId) => {
    try {
      if (favorites.has(productId)) {
        await axios.delete(`${BASE_URL}/api/favorites/${productId}/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        setFavorites((prev) => {
          const updated = new Set(prev);
          updated.delete(productId);
          return updated;
        });
      } else {
        await axios.post(`${BASE_URL}/api/favorites/${productId}/`, {}, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        setFavorites((prev) => new Set(prev).add(productId));
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  // Add product to cart
  const addToCart = async (productId) => {
    try {
      if (!cart.has(productId)) {
        await axios.post(`${BASE_URL}/api/cart/${productId}/`, {}, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        setCart((prev) => new Set(prev).add(productId));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Filter products on frontend
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "" ||
      // Compare product.category (which is a number) to selectedCategory (convert to number)
      parseInt(product.category) === parseInt(selectedCategory);
    const matchesBrand =
      selectedBrand === "" || product.brand === selectedBrand;
    const matchesPrice =
      priceRange === "" || parseFloat(product.price) <= parseFloat(priceRange);
    return matchesCategory && matchesBrand && matchesPrice;
  });

  return (
    <div>
      <nav className="breadcrumb">
        Home / <span className="active">Shop</span>
      </nav>
      <div className="product-grid-container">
        <div className="product-layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-category">
              <h3>Shop By</h3>
              <p>
                <strong>Product Categories</strong>
              </p>
              <label>
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ""}
                  onChange={() => setSelectedCategory("")}
                />
                All Categories
              </label>
              {categories.map((cat) => (
                <label key={cat.id}>
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={selectedCategory === String(cat.id)}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  {cat.name}
                </label>
              ))}
            </div>

            <div className="sidebar-brand">
              <p>
                <strong>Brand</strong>
              </p>
              <label>
                <input
                  type="radio"
                  name="brand"
                  value=""
                  checked={selectedBrand === ""}
                  onChange={() => setSelectedBrand("")}
                />
                All Brands
              </label>
              {brands.map((brand, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="brand"
                    value={brand}
                    checked={selectedBrand === brand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  {brand}
                </label>
              ))}
            </div>

            <div className="sidebar-price">
              <p>
                <strong>Price</strong>
              </p>
              <input
                type="number"
                placeholder="Enter max price"
                className="price-input"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              <button
                className="reset-btn"
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedBrand("");
                  setPriceRange("");
                }}
              >
                Reset
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="productgrid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-brand">{product.brand}</div>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-specs">{product.description}</p>
                  <span className="product-price">${product.price}</span>
                  <div className="product-actions">
                    <FaHeart
                      className="icon"
                      onClick={() => toggleFavorite(product.id)}
                      style={{ color: favorites.has(product.id) ? "red" : "grey" }}
                    />
                    <FaShoppingCart
                      className="icon"
                      onClick={() => addToCart(product.id)}
                      style={{ color: cart.has(product.id) ? "green" : "grey" }}
                    />
                    <Link to={`/productdetails/${product.id}`}>
                      <FaEye className="icon" style={{ color: "black" }} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;

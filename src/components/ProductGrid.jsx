import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./ProductGrid.css";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Set());

  // Retrieve token from localStorage (if any)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.access;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    if (token) {
      fetchFavorites();
      fetchCart();
    }
  }, [token]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await API.get(`/api/products/`);
      setProducts(response.data);
      const brandSet = new Set(response.data.map((p) => p.brand));
      setBrands([...brandSet]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await API.get(`/api/categories/`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch favorites from backend
  const fetchFavorites = async () => {
    try {
      const response = await API.get(`/api/favorites/`, {
        headers: { Authorization: `Bearer ${token}` },
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
      const response = await API.get(`/api/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setCart(new Set(response.data.map((item) => item.product)));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Toggle favorite (add/remove)
  const toggleFavorite = async (productId) => {
    if (!token) {
      toast.warning("You must log in to add products to favorites!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    try {
      let updatedFavorites;
      if (favorites.has(productId)) {
        await API.delete(`/api/favorites/${productId}/`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        updatedFavorites = new Set(favorites);
        updatedFavorites.delete(productId);
      } else {
        await API.post(`/api/favorites/${productId}/`, {}, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        updatedFavorites = new Set(favorites);
        updatedFavorites.add(productId);
      }
      setFavorites(updatedFavorites);
      // Dispatch custom event so Navbar updates counts immediately
      window.dispatchEvent(new Event("updateCounts"));
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  // Add product to cart
  const addToCart = async (productId) => {
    if (!token) {
      toast.warning("You must log in to add products to cart!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    try {
      if (!cart.has(productId)) {
        await API.post(`/api/cart/${productId}/`, {}, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const updatedCart = new Set(cart);
        updatedCart.add(productId);
        setCart(updatedCart);
        // Dispatch event to update Navbar counts
        window.dispatchEvent(new Event("updateCounts"));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Filter products on frontend
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "" ||
      String(product.category) === String(selectedCategory);
    const matchesBrand =
      selectedBrand === "" || product.brand === selectedBrand;
    const matchesPrice =
      priceRange === "" || parseFloat(product.price) <= parseFloat(priceRange);
    return matchesCategory && matchesBrand && matchesPrice;
  });

  return (
    <div>
      <ToastContainer />
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

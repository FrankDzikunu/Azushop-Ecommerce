import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import "./Favourite.css";

const Favourite = () => {
  const [favourites, setFavourites] = useState([]);
  const [cart, setCart] = useState(new Set());
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Retrieve token from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.access;

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchFavourites(), fetchCart()]);
      setLoading(false); //Turn off loading after fetching
    };
    fetchData();
  }, [token]);

  // Fetch favourite products from backend
  const fetchFavourites = async () => {
    try {
      const response = await API.get(`/api/favorites/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setFavourites(response.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const response = await API.get(`/api/cart/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setCart(new Set(response.data.map((item) => item.product)));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Remove product from favourites
  const toggleFavourite = async (productId) => {
    try {
      await API.delete(`/api/favorites/${productId}/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setFavourites((prev) => prev.filter((item) => item.product_detail.id !== productId));
      const updatedFavorites = new Set(favorites);
      updatedFavorites.add(productId);
      setFavorites(updatedFavorites);
      // Dispatch custom event to updates Navbar counts immediately
      window.dispatchEvent(new Event("updateCounts"));
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  // Add product to cart
  const addToCart = async (productId) => {
    try {
      if (!cart.has(productId)) {
        await API.post(`/api/cart/${productId}/`, {}, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
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

  return (
    <div className="favourite-container">
      <nav className="breadcrumb">
        Home / <span className="active">Favourite</span>
      </nav>

      <div className="favourite-content">
        {loading ? (
            <div className="loading-container">
            <img
              src="/load-35_256.gif" 
              alt="Loading..."
              className="loading-gif"
            />
            <p>Your favourite is loading...</p>
          </div>
        ) : favourites.length > 0 ? (
          favourites.map((item) => (
            <div key={item.id} className="product-card">
              <span className="brand-label">{item.product_detail?.brand || "Unknown"}</span>
              <img
                src={item.product_detail?.image ? `${item.product_detail.image}` : "/images/default.png"}
                alt={item.product_detail?.name || "Product"}
                className="product-image"
              />
              <p className="product-name">{item.product_detail?.name || "Product"}</p>
              <p className="product-specs">{item.product_detail?.description || ""}</p>
              <p className="product-price">
                $
                {item.product_detail && item.product_detail.price
                  ? parseFloat(item.product_detail.price).toFixed(2)
                  : "0.00"}
              </p>

              <div className="icon-buttons">
                <button className="icon-btn cart-btn" onClick={() => addToCart(item.product_detail.id)}>
                  <FaShoppingCart style={{ color: cart.has(item.product_detail.id) ? "green" : "grey" }} />
                </button>
                <button className="icon-btn heart-btn" onClick={() => toggleFavourite(item.product_detail.id)}>
                  <FaHeart style={{ color: "red" }} />
                </button>
                <button className="icon-btn eye-btn">
                  <Link to={`/productdetails/${item.product_detail.id}`}>
                    <FaEye className="icon" style={{ color: "black" }} />
                  </Link>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart">
            <img src="/no-products-found.png" alt="No favourite products" className="empty-cart-img" />
            <p>your favourite is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourite;
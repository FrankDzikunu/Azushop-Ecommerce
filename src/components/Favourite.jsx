import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import "./Favourite.css";

const BASE_URL = "http://127.0.0.1:8000";

const Favourite = () => {
  const [favourites, setFavourites] = useState([]);
  const [cart, setCart] = useState(new Set());

  // Retrieve token from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.access;

  useEffect(() => {
    fetchFavourites();
    fetchCart();
  }, [token]);

  // Fetch favourite products from backend
  const fetchFavourites = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/favorites/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      // Expect response data to be an array of favorite objects,
      // each with a nested product_detail containing product info.
      setFavourites(response.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/cart/`, {
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
      await axios.delete(`${BASE_URL}/api/favorites/${productId}/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setFavourites((prev) => prev.filter((item) => item.product_detail.id !== productId));
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  // Add product to cart
  const addToCart = async (productId) => {
    try {
      if (!cart.has(productId)) {
        await axios.post(`${BASE_URL}/api/cart/${productId}/`, {}, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setCart((prev) => new Set(prev).add(productId));
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
        {favourites.length > 0 ? (
          favourites.map((item) => (
            <div key={item.id} className="product-card">
              <span className="brand-label">{item.product_detail?.brand || "Unknown"}</span>
              <img
                src={item.product_detail?.image ? `${BASE_URL}${item.product_detail.image}` : "/images/default.png"}
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
                  <FaEye />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No favourite products found.</p>
        )}
      </div>
    </div>
  );
};

export default Favourite;

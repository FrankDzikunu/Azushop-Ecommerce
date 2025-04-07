import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaHome, FaShoppingCart, FaHeart, FaUser, FaCaretDown } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { BiShoppingBag } from "react-icons/bi";
import API from "../api";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const navigate = useNavigate();

  // Function to fetch cart count
  const fetchCartCount = async (token) => {
    try {
      const response = await API.get(`/api/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartCount(response.data.length);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // Function to fetch favorite count
  const fetchFavoriteCount = async (token) => {
    try {
      const response = await API.get(`/api/favorites/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavoriteCount(response.data.length);
    } catch (error) {
      console.error("Error fetching favorite count:", error);
    }
  };

  // Load user on mount and fetch counts if logged in
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
      fetchCartCount(loggedUser.access);
      fetchFavoriteCount(loggedUser.access);
    }
  }, []);

  // Listen for the custom "updateCounts" event to re-fetch counts instantly
  useEffect(() => {
    const handleUpdateCounts = () => {
      if (user) {
        fetchCartCount(user.access);
        fetchFavoriteCount(user.access);
      }
    };
    window.addEventListener("updateCounts", handleUpdateCounts);
    return () => {
      window.removeEventListener("updateCounts", handleUpdateCounts);
    };
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCartCount(0);
    setFavoriteCount(0);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">Azushop</div>
        <ul className="nav-links">
          <li>
            <Link to="/"><FaHome /> Home</Link>
          </li>
          <li>
            <Link to="/shop"><BiShoppingBag /> Shop</Link>
          </li>
          <li className="cart-icon">
            <Link to="/cart">
              <FaShoppingCart />
              {cartCount > 0 && <span className="item-count">{cartCount}</span>}
              Cart
            </Link>
          </li>
          <li className="favorite-icon">
            <Link to="/favourite">
              <FaHeart />
              {favoriteCount > 0 && <span className="item-count">{favoriteCount}</span>}
              Favourite
            </Link>
          </li>
        </ul>

        <ul className="nav-links">
          {user ? (
            <li className="dropdown">
              <span onClick={() => setDropdownOpen(!dropdownOpen)} className="user-dropdown">
                <FaUser className="user-icon" /> {user.username} <FaCaretDown />
              </span>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  {user.isAdmin ? (
                    <>
                      <li><Link to="/admin/dashboard">Dashboard</Link></li>
                      <li><Link to="/admin/products">Products</Link></li>
                      <li><Link to="/admin/categories">Categories</Link></li>
                      <li><Link to="/admin/orders">Orders</Link></li>
                      <li><Link to="/admin/users">Users</Link></li>
                    </>
                  ) : (
                    <li><Link to="/myorders/:id">My Orders</Link></li>
                  )}
                  <li><Link to="/profile">Profile</Link></li>
                  <li onClick={handleLogout} style={{ cursor: "pointer", color: "red", textAlign: "left" }}>
                    Logout
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <>
              <li onClick={() => setIsLoginOpen(true)} style={{ cursor: "pointer" }}>
                <FiLogIn /> Login
              </li>
              <li onClick={() => setIsRegisterOpen(true)} style={{ cursor: "pointer" }}>
                <FaUser /> Register
              </li>
            </>
          )}
        </ul>
      </nav>

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} setUser={setUser} />}
      {isRegisterOpen && <RegisterModal onClose={() => setIsRegisterOpen(false)} setUser={setUser} openLogin={() => setIsLoginOpen(true)} />}
    </>
  );
};

export default Navbar;

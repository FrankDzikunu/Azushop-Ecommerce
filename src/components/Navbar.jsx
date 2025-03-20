import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaHome, FaShoppingCart, FaHeart, FaUser, FaCaretDown } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { BiShoppingBag } from "react-icons/bi";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
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
          <li>
            <Link to="/cart"><FaShoppingCart /> Cart</Link>
          </li>
          <li>
            <Link to="/favourite"><FaHeart /> Favourite</Link>
          </li>
        </ul>

        <ul className="nav-links">
          {user ? (
            <li className="dropdown">
              <span onClick={() => setDropdownOpen(!dropdownOpen)} className="user-dropdown" >
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
                    <>
                      <li><Link to="/orders">My Orders</Link></li>
                    </>
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

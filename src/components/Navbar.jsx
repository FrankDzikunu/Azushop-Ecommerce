import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaHome, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { BiShoppingBag } from "react-icons/bi";
import LoginModal from "./LoginModal"; 
import RegisterModal from "./RegisterModal"; 

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
          <li onClick={() => setIsLoginOpen(true)} style={{ cursor: "pointer" }}>
            <FiLogIn /> Login
          </li>
          <li onClick={() => setIsRegisterOpen(true)} style={{ cursor: "pointer" }}>
            <FaUser /> Register
          </li>
        </ul>
      </nav>

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && <RegisterModal onClose={() => setIsRegisterOpen(false)} />}
    </>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaHome, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { BiShoppingBag } from 'react-icons/bi';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">Azushop</div>
      <ul className="nav-links">
        <li>
            <Link to="/"><FaHome /> Home</Link>
        </li>
        <li>
            <Link to="/shop"><BiShoppingBag />Shop</Link>
        </li>
            
        <li>
          <Link to="/cart"><FaShoppingCart /> Cart</Link>
        </li>
        <li>
          <Link to="/favourite"><FaHeart /> Favourite</Link>
        </li>      
      </ul>
      <ul className="nav-links">
        <li>
          <FiLogIn /> Login
        </li>
        <li>
          <FaUser />  Register
        </li>
      </ul>

    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";


const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Apple MacBook Pro 2019 | 16\"",
      brand: "Apple",
      price: 749.99,
      quantity: 1,
      image: "/images/macbook.png",
    },
  ];

  return (
    <div className="cart-container">
      <nav className="breadcrumb">Home / <span className="active">Cart</span></nav>
      <div className="cart-content">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="cart-product-info">
                  <img src={item.image} alt={item.name} className="cart-product-image" />
                  <div className="cart-product-details">
                    <p className="cart-product-name">{item.name}</p>
                    <p className="productbrand">Brand: <span>{item.brand}</span></p>
                    <button className="remove-btn">Remove</button>
                  </div>
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <select className="quantity-selector" defaultValue={item.quantity}>
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cart-summary">
          <p>Items: {cartItems.length}</p>
          <p>Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
          <Link to="/checkout">
          <button className="checkout-btn">Proceed to checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Cart.css";

const BASE_URL = "http://127.0.0.1:8000";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve token from localStorage (assuming JWT)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.access;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/cart/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        console.log("Cart API response:", response.data);
        setCartItems(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  // Handle quantity change
  const handleQuantityChange = async (id, quantity, maxQuantity) => {
    if (quantity > maxQuantity) return; // Prevent exceeding max quantity
    try {
      await axios.put(`${BASE_URL}/api/cart/${id}/`, { quantity }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Handle remove from cart
  const handleRemove = async (productId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/cart/${productId}/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });
      // Update cart items with the returned updated cart data
      setCartItems(response.data.cart);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };
  

  // Calculate total price using nested product_detail.price
  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (acc, item) =>
          acc + (item.product_detail ? parseFloat(item.product_detail.price) : 0) * item.quantity,
        0
      )
    : 0;

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (!loading && cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-container">
      <nav className="breadcrumb">
        Home / <span className="active">Cart</span>
      </nav>
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
                <img
                    src={item.product_detail ? `${BASE_URL}${item.product_detail.image}` : ""}
                    alt={item.product_detail ? item.product_detail.name : "Product"}
                    className="cart-product-image"
                  />
                  <div className="cart-product-details">
                    <p className="cart-product-name">
                      {item.product_detail ? item.product_detail.name : "Product"}
                    </p>
                    <p className="productbrand">
                      Brand: <span>{item.product_detail ? item.product_detail.brand : ""}</span>
                    </p>
                    <button className="remove-btn" onClick={() => handleRemove(item.product_detail.id)}>
                      Remove
                    </button>

                  </div>
                </td>
                <td>
                  ${item.product_detail ? parseFloat(item.product_detail.price).toFixed(2) : "0.00"}
                </td>
                <td>
                  <select
                    className="quantity-selector"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value), item.product_detail ? item.product_detail.count_in_stock : 5)
                    }
                  >
                    {[...Array(item.product_detail ? item.product_detail.count_in_stock : 5)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  $
                  {item.product_detail
                    ? (parseFloat(item.product_detail.price) * item.quantity).toFixed(2)
                    : "0.00"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cart-summary">
          <p>Items: {cartItems.length}</p>
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <Link to="/checkout">
            <button className="checkout-btn">Proceed to checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

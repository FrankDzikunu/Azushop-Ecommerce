import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(new Set());

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.access;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await API.get("/api/cart/");
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

  const handleQuantityChange = async (id, quantity, maxQuantity) => {
    if (quantity > maxQuantity) return;
    try {
      await API.put(`/api/cart/${id}/`, { quantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await API.delete(`/api/cart/${productId}/`);
      setCartItems(response.data.cart);
      const updatedCart = new Set(cart);
      updatedCart.add(productId);
      setCart(updatedCart);
      window.dispatchEvent(new Event("updateCounts"));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (acc, item) =>
          acc + (item.product_detail ? parseFloat(item.product_detail.price) : 0) * item.quantity,
        0
      )
    : 0;

  if (loading) {
    return (
      <div className="cart-loading">
        <img src="/loading_cart.gif" alt="Loading..." className="loading-gif" />
      </div>
    );
  }
    

  if (!loading && cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <img src="/cart is empty.jpg" alt="Empty Cart" className="empty-cart-img" />
        <p>Your cart is empty.</p>
      </div>
    );
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
                  src={item.product_detail?.image ? `${item.product_detail.image}` : ""}
                  alt={item.product_detail?.name || "Product"}
                  className="cart-product-image"
                />

                  <div className="cart-product-details">
                    <p className="cart-product-name">
                      {item.product_detail?.name || "Product"}
                    </p>
                    <p className="productbrand">
                      Brand: <span>{item.product_detail?.brand || ""}</span>
                    </p>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.product_detail.id)}
                    >
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
                      handleQuantityChange(
                        item.id,
                        parseInt(e.target.value),
                        item.product_detail?.count_in_stock ?? 5
                      )
                    }
                  >
                    {[...Array(item.product_detail?.count_in_stock ?? 5)].map((_, index) => (
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

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./AdminOrderDetails.css";

const BASE_URL = "http://127.0.0.1:8000";

const MyOrderDetails = () => {
  // Use the correct parameter key from the route.
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Retrieve token from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.access;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/orders/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(response.data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, token]);


  if (loading) return <p>Loading order details...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <div className="admin-order-details-container">
      <Link to="/admin/orders" className="backbutton">← Back</Link>
      <div className="product-container1">
        <div className="order-content">
          {/* Order Details Table */}
          <div className="order-details">
            <h2 className="section-title">Order details</h2>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items && order.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={
                          item.product_image.startsWith("http")
                            ? item.product_image
                            : `${BASE_URL}${item.product_image}`
                        }
                        alt={item.product_name}
                        className="order-item-image"
                      />
                    </td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>${parseFloat(item.unit_price).toFixed(2)}</td>
                    <td>${parseFloat(item.total_price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Shipping & Order Summary */}
          <div className="order-summary">
            <div className="shipping-info">
              <h3>Shipping</h3>
              <p><strong>Order:</strong> {order.id}</p>
              <p><strong>User ID:</strong> {order.user}</p>
              <p><strong>Address:</strong> {order.address}, {order.city}, {order.country}</p>
              <p><strong>Method:</strong> {order.payment_method}</p>
            </div>

            <div className="summary-info">
              <h3>Order Summary</h3>
              <p><strong>Items:</strong> ${parseFloat(order.total_price).toFixed(2)}</p>
              <p><strong>Shipping:</strong> ${parseFloat(order.shipping_cost).toFixed(2)}</p>
              <p><strong>Tax:</strong> ${parseFloat(order.tax).toFixed(2)}</p>
              <p><strong>Total:</strong> ${parseFloat(order.total_price).toFixed(2)}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderDetails;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import API from "../api";
import "./AdminOrders.css";


const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.access;
        const response = await API.get(`/api/orders/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError("Failed to load orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-orders-container">
      <Link to="/" className="backbutton">← Back</Link>
      <div className="product-container1">
        <div className="admin-tabs">
          <h2 className="active-tab">Orders</h2>
        </div>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <div className="loading-container">
          <img
            src="/load-35_256.gif" 
            alt="Loading..."
            className="loading-gif"
          />
            <div class="wave-container">
              <h1 class="wave-text">
              <span>L</span> <span>O</span> <span>A</span> <span>D</span> <span>I</span> <span>N</span> <span>G</span> <span> . </span> <span>.</span> <span>.</span> 
              </h1>
            </div>
        </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                // Use the first item's product_image if available; otherwise, use default image.
                const orderImage =
                  order.items && order.items.length > 0 && order.items[0].product_image
                    ? order.items[0].product_image
                    : "/images/default.png";

                // Determine payment status text based on the boolean payment_status
                const paidStatus = order.payment_status ? "completed" : "pending";

                return (
                  <tr key={order.id}>
                    <td>
                      <img
                        src={
                          orderImage.startsWith("http")
                            ? orderImage
                            : `${orderImage}`
                        }
                        alt="Product"
                        className="order-image"
                      />
                    </td>
                    <td>{order.id}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>${order.total_price}</td>
                    <td>
                      <span className={`status paid ${paidStatus.toLowerCase()}`}>
                        {paidStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`status delivered ${order.delivery_status.toLowerCase()}`}>
                        {order.delivery_status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/admin/orders/${order.id}`}>
                        <button className="view-btn">
                          <FaEye />
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;

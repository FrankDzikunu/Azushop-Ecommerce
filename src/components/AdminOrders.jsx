import React from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import "./AdminOrders.css";

const orders = [
  {
    id: "6537b4b8fb1be49cc3f658",
    date: "2025-03-1",
    total: "$1250,00",
    paid: "completed",
    delivered: "Pending",
    image: "/images/macbook.png",
  },
  {
    id: "6537b4b8fb1be49cc3f658",
    date: "2025-03-1",
    total: "$1250,00",
    paid: "completed",
    delivered: "Delivered",
    image: "/images/macbook.png",
  },
  {
    id: "6537b4b8fb1be49cc3f658",
    date: "2025-03-1",
    total: "$1250,00",
    paid: "completed",
    delivered: "Pending",
    image: "/images/macbook.png",
  },
  {
    id: "6537b4b8fb1be49cc3f658",
    date: "2025-03-1",
    total: "$1250,00",
    paid: "completed",
    delivered: "Delivered",
    image: "/images/macbook.png",
  },
  {
    id: "6537b4b8fb1be49cc3f658",
    date: "2025-03-1",
    total: "$1250,00",
    paid: "completed",
    delivered: "Pending",
    image: "/images/macbook.png",
  },
  {
    id: "6537b4b8fb1be49cc3f658",
    date: "2025-03-1",
    total: "$1250,00",
    paid: "completed",
    delivered: "Pending",
    image: "/images/macbook.png",
  },
];

const AdminOrders = () => {
  return (
    <div className="admin-orders-container">
      <Link to="/" className="backbutton">← Back</Link>
      <div className="product-container1">
      <div className="admin-tabs">
            <h2 className="active-tab">Orders</h2>
        </div>
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
          {orders.map((order, index) => (
            <tr key={index}>
              <td>
                <img src={order.image} alt="Product" className="order-image" />
              </td>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td>
                <span className={`status paid ${order.paid.toLowerCase()}`}>
                  {order.paid}
                </span>
              </td>
              <td>
                <span className={`status delivered ${order.delivered.toLowerCase()}`}>
                  {order.delivered}
                </span>
              </td>
              <td>
                <Link to="/admin/orders/:id">
                <button className="view-btn">
                  <FaEye />
                </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AdminOrders;

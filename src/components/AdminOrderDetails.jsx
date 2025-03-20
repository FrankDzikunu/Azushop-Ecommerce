import React from "react";
import { Link } from "react-router-dom";
import "./AdminOrderDetails.css";

const order = {
  id: "6537b4b8fb1be49cc3f658",
  customer: {
    name: "John Doe",
    email: "Johndoe@gmail.com",
    address: "AK-1129-2289, GH",
    paymentMethod: "PayStack",
  },
  items: [
    {
      image: "/images/macbook.png",
      name: "Apple MacBook Pro 2019 | 16”",
      quantity: 1,
      unitPrice: 1250,
      total: 1250,
    },
    {
      image: "/images/iphone15.png",
      name: "iPhone 15",
      quantity: 1,
      unitPrice: 400,
      total: 400,
    },
    {
      image: "/images/macbook.png",
      name: "Apple MacBook Pro 2019 | 16”",
      quantity: 1,
      unitPrice: 300,
      total: 300,
    },
    {
      image: "/images/macbook.png",
      name: "Apple MacBook Pro 2019 | 16”",
      quantity: 1,
      unitPrice: 1250,
      total: 1250,
    },
  ],
  summary: {
    itemsTotal: 5000.0,
    shipping: 0,
    tax: 20,
    total: 52000.0,
  },
};

const AdminOrderDetails = () => {
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
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td><img src={item.image} alt={item.name} className="order-item-image" /></td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.unitPrice.toFixed(2)}</td>
                  <td>${item.total.toFixed(2)}</td>
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
            <p><strong>Name:</strong> {order.customer.name}</p>
            <p><strong>Email:</strong> {order.customer.email}</p>
            <p><strong>Order:</strong> {order.customer.address}</p>
            <p><strong>Method:</strong> {order.customer.paymentMethod}</p>
          </div>

          <div className="summary-info">
            <h3>Order Summary</h3>
            <p><strong>Items:</strong> ${order.summary.itemsTotal.toFixed(2)}</p>
            <p><strong>Shipping:</strong> ${order.summary.shipping.toFixed(2)}</p>
            <p><strong>Tax:</strong> ${order.summary.tax.toFixed(2)}</p>
            <p><strong>Total:</strong> ${order.summary.total.toFixed(2)}</p>
          </div>

          <button className="mark-delivered-btn">Mark as delivered</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminOrderDetails;

import React from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import "./AdminUsers.css";

const users = [
  {
    id: "6537b4b8fb1be49cc3f658",
    name: "John Doe",
    email: "johndoe@gmail.com",
    isAdmin: true,
  },
  {
    id: "6537b4b8fb1be49cc3f658",
    name: "User One",
    email: "userone@gmail.com",
    isAdmin: false,
  },
  {
    id: "6537b4b8fb1be49cc3f658",
    name: "User Two",
    email: "usertwogmail.com",
    isAdmin: false,
  },
  {
    id: "6537b4b8fb1be49cc3f658",
    name: "User Three",
    email: "userthree@gmail.com",
    isAdmin: false,
  },
  {
    id: "6537b4b8fb1be49cc3f658",
    name: "User Four",
    email: "userfour@gmail.com",
    isAdmin: false,
  },
  {
    id: "6537b4b8fb1be49cc3f658",
    name: "User Five",
    email: "userfive@gmail.com",
    isAdmin: false,
  },
];

const AdminUsers = () => {
  const handleEdit = (id) => {
    console.log("Edit user:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete user:", id);
  };

  return (
    <div className="admin-users-container">
      <Link to="/" className="backbutton">← Back</Link>
      <div className="product-container1">
      <div className="admin-tabs">
            <h2 className="active-tab">Users</h2>
        </div>
      
      <table className="users-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <FaCheck className="check-icon" />
                ) : (
                  <FaTimes className="cross-icon" />
                )}
              </td>
              <td className="actions">
                <button className="edit-btn" onClick={() => handleEdit(user.id)}>
                  <FaEdit />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AdminUsers;

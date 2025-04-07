import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import API from "../api";
import "./AdminUsers.css";


const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.access;
        const response = await API.get(`/api/users/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    window.location.href = `/admin/users/edit/${id}`;
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          const token = storedUser?.access;
          await API.delete(`/api/users/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsers(users.filter((user) => user.id !== id));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
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
            {users.map((user) => {
              // Check if the user is an admin by either "isAdmin" or "is_staff"
              const isUserAdmin = user.isAdmin || user.is_staff;
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {isUserAdmin ? (
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;

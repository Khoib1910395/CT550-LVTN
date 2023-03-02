import React from "react";
import { Link } from "react-router-dom";
import "./AdminScreen.css";

function AdminScreen() {
  return (
    <div className="admin-panel">
      <h1 className="admin-panel__title">Admin Panel</h1>
      <nav className="admin-panel__nav">
        <ul>
          <li>
            <Link to="/productlist">List Product</Link>
          </li>
          <li>
            <Link to="/addproduct">Add Product</Link>
          </li>
          <li>
            <Link to="/alluser">All User</Link>
          </li>
          <li>
            <Link to="/analytics">Analytics</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminScreen;

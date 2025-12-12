import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const role = user?.role;
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "12px 18px",
    textDecoration: "none",
    color: isActive ? "#1e88e5" : "#333",
    background: isActive ? "rgba(30,136,229,0.08)" : "transparent",
    borderLeft: isActive ? "4px solid #1e88e5" : "4px solid transparent",
    fontWeight: isActive ? 600 : 400,
  });

  // If not logged in redirect to landing
  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div style={{ width: 240, background: "#f6f7f8", paddingTop: 20, minHeight: "100vh", boxShadow: "2px 0 6px rgba(0,0,0,0.05)" }}>
      {(role === "master-admin") && (
        <NavLink to="/products" style={linkStyle}>Products</NavLink>
      )}

      {role === "master-admin" && (
        <NavLink to="/create-state-admin" style={linkStyle}>Create State Admin</NavLink>
      )}

      {(role === "state-admin") && (
        <NavLink to="/state-users" style={linkStyle}>Manage Users</NavLink>
      )}

      {(role === "user" || role === "master-admin" || role === "state-admin") && (
        <NavLink to="/compare" style={linkStyle}>Compare Products</NavLink>
      )}
    </div>
  );
};

export default Sidebar;

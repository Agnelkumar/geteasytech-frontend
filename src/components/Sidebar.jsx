import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("loggedUser") || localStorage.getItem("username") || null;
  let role = null;

  try {
    const u = JSON.parse(userStr || "null");
    role = u?.role || localStorage.getItem("role");
  } catch (e) {
    role = localStorage.getItem("role");
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <aside style={{ width: 240, background: "#f1f3f4", paddingTop: 20, minHeight: "100vh", boxShadow: "2px 0 6px rgba(0,0,0,0.04)" }}>

      <nav style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Product visible only to admin */}
        {role === "admin" && (
          <NavLink to="/product" style={({isActive}) => ({ padding: "10px 14px", color: isActive ? "#1e88e5" : "#333", textDecoration: "none", fontWeight: isActive ? "700" : "500" })}>
            Product
          </NavLink>
        )}

        {/* Compare visible to both roles */}
        <NavLink to="/compare" style={({isActive}) => ({ padding: "10px 14px", color: isActive ? "#1e88e5" : "#333", textDecoration: "none", fontWeight: isActive ? "700" : "500" })}>
          Compare
        </NavLink>

       {/* <div style={{ padding: "10px 14px", color: "#666", fontSize: 13 }}>
          {role ? `Logged as ${role}` : "Not logged"}
        </div>  */}

        {/* <button onClick={handleLogout} style={{ margin: 12, padding: "8px 12px", background: "#e53935", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Logout
        </button> */}
      </nav>
    </aside>
  );
};

export default Sidebar;

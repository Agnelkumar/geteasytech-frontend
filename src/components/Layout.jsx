import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();
    const userStr = localStorage.getItem("loggedUser") || localStorage.getItem("username") || null;
    let username = null;
  
    try {
      const u = JSON.parse(userStr || "null");
      username = u?.username || localStorage.getItem("username");
    } catch (e) {
        username = localStorage.getItem("username");
    }
  
const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
    };
    
  return (
    <div>
    <header className="header">
        <div style={{ fontFamily: 'Times New Roman', fontWeight: "bold", fontSize: '2rem' }}>GetEasyTech</div>
        <div style={{ fontFamily: 'Times New Roman', display: "flex", fontSize: "1.2rem", padding: "10px 10px", fontWeight: "normal", gap: "20px" }}>
          {username ? `${username}` : ""}
        
        <a
            style={{ backgroundColor: "#1864c4",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: "bold", padding: "3px" }}
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      </header>
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </main>
    </div>
    </div>
  );
};

export default Layout;

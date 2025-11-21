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
        <div style={{ fontWeight: "bold", fontSize: 20 }}>GetEasyTech</div>
        <div className={"pull-right"} style={{ padding: "10px 14px", color: "#fff", fontSize: 20 }}>
          {username ? `${username}` : ""}
        </div>
        <div>
        <a
            style={{ color: "#fff", cursor: "pointer" }}
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

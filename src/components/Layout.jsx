import React, {useState} from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const Layout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const [showProfile, setShowProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [password, setPassword] = useState("");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const updatePassword = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/change-password`,
        {
          username: user.username,
          newPassword: password
        }
      );

      alert("Password updated successfully!");
      setShowChangePassword(false);
      setPassword("");
    } catch (error) {
      alert("Failed to update password");
    }
  };

  return (
    <div>
      <style>{`body, html, #root { margin: 0; padding: 0;}`}</style>
      <header style={{ background: "#1e88e5", color: "#fff", padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "1.6rem", fontWeight: "700", fontFamily: "Times New Roman" }}>GetEasyTech</div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div onClick={() => setShowProfile((prev) => !prev)} style={{ fontFamily: "Times New Roman", background: "", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", color: "#fff", userSelect: "none" }}>{user?.username} / <span style={{ fontWeight: 700 }}>{user?.role}</span></div>
          <button onClick={logout} style={{ padding: "6px 12px", borderRadius: 6, background: "#d32f2f", color: "#fff", border: "none", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </header>

      {/* ---------------- PROFILE POPUP ---------------- */}
      {showProfile && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            right: "20px",
            width: "300px",
            background: "#fff",
            padding: 20,
            borderRadius: 8,
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            zIndex: 2000,
            textAlign: "center",
          }}
        >
          {/* Close Button */}
          <div style={{ textAlign: "right" }}>
            <button
              onClick={() => setShowProfile(false)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              ✖
            </button>
          </div>

          {/* Profile Icon */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            alt="Profile"
            width="80"
            style={{ marginBottom: 10 }}
          />

          {/* Username */}
          <h2 style={{ marginBottom: 5 }}>{user?.username}</h2>

          {/* Role */}
          <div style={{
            padding: "4px 10px",
            borderRadius: 6,
            marginBottom: 5,
            textAlign: "left",
          }}>
            Role: {user?.role}
          </div>

          {/* STATE */}
          {user?.state && (
            <div style={{
              padding: "4px 10px",
              borderRadius: 6,
              textAlign: "left",
              
            }}>
              State: {user.state}
            </div>
          )}

          {/* ADMIN NAME */}
          {user?.adminName && (
            <div style={{
              padding: "4px 10px",
              borderRadius: 6,
              background: "#ede7f6",
              display: "inline-block",
              marginTop: 5
            }}>
              Admin: {user.adminName}
            </div>
          )}

          {/* Change Password */}
          {!showChangePassword && (
            <button
              onClick={() => setShowChangePassword(true)}
              style={{
                marginTop: 20,
                width: "100%",
                padding: 10,
                background: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Change Password
            </button>
          )}

          {/* Change Password Form */}
          {showChangePassword && (
            <div style={{ marginTop: 20 }}>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: 10,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                }}
              />

              <button
                onClick={updatePassword}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "green",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Update Password
              </button>
            </div>
          )}
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: 20 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

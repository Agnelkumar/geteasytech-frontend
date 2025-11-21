import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  modalStyle,
  modalContentStyle,
  inputStyle,
  buttonStyle,
} from "../styles/modalStyles";

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("admin"); // admin OR user
  const [form, setForm] = useState({ username: "", email: "", mobileNumber: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          role: tab,   // admin or user
        })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
  
        navigate(tab === "admin" ? "/product" : "/compare");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Login error");
    }
  };
  

  const handleRegister = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: tab }), // admin or user
      });
  
      const data = await res.json();
      alert(data.message);
      setIsRegister(false);
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <>
      <header className="header">
        <div style={{ fontWeight: "bold", fontSize: 20 }}>GetEasyTech</div>
        <div>
          <a
            style={{ color: "#fff", cursor: "pointer" }}
            onClick={() => setShowModal(true)}
          >
            Login
          </a>
        </div>
      </header>

      <div className="container">
        <div className="card">
          <h1>Welcome to GetEasyTech</h1>
          <p>Your one-stop hub for all things tech — simple, fast, and easy.</p>
        </div>
      </div>

      {/* ==================================================== */}
      {/* POPUP LOGIN / REGISTER */}
      {/* ==================================================== */}
      {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <button
              onClick={() => {
                setShowModal(false);
                setIsRegister(false);
                setForm({ username: "", mobileNumber: "", email: "", password: "" });
              }}
              style={{ float: "right" }}
            >
              ×
            </button>

            <h3>{isRegister ? "Register" : "Quick Login"}</h3>

            {/* ------------------- ROLE TABS ------------------- */}
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <div
                onClick={() => setTab("admin")}
                style={{
                  padding: 8,
                  background: tab === "admin" ? "#ddd" : "#f3f3f3",
                  cursor: "pointer",
                  borderRadius: 6,
                }}
              >
                Admin
              </div>
              <div
                onClick={() => setTab("user")}
                style={{
                  padding: 8,
                  background: tab === "user" ? "#ddd" : "#f3f3f3",
                  cursor: "pointer",
                  borderRadius: 6,
                }}
              >
                User
              </div>
            </div>

            {/* ------------------- FORM ------------------------- */}
            <div style={{ marginTop: 12 }}>
              {/* Username / Email */}
              <input
                style={inputStyle}
                placeholder={ "Username"}
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />

              {/* Email only for register */}
              {isRegister && (
                <input
                  style={inputStyle}
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              )}


              {/* MobileNumber */}
              {isRegister && (
              <input
                style={inputStyle}
                type="text"
                placeholder="Mobile Number"
                value={form.mobileNumber}
                onChange={(e) =>
                  setForm({ ...form, mobileNumber: e.target.value })
                }
              />
              )}

              {/* Password */}
              <input
                style={inputStyle}
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              {/* Error */}
              {error && (
                <p style={{ color: "red", marginTop: 4 }}>{error}</p>
              )}

              {/* BUTTONS */}
              <div style={{ marginTop: 10 }}>
                {!isRegister ? (
                  <button style={buttonStyle} onClick={handleLogin}>
                    Login
                  </button>
                ) : (
                  <button style={buttonStyle} onClick={handleRegister}>
                    Register
                  </button>
                )}
              </div>

              {/* SWITCH LOGIN/REGISTER */}
              <p style={{ marginTop: 12 }}>
                {!isRegister ? (
                  <a
                    onClick={() => setIsRegister(true)}
                    style={{ color: "#1e88e5", cursor: "pointer" }}
                  >
                    Register
                  </a>
                ) : (
                  <a
                    onClick={() => setIsRegister(false)}
                    style={{ color: "#1e88e5", cursor: "pointer" }}
                  >
                    Back to Login
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;

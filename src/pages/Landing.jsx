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
        <div style={{ fontFamily: 'Times New Roman', fontWeight: "bold", fontSize: '2rem' }}>GetEasyTech</div>
        <div>
          <a
            style={{ color: "#fff", cursor: "pointer", fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}
            onClick={() => setShowModal(true)}
          >
            Login
          </a>
        </div>
      </header>

      <div className="container" style={{ fontFamily: 'Times New Roman', padding: '2rem', textAlign: 'center' }}>
          <h1>Welcome to GetEasyTech</h1>
          <p>Your one-stop hub for all things tech — simple, fast, and easy.</p>
      </div>

      {/* ==================================================== */}
      {/* POPUP LOGIN / REGISTER */}
      {/* ==================================================== */}
      {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
          <div style={{ textAlign: 'right', cursor: 'pointer', background: '#1e88e5', overflow: "hidden", WebkitBorderTopRightRadius: '8px', WebkitBorderTopLeftRadius: '8px' }} onClick={() => setShowModal(false)}>&times;</div>
          {/*  <button
              onClick={() => {
                setShowModal(false);
                setIsRegister(false);
                setForm({ username: "", mobileNumber: "", email: "", password: "" });
              }}
              style={{ float: "right" }}
            >
              ×
            </button> */}

          { /* {isRegister ? "Register" : "Quick Login"

            {/* ------------------- ROLE TABS ------------------- */}
            <div style={{ display: "flex" }}>
              <div onClick={() => setTab("admin")} style={{ flex: 1, textAlign: 'center', padding: 10, background: tab === 'admin' ? 'rgba(0, 0, 0, 0.3)' : '#f0f0f0', cursor: 'pointer', fontFamily: 'Times New Roman' }} >
                Admin
              </div>
              <div onClick={() => setTab("user")} style={{ flex: 1, textAlign: 'center', padding: 10, background: tab === 'user' ? 'rgba(0,0,0,0.3)' : '#f0f0f0', cursor: 'pointer', fontFamily: 'Times New Roman' }} >
                User
              </div>
            </div>

            {/* ------------------- FORM ------------------------- */}
            <div style={{ marginTop: 30, boxSizing: "border-box" }}>
              {/* Username / Email */}
              <input
                style={inputStyle}
                placeholder={ "👤 Username"}
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
                  placeholder="📧 Email"
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
                placeholder="📱 Mobile Number"
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
                placeholder="🔒 Password"
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
              <div style={{ marginTop: 20, marginLeft: 140, width: "90%" }}>
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
              <p style={{ marginTop: 12, marginLeft: 145, marginBottom: 40 }}>
                {!isRegister ? (
                  <a onClick={() => setIsRegister(true)} style={{ color: "#1e88e5", cursor: "pointer" }} >
                    Register here
                  </a>
                ) : (
                  <a onClick={() => setIsRegister(false)} style={{ color: "#1e88e5", cursor: "pointer" }} >
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

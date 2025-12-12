// src/pages/Landing.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { modalStyle, modalContentStyle, inputStyle, buttonStyle } from "../styles/modalStyles";

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("admin"); // admin OR user
  const [form, setForm] = useState({ username: "", email: "", mobileNumber: "", password: "", state: "" });
  const [isRegister] = useState(false);
  const [error, ] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/users/login", { username: form.username, password: form.password, role: tab === "admin" ? undefined : undefined });
      const data = res.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
      localStorage.setItem("state", data.state || "");
      localStorage.setItem("loggedUser", JSON.stringify({ username: data.username, email: data.email, role: data.role, state: data.state }));

      if (data.role === "master-admin") navigate("/create-state-admin"); else if ((data.role === "admin" || data.role === "state-admin")) navigate("/state-users");
      else navigate("/compare");
    } catch (err) {
      console.error(err);
      alert("Login failed: " + err.response?.data?.message);
    }
  };

  return (
    <>
    <style>{`body, html, #root { margin: 0; padding: 0;}`}</style>
      <header style={{background: '#1e88e5', color: '#fff', padding: '8px 16px', display: 'flex', justifyContent: 'space-between',}}>
        <div style={{ fontWeight: 'bold', fontSize: '2rem' }}>GetEasyTech</div>
        <nav><button style={{ color: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: "none", border: "none" }} onClick={() => setShowModal(true)}>Login</button></nav>
      </header>

      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Welcome to GetEasyTech</h1>
        <p>Your one-stop hub for all things tech — simple, fast, and easy.</p>
      </div>

      {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
          <div style={{ textAlign: 'right', cursor: 'pointer', background: '#1e88e5', borderTopRightRadius: "8px", borderTopLeftRadius: "8px" }} onClick={() => setShowModal(false)}>&times;</div>
            <div style={{ display: "flex",  }}>
              <div onClick={() => setTab("admin")} style={{ flex: 1, padding: 10, textAlign: "center", cursor: "pointer", background: tab === "admin" ? "#ddd" : "#f7f7f7", fontFamily: "Times New Roman" }}>Admin</div>
              <div onClick={() => setTab("user")} style={{ flex: 1, padding: 10, textAlign: "center", cursor: "pointer", background: tab === "user" ? "#ddd" : "#f7f7f7", fontFamily: "Times New Roman" }}>User</div>
            </div>

            <div style={{ padding: 16 }}>
              <input style={inputStyle} placeholder="👤 Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              {isRegister && <input style={inputStyle} placeholder="📧 Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />}
              {isRegister && <input style={inputStyle} placeholder="📱 Mobile number" value={form.mobileNumber} onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })} />}
              {isRegister && <input style={inputStyle} placeholder="📍State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />}
              <input style={inputStyle} type="password" placeholder="🔒 Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {error && <div style={{ color: "red" }}>{error}</div>}

              <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
                {!isRegister ? (
                  <button style={buttonStyle} onClick={handleLogin}>Login</button>
                ) : ("")
                  }
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;

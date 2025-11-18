import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { modalStyle, modalContentStyle, inputStyle, buttonStyle } from '../styles/modalStyles';

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState('admin');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const users = JSON.parse(localStorage.getItem('users') || '[]');

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
  
        navigate(tab === "admin" ? "/admin" : "/user");
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
      <header style={{ background: '#1e88e5', color: '#fff', padding: '8px 16px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 'bold', fontSize: '2rem' }}>GetEasyTech</div>
        <nav><a style={{ color: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }} onClick={() => setShowModal(true)}>Login</a></nav>
      </header>
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome to GetEasyTech</h1>
        <p>Your one-stop hub for all things tech — simple, fast, and easy.</p>
      </main>
      {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <div style={{ textAlign: 'right', cursor: 'pointer', background: '#1e88e5' }} onClick={() => setShowModal(false)}>&times;</div>
            {!isRegister ? (
              <>
                <div style={{ display: 'flex' }}>
                  <div onClick={() => setTab('admin')} style={{ flex: 1, textAlign: 'center', padding: 10, background: tab === 'admin' ? 'rgba(0, 0, 0, 0.3)' : '#f0f0f0', cursor: 'pointer' }}>Admin</div>
                  <div onClick={() => setTab('user')} style={{ flex: 1, textAlign: 'center', padding: 10, background: tab === 'user' ? 'rgba(0,0,0,0.3)' : '#f0f0f0', cursor: 'pointer' }}>User</div>
                </div>
                <div style={{ padding: 20, width: '150%' }}>
                  <input style={inputStyle} placeholder="👤 Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
                  <input type="password" style={inputStyle} placeholder="🔒 Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                  <div style={{marginLeft: '100px'}}><button style={buttonStyle} onClick={handleLogin}>Login</button></div>
                  <div><p style={{ marginTop: 10, marginLeft: '128px' }}>
                    <a onClick={() => setIsRegister(true)} style={{ color: '#1e88e5', cursor: 'pointer' }}>Register here</a>
                  </p></div>
                </div>
              </>
            ) : (
              <div style={{ padding: 20, width: '150%' }}>
                <input style={inputStyle} placeholder="👤 Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <input style={inputStyle} placeholder="📧 Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" style={inputStyle} placeholder="🔒 Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <div style={{marginLeft: '100px'}}><button style={buttonStyle} onClick={handleRegister}>Register</button>
                <p style={{ marginTop: 10, marginLeft: '28px' }}>
                  <a onClick={() => setIsRegister(false)} style={{ color: '#1e88e5', cursor: 'pointer' }}>Back to Login</a>
                </p></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;

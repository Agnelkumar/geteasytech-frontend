import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === form.email && u.password === form.password);
    if (!found) return setError("Invalid Email or Password");
    localStorage.setItem("loggedUser", JSON.stringify(found));
    localStorage.setItem("role", found.role || "user");
    if (found.role === "admin") nav("/product");
    else nav("/compare");
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p style={{ marginTop: 10 }}>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;

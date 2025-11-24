import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(u => u.email === form.email)) return setError("Email already exists");
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    nav("/login");
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {error && <p className="error">{error}</p>}
          <button type="submit">Register</button>
        </form>
        <p style={{ marginTop: 10 }}>Already registered? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;

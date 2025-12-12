// src/pages/userManagement/AddSingleUser.jsx
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddSingleUser = ({closeForm}) => {
  const { area } = useParams();
  const [form, setForm] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    state: "",
    password: "",
  });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        { ...form }
      );
  
      alert(res.data.message || "User created!");
  
      setForm({
        username: "",
        email: "",
        mobileNumber: "",
        state: "",
        password: ""
      });
      closeForm();  
  
    } catch (err) {
      console.error("Registration failed:", err);
  
      // Check if server sent message
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong! Please try again.";
  
      alert(message);
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", width: "50%"}}>
      <h2>Add Single User – {area}</h2>

      <input style={{padding: "10px", margin: "10px"}} name="username" placeholder="Username" onChange={change} value={form.username} />
      <input style={{padding: "10px", margin: "10px"}} name="email" placeholder="Email" onChange={change} value={form.email} />
      <input style={{padding: "10px", margin: "10px"}} name="mobileNumber" placeholder="Mobile Number" onChange={change} value={form.mobileNumber} />
      <input style={{padding: "10px", margin: "10px"}} name="state" placeholder="State" onChange={change} value={form.state} />
      <input style={{padding: "10px", margin: "10px"}} name="password" placeholder="Password" onChange={change} value={form.password} />

      <button style={{padding: "10px", width: "25%", border: "none", background: "rgb(30, 136, 229)", color: "white", marginLeft: "35%"}} onClick={submit}>Create</button>
    </div>
  );
};

export default AddSingleUser;

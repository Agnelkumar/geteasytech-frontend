// src/pages/userManagement/DeleteSingleUser.jsx
import React, { useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";

const DeleteSingleUser = ({closeForm}) => {
  const { area } = useParams();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const search = async () => {
    try {
      const res = await api.get(`/users/find/${username}`);
      setUser(res.data);
    } catch (err) {
      alert("Not found");
    }
  };

  const remove = async () => {
    try {
      await api.delete(`/users/delete/${username}`);
      alert("Deleted");
      setUser(null);
      closeForm();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Search & Delete — {area}</h2>
      <input style={{ padding: "10px",}} placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      <button  style={{marginLeft: "20px", fontWeight: "2rem", padding: "10px 12px", background: "#1e88e5", border: "none", borderRadius: 4}}onClick={search}>Search</button>

      {user && (
        <div style={{ marginTop: 20 }}>
          <p><b>Username:</b> {user.username}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Mobile:</b> {user.mobileNumber}</p>
          <button onClick={remove}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default DeleteSingleUser;

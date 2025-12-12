import React, { useEffect, useState } from "react";
import AddSingleUser from "./userManagement/AddSingleUser";
import AddBulkUser from "./userManagement/AddBulkUsers";
import DeleteSingleUser from "./userManagement/DeleteSingleUser";
import DeleteBulkUser from "./userManagement/DeleteBulkUsers";
import DownloadUser from "./userManagement/DownloadUsers";
import axios from "axios";

const StateAdminPage = () => {
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [activeComponent, setActiveComponent] = useState(null);

  // Logged-in state admin
  const adminState = localStorage.getItem("state");

      useEffect(() => {
        fetchUsers();
      }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/users-by-state?state=${adminState}`
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

return (
  <div style={{ padding: 20 }}>

    <h2>State Admin Pannel</h2>
    <p>State: <b>{adminState}</b></p>

    {/* -------- DROPDOWN SECTION -------- */}
    <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>

      {/* --- ADD USER --- */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => { setOpenAdd(!openAdd); setOpenDelete(false);}}
          style={{ padding: "8px 14px", background: "#1e88e5", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer",}}>
          Add User ▼
        </button>

        {openAdd && (
          <div style={{ position: "absolute", top: "40px", left: 0, background: "#fff", border: "1px solid #ddd", borderRadius: 6, padding: 10, width: 180, zIndex: 100, }}>
            <div onClick={() => {setActiveComponent("addSingle"); setOpenAdd(false);}} style={{ display: "block", padding: 8, cursor: "pointer" }}>
              ➤ Add Single User
            </div>

            <div onClick={() => { setActiveComponent("addBulk"); setOpenAdd(false);}} style={{ display: "block", padding: 8, cursor: "pointer" }}>
              ➤ Add Bulk Users
            </div>
          </div>
        )}
      </div>

      {/* --- DELETE USER --- */}
      <div style={{ position: "relative" }}>
        <button onClick={() => { setOpenDelete(!openDelete); setOpenAdd(false);}}
          style={{ padding: "8px 14px", background: "#e53935", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", }}>
          Delete User ▼
        </button>

        {openDelete && (
          <div style={{ position: "absolute", top: "40px", left: 0, background: "#fff", border: "1px solid #ddd", borderRadius: 6, padding: 10, width: 180, zIndex: 100, }}>
            <div onClick={() => setActiveComponent("deleteSingle")} style={{ display: "block", padding: 8, cursor: "pointer" }}>
              ➤ Delete Single User
            </div>
            <div onClick={() => setActiveComponent("deleteBulk")} style={{ display: "block", padding: 8, cursor: "pointer" }}>
              ➤ Delete Bulk Users
            </div>
          </div>
        )}
      </div>

      {/* --- DOWNLOAD USER --- */}
      <div style={{ position: "relative" }}>
      <button onClick={() => setActiveComponent("download")}
       style={{ padding: "8px 14px", background: "#43a047", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", }}>
       ➤ Download Users
      </button>
      </div>


    </div>

    <div style={{ marginTop: 30 }}>
      {activeComponent === "addSingle" && (<AddSingleUser closeForm={() => setActiveComponent(null)} />)}
      {activeComponent === "addBulk" && (<AddBulkUser closeForm={() => setActiveComponent(null)} />)}
      {activeComponent === "deleteSingle" && (<DeleteSingleUser closeForm={() => setActiveComponent(null)} /> )}
      {activeComponent === "deleteBulk" && (<DeleteBulkUser closeForm={() => setActiveComponent(null)} />)}
      {activeComponent === "download" && (<DownloadUser closeForm={() => setActiveComponent(null)} />)}
    </div>
    <div>
    {/* ---------------- USER LIST ---------------- */}
    <h3 style={{ marginTop: 40 }}>Users in Your State</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 10,
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Phone</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>State</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>{u.username}</td>
              <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>{u.email}</td>
              <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>{u.mobileNumber}</td>
              <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>{u.state}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

    {/* -------- USER LIST -------- */}
    {/*<h3>Users List</h3>
    {users.map((u) => (
      <div key={u._id}
        style={{ padding: 10, borderBottom: "1px solid #eee", fontSize: 15,}}>
        <strong>{u.username}</strong> — {u.email}
      </div>
    ))}*/}
  </div>
);
};

export default StateAdminPage;

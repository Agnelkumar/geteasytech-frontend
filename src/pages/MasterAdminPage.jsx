import React, { useEffect, useState, useCallback } from "react";
//import { registerStateAdmin, } from "../services/api";
import axios from "axios";
import AddSingleUser from "./userManagement/AddSingleUser";
import AddBulkUser from "./userManagement/AddBulkUsers";
import DeleteSingleUser from "./userManagement/DeleteSingleUser";
import DeleteBulkUser from "./userManagement/DeleteBulkUsers";
import DownloadUser from "./userManagement/DownloadUsers";

const MasterAdminPage = () => {
 //const [form, setForm] = useState({ username: "", email: "", state: "", password: "" });

 const [showAdminForm, setShowAdminForm] = useState(true);
 const [form, setForm] = useState({});
  
  // ---- User List States ----
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [adminList, setAdminList] = useState([]);
  const [adminPage, setAdminPage] = useState(1);
  const [adminTotalPages, setAdminTotalPages] = useState(1);
  const [adminSearch, setAdminSearch] = useState("");

  const [activeComponent, setActiveComponent] = useState(null);
  const adminState = localStorage.getItem("state");

  // Fetch Users
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/filtered-users`,
        { params: { page, limit, search } }
      );

      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    }
  }, [page, limit, search]);

  // Fetch when page or search changes
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createStateAdmin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/create-state-admin`,
        {
          username: form.username,
          email: form.email,
          mobileNumber: form.mobileNumber,  //  FIX 👈
          state: form.state,
          password: form.password
        }
      );
  
      alert("State Admin Created Successfully!");
  
      setForm({});
      setShowAdminForm(false);
  
    } catch (err) {
      console.error(err);
      alert("Error creating state admin");
    }
  };  

  const fetchStateAdmins = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/state-admins`,
        { params: { page: adminPage, limit, search: adminSearch } }
      );
  
      setAdminList(res.data.admins);
      setAdminTotalPages(res.data.totalPages);
  
    } catch (err) {
      console.error(err);
      alert("Failed to fetch state admin list");
    }
  }, [adminPage, adminSearch, limit]);

  useEffect(() => {
    fetchStateAdmins();
  }, [fetchStateAdmins]);
    

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>State: <b>{adminState}</b></p>

      {/* -------- DROPDOWN SECTION -------- */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>

      <button onClick={() => setShowAdminForm(!showAdminForm)}
         style={{ padding: "8px 14px", background: "#1e88e5", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", }}>
            Create State Admin
      </button>

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

      <div style={{ marginTop: 10 }}>
              {activeComponent === "addSingle" && (<AddSingleUser closeForm={() => setActiveComponent(null)} />)}
              {activeComponent === "addBulk" && (<AddBulkUser closeForm={() => setActiveComponent(null)} />)}
              {activeComponent === "deleteSingle" && (<DeleteSingleUser closeForm={() => setActiveComponent(null)} /> )}
              {activeComponent === "deleteBulk" && (<DeleteBulkUser closeForm={() => setActiveComponent(null)} />)}
              {activeComponent === "download" && (<DownloadUser closeForm={() => setActiveComponent(null)} />)}
        </div>

      {showAdminForm && (
          <div style={{ marginTop: 20, }}>
            <h3>Create State Admin</h3>

            <form onSubmit={createStateAdmin}
              style={{ display: "flex", flexDirection: "column", padding: "20px", marginTop: 10, maxWidth: 400, width: "50%" }}>
              <input style={{padding: "8px", margin: "8px"}} type="text" placeholder="Username" required value={form.username || ""} onChange={(e) => setForm({ ...form, username: e.target.value })}/>
              <input style={{padding: "8px", margin: "8px"}} type="email" placeholder="Mail ID" required value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
              <input style={{padding: "8px", margin: "8px"}} type="text" placeholder="Mobile Number" required value={form.mobileNumber || ""} onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}/>
              <input style={{padding: "8px", margin: "8px"}} type="text" placeholder="State" required value={form.state || ""} onChange={(e) => setForm({ ...form, state: e.target.value })}/>
              <input style={{padding: "8px", margin: "8px"}} type="password" placeholder="Password" required value={form.password || ""} onChange={(e) => setForm({ ...form, password: e.target.value })}/>
              <button type="submit" style={{ padding: "8px", background: "rgb(30, 136, 229)", color: "#fff", border: "none", borderRadius: 6, width: 75, marginLeft: 150 }}>
               Create
              </button>
            </form>
          </div>
        )}

      {/*<div style={{ maxWidth: 500 }}>
        <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <button onClick={submit} style={{ padding: "8px 12px", background: "#1e88e5", color: "#fff", border: "none", borderRadius: 6 }}>Create</button>
      </div>*/}
      
      <hr style={{ margin: "30px 0" }} />
        <h3>State Admin List</h3>

        {/* Search Bar */}
        <input placeholder="Search admin by username or email..." value={adminSearch}
          onChange={(e) => { setAdminSearch(e.target.value); setAdminPage(1); }}
          style={{ width: 300, padding: 8, marginBottom: 20, fontSize: 16 }}
        />

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>Mobile Number</th>
              <th style={{ border: "1px solid #ddd", padding: 8 }}>State</th>
            </tr>
          </thead>

          <tbody>
            {adminList.map((a, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>{a.username}</td>
                <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>{a.email}</td>
                <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>{a.mobileNumber}</td>
                <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>{a.state}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <button
            disabled={adminPage === 1}
            onClick={() => setAdminPage(adminPage - 1)}
            style={{ padding: "6px 12px", cursor: adminPage === 1 ? "not-allowed" : "pointer" }}
          >
            ◀ Previous
          </button>

          <div style={{ padding: "6px 12px" }}>
            Page {adminPage} of {adminTotalPages}
          </div>

          <button
            disabled={adminPage === adminTotalPages}
            onClick={() => setAdminPage(adminPage + 1)}
            style={{ padding: "6px 12px", cursor: adminPage === adminTotalPages ? "not-allowed" : "pointer" }}
          >
            Next ▶
          </button>
        </div>

      <hr style={{ margin: "20px 0" }} />
      <h3>Users List</h3>

      {/* Search Bar */}
      <input placeholder="Search by username or email..." value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1);}}
        style={{ width: 300, padding: 8, marginBottom: 20, fontSize: 16}}
        />

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10, }}>
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

      {/* Pagination Controls */}
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={{
            padding: "6px 12px",
            cursor: page === 1 ? "not-allowed" : "pointer"
          }}
        >
          ◀ Previous
        </button>

        <div style={{ padding: "6px 12px" }}>
          Page {page} of {totalPages}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={{
            padding: "6px 12px",
            cursor: page === totalPages ? "not-allowed" : "pointer"
          }}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default MasterAdminPage;

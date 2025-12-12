// src/pages/userManagement/AddBulkUsers.jsx
import React, { useState } from "react";
import * as XLSX from "xlsx";
import api from "../../services/api";
import { saveAs } from "file-saver";
import { useParams } from "react-router-dom";

const AddBulkUsers = ({closeForm}) => {
  const { area } = useParams();
  const [rows, setRows] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // NEW: store actual file

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file); // store file so we can send it to backend

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsed = XLSX.utils.sheet_to_json(sheet);
      // attach state if not present
      const withState = parsed.map(r => ({ ...r, state: area }));
      setRows(withState);
    };
    reader.readAsArrayBuffer(file);
  };

  const upload = async () => {
    if (!selectedFile) return alert("Please choose a file to upload");
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const res = await api.post("/users/bulk-create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",});
      saveAs(res.data, "created_users.csv");
      alert("Bulk users created");
      closeForm();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: 25 }}>
      <h2>Bulk Upload — {area}</h2> 
      <div style={{display: "flex"}}><input type="file" accept=".xlsx,.xls" onChange={handleFile} />
      <a href={`${process.env.REACT_APP_API_URL}/users/csv`} download>Download Template</a></div>
      <br /><br />
      <button onClick={upload}>Upload</button>
    </div>
  );
};

export default AddBulkUsers;

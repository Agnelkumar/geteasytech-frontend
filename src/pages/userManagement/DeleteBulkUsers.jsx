// src/pages/userManagement/DeleteBulkUsers.jsx
import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { useParams } from "react-router-dom";

const DeleteBulkUsers = ({closeForm}) => {
  const { area } = useParams();
  const [rows, setRows] = useState([]);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      setRows(json);
    };

    reader.readAsBinaryString(file);
  };

  const deleteUsers = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/bulk-delete`,
      rows
    );
    alert("Users deleted!");
    closeForm();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Bulk Delete – {area}</h2>

      <input type="file" accept=".xlsx, .xls" onChange={uploadFile} />
      <a href={`${process.env.REACT_APP_API_URL}/users/delete-template`} download>
        Download Delete Template
      </a>

      <br /><br />

      <button onClick={deleteUsers}>Delete Users</button>
    </div>
  );
};

export default DeleteBulkUsers;

import React from "react";

const ProductTable = ({ products = [], onEdit, onDelete }) => (
  <ul style={{ marginTop: 18 }}>
    {products.map(p => (
      <li key={p._id} style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <strong>{p.productName}</strong> — ₹{p.price}
        </div>

        <button onClick={() => onEdit(p)} style={{ backgroundColor: "#1e88e5", color:"#fff", padding:"6px 12px", borderRadius:4, border:"none", cursor: "pointer" }}>
          Modify
        </button>

        <button onClick={() => onDelete(p._id)} style={{ backgroundColor: "#e53935", color:"#fff", padding:"6px 12px", borderRadius:4, border:"none", cursor: "pointer" }}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default ProductTable;

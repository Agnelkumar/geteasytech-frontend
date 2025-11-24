import React from "react";

const ProductTable = ({ products, onEdit, onDelete }) => (
  <ul>
    {products.map(p => (
      <li key={p._id} style={{ marginBottom: 10 }}>
        {p.productName} - ₹{p.price}
        <button onClick={() => onEdit(p)} style={{ marginLeft: 20, backgroundColor: "#1e88e5", color:"#fff", padding:"6px 12px", borderRadius:4, border:"none" }}>Modify</button>
        <button onClick={() => onDelete(p._id)} style={{ marginLeft: 10, backgroundColor: "#e53935", color:"#fff", padding:"6px 12px", borderRadius:4, border:"none" }}>Delete</button>
      </li>
    ))}
  </ul>
);

export default ProductTable;

import React from "react";
import { inputStyle, buttonStyle, btnStyle } from "../styles/modalStyles";

const fields = [
  "Product Name","Main Camera","Secondary Camera","Front Camera",
  "Display","Additional","Processor","Battery","Fingerprint","Protection Glass","Variants","Price"
];

const ProductForm = ({ form, setForm, onSubmit, onCancel, editing }) => {
  return (
    <div>
      {fields.map(f => (
        <input
          key={f}
          placeholder={f}
          style={inputStyle}
          value={form[f] || ""}
          onChange={(e) => setForm({ ...form, [f]: e.target.value })}
        />
      ))}

      <div style={{ display: "flex", gap: 10, marginLeft: 180 }}>
        <button style={buttonStyle} onClick={onSubmit}>{editing ? "Update Product" : "Submit Product"}</button>
        {editing && <button style={btnStyle} onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
};

export default ProductForm;

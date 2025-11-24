import React from "react";
import { inputStyle, buttonStyle, btnStyle, productStyle } from "../styles/modalStyles";

const fields = [
  "Product Name","Main Camera","Secondary Camera","Front Camera",
  "Display","Additional","Processor","Battery","Fingerprint","Protection Glass","Variants","Price"
];

const ProductForm = ({ form, setForm, onSubmit, onCancel, editing }) => {
  return (
    <div>
      <div>
      {fields.map(f => (
        <input 
          key={f}
          placeholder={f}
          style={productStyle}
          value={form[f] || ""}
          onChange={(e) => setForm({ ...form, [f]: e.target.value })}
        />
      ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginLeft: "30%" }}>
        <button style={buttonStyle} onClick={onSubmit}>{editing ? "Update Product" : "Submit Product"}</button></div>
        <div style={{display: "flex", margin: "5px 36%", padding: "5px"}}>{editing && <button style={btnStyle} onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
};

export default ProductForm;

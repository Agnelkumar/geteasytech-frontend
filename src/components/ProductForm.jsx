import React from "react";

const fields = [
  "Product Name","Main Camera","Secondary Camera","Front Camera",
  "Display","IP Rating","Additional", "Operating System", "Performance","Battery","Fingerprint","Protection Glass","Variants","Price"
];

const ProductForm = ({ form, setForm, onSubmit, onCancel, editing }) => {
  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, }}>
        {fields.map(f => (
          <input
            key={f}
            placeholder={f}
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ddd", width: "90%" }}
            value={form[f] || ""}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button onClick={onSubmit} style={{ padding: "10px 16px", borderRadius: 6, background: "#1e88e5", color: "#fff", border: "none", marginLeft: "42%" }}>
          {editing ? "Update Product" : "Submit Product"}
        </button>

        {editing && (
          <button onClick={onCancel} style={{ padding: "10px 16px", borderRadius: 6, background: "#e53935", color: "#fff", border: "none" }}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductForm;

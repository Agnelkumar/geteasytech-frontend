import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

const mapToForm = (p) => ({
  "Product Name": p.productName || "",
  "Main Camera": p.mainCamera || "",
  "Secondary Camera": p.secondaryCamera || "",
  "Front Camera": p.frontCamera || "",
  Display: p.display || "",
  Additional: p.additional || "",
  Processor: p.processor || "",
  Battery: p.battery || "",
  Fingerprint: p.fingerprint || "",
  "Protection Glass": p.protectionGlass || "",
  Variants: p.variants || "",
  Price: p.price || ""
});

const payload = (f) => ({
  productName: f["Product Name"],
  mainCamera: f["Main Camera"],
  secondaryCamera: f["Secondary Camera"],
  frontCamera: f["Front Camera"],
  display: f["Display"],
  additional: f["Additional"],
  processor: f["Processor"],
  battery: f["Battery"],
  fingerprint: f["Fingerprint"],
  protectionGlass: f["Protection Glass"],
  variants: f["Variants"],
  price: f["Price"]
});

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  // ----- Custom Delete Confirmation -----
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    id: null,
  });

  const requestDelete = (id) => {
    setDeleteConfirm({ show: true, id });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${deleteConfirm.id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
    setDeleteConfirm({ show: false, id: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, id: null });
  };
  // ---------------------------------------

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async () => {
    const name = form["Product Name"], price = form["Price"];
    if (!name || !price) return alert("Please fill Product Name and Price");
    try {
      const pl = payload(form);
      if (editingId) await api.put(`/products/${editingId}`, pl);
      else await api.post("/products", pl);
      setForm({}); 
      setEditingId(null); 
      fetchProducts();
    } catch (err) { 
      console.error(err); 
      alert("Error saving"); 
    }
  };

  const handleEdit = (p) => {
    setForm(mapToForm(p)); 
    setEditingId(p._id);
  };

  return (
    <div>
      <h1 style={{margin: "20px 5%", fontSize: "1.5rem", fontFamily: "Times New Roman"}}>Add Product</h1>

      <ProductForm 
        form={form} 
        setForm={setForm} 
        onSubmit={handleSubmit}
        onCancel={() => { setForm({}); setEditingId(null); }} 
        editing={!!editingId} 
      />

      <hr />

      <ProductTable 
        products={products} 
        onEdit={handleEdit} 
        onDelete={requestDelete} 
      />

      {/* ---------- Custom Confirm Modal ---------- */}
      {deleteConfirm.show && (
        <div style={modalBackdrop}>
          <div style={modalBox}>
            <h3>Delete Product?</h3>
            <p>Are you sure you want to delete this product?</p>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button style={confirmBtn} onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button style={cancelBtn} onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ----------------------------------------- */}
    </div>
  );
};

export default ProductPage;


// ---------------- Modal Inline Styles ----------------

const modalBackdrop = {
  position: "fixed",
  top: 0, left: 0,
  width: "100%", height: "100%",
  backgroundColor: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalBox = {
  background: "#fff",
  padding: "25px",
  borderRadius: "8px",
  minWidth: "300px",
  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
  textAlign: "center"
};

const confirmBtn = {
  padding: "8px 16px",
  background: "#d9534f",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const cancelBtn = {
  padding: "8px 16px",
  background: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

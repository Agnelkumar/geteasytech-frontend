import React, { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/api";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!form["Product Name"] || !form["Price"]) return alert("Please provide product name and price");

    const payload = {
      productName: form["Product Name"],
      mainCamera: form["Main Camera"],
      secondaryCamera: form["Secondary Camera"],
      frontCamera: form["Front Camera"],
      display: form["Display"],
      ipRating: form["IP Rating"],
      additional: form["Additional"],
      performance: form["Performance"],
      battery: form["Battery"],
      fingerprint: form["Fingerprint"],
      protectionGlass: form["Protection Glass"],
      variants: form["Variants"],
      price: form["Price"],
    };

    try {
      if (editingId) await updateProduct(editingId, payload);
      else await createProduct(payload);
      setForm({});
      setEditingId(null);
      load();
      alert("Saved");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Save failed");
    }
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setForm({
      "Product Name": p.productName || "",
      "Main Camera": p.mainCamera || "",
      "Secondary Camera": p.secondaryCamera || "",
      "Front Camera": p.frontCamera || "",
      "Display": p.display || "",
      "IP Rating": p.ipRating || "",
      "Additional": p.additional || "",
      "Operating System": p.operatingSystem || "",
      "Performance": p.performance || "",
      "Battery": p.battery || "",
      "Fingerprint": p.fingerprint || "",
      "Protection Glass": p.protectionGlass || "",
      "Variants": p.variants || "",
      "Price": p.price || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    try {
      await deleteProduct(id);
      load();
      alert("Deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>Products</h2>

      <ProductForm form={form} setForm={setForm} onSubmit={submit} onCancel={() => { setForm({}); setEditingId(null); }} editing={!!editingId} />

      <hr />

      <ProductTable products={products} onEdit={startEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ProductPage;

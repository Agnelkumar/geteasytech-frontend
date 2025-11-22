import React, { useEffect, useState } from "react";
import Compare from "../components/Compare";
import { inputStyle, buttonStyle, btnStyle } from "../styles/modalStyles";
import axios from "axios";

const AdminPortal = () => {
  const [section, setSection] = useState(false);
  const [form, setForm] = useState({});
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  // Fetch Product List
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Convert form fields to backend schema fields
  const formToPayload = (f) => ({
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

  // Add or Update Product
  const handleAdd = async () => {
    const name = form["Product Name"];
    const price = form["Price"];

    if (!name || !price) {
      alert("Please fill Product Name and Price");
      return;
    }

    try {
      const payload = formToPayload(form);

      if (editingProductId) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/products/${editingProductId}`,
          payload
        );
        alert("Product Updated Successfully");
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/products`,
          payload
        );
        alert("Product Added Successfully");
      }

      fetchProducts();
      setForm({});
      setEditingProductId(null);
    } catch (error) {
      console.error(error);
      alert("Error saving product");
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`);
      alert("Product Deleted Successfully");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  };

  // Convert backend product → form fields
  const mapProductToForm = (p) => ({
    "Product Name": p.productName || "",
    "Main Camera": p.mainCamera || "",
    "Secondary Camera": p.secondaryCamera || "",
    "Front Camera": p.frontCamera || "",
    "Display": p.display || "",
    "Additional": p.additional || "",
    "Processor": p.processor || "",
    "Battery": p.battery || "",
    "Fingerprint": p.fingerprint || "",
    "Protection Glass": p.protectionGlass || "",
    "Variants": p.variants || "",
    "Price": p.price || ""
  });

  return (
    <>
      {/* Header */}
      <div
        style={{
          backgroundColor: "#2196f3",
          color: "white",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        <div>GetEasyTech</div>

        <div
          style={{
            display: "flex",
            fontSize: "1.2rem",
            padding: "10px 20px",
            fontWeight: "normal",
          }}
        >
          {localStorage.getItem("username")}

          <button
            onClick={() => {
              localStorage.removeItem("username");
              window.location.href = "/admin";
            }}
            style={{
              marginLeft: 20,
              backgroundColor: "#1864c4",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(200vh - 64px)" }}>
        {/* Sidebar */}
        <div style={{ width: 200, background: "#f1f3f4", paddingTop: 20 }}>
          <div
            onClick={() => setSection("product")}
            style={{
              padding: "12px 10px",
              cursor: "pointer",
              fontSize: "1.2rem",
              fontWeight: section === "product" ? "bold" : "normal",
              backgroundColor: section === "product" ? "#e0f0ff" : "transparent",
              borderLeft:
                section === "product"
                  ? "4px solid #1e88e5"
                  : "4px solid transparent",
            }}
          >
            Product
          </div>

          <div
            onClick={() => setSection("compare")}
            style={{
              padding: "12px 10px",
              cursor: "pointer",
              fontSize: "1.2rem",
              fontWeight: section === "compare" ? "bold" : "normal",
              backgroundColor: section === "compare" ? "#e0f0ff" : "transparent",
              borderLeft:
                section === "compare"
                  ? "4px solid #1e88e5"
                  : "4px solid transparent",
            }}
          >
            Comparison
          </div>
        </div>

        {/* Main Section */}
        <div style={{ flex: 1, padding: 20 }}>
          {section === "product" && (
            <>
              <h2 style={{ marginLeft: "50px" }}>Add Product</h2>

              {[
                "Product Name",
                "Main Camera",
                "Secondary Camera",
                "Front Camera",
                "Display",
                "Additional",
                "Processor",
                "Battery",
                "Fingerprint",
                "Protection Glass",
                "Variants",
                "Price",
              ].map((f) => (
                <input
                  key={f}
                  placeholder={f}
                  style={inputStyle}
                  value={form[f] || ""}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                />
              ))}

              <div
                style={{
                  display: "flex",
                  marginLeft: "180px",
                  marginTop: "20px",
                  gap: "10px",
                }}
              >
                <button style={buttonStyle} onClick={handleAdd}>
                  {editingProductId ? "Update Product" : "Submit Product"}
                </button>
              </div>

              {editingProductId && (
                <div
                  style={{
                    display: "flex",
                    marginLeft: "180px",
                    marginTop: "0px",
                    gap: "10px",
                  }}
                >
                  <button
                    style={btnStyle}
                    onClick={() => {
                      setForm({});
                      setEditingProductId(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Product List */}
              <ul>
                {products.map((p) => (
                  <li key={p._id} style={{ marginBottom: "10px" }}>
                    {p.productName} - ₹{p.price}
                    <button
                      onClick={() => {
                        setForm(mapProductToForm(p));
                        setEditingProductId(p._id);
                      }}
                      style={{
                        marginLeft: "20px",
                        backgroundColor: "#1e88e5",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Modify
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "#e53935",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {section === "compare" && <Compare products={products} />}
        </div>
      </div>
    </>
  );
};

export default AdminPortal;

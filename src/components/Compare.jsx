import React, { useState, useEffect } from "react";

const Compare = ({ products }) => {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (a && b) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      // Merge unique fields
      const allKeys = Array.from(new Set([...keysA, ...keysB]));

      // Remove unwanted fields (Mongo internal fields)
      const cleanKeys = allKeys.filter(
        (k) => !["_id", "__v", "createdAt", "updatedAt"].includes(k)
      );

      setFeatures(cleanKeys);
    }
  }, [a, b]);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Compare Products</h2>

      {/* Product A */}
      <select
        style={{ padding: 12, marginRight: 10, marginTop: 10 }}
        onChange={(e) => {
          const selected = products.find(
            (p) => p.productName === e.target.value
          );
          setA(selected || null);
        }}
      >
        <option value="">-- Product A --</option>
        {products.map((p) => (
          <option key={p._id} value={p.productName}>
            {p.productName}
          </option>
        ))}
      </select>

      {/* Product B */}
      <select
        style={{ padding: 12, marginRight: 10, marginTop: 10 }}
        onChange={(e) => {
          const selected = products.find(
            (p) => p.productName === e.target.value
          );
          setB(selected || null);
        }}
      >
        <option value="">-- Product B --</option>
        {products.map((p) => (
          <option key={p._id} value={p.productName}>
            {p.productName}
          </option>
        ))}
      </select>

      {/* Comparison Table */}
      {a && b && features.length > 0 && (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 20,
            textAlign: "center",
            textWrap: "wrap",
          }}
        >
          <thead>
            <tr>
              <th>Feature</th>
              <th>{a.productName}</th>
              <th>{b.productName}</th>
            </tr>
          </thead>
          <tbody>
            {features
              .filter((f) => f !== "productName") // ⬅ remove productName from features
              .map((f) => (
                <tr key={f}>
                  <td>{f}</td>
                  <td>{a[f] || "N/A"}</td>
                  <td>{b[f] || "N/A"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Compare;

import React, { useState, useEffect } from "react";

const getLowestPrice = (price) => {
  if (!price) return 0;
  return price
    .split(",")
    .map((p) => parseInt(p.trim()))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b)[0] || 0;
};

const Compare = ({ products }) => {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (a && b) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      const allKeys = Array.from(new Set([...keysA, ...keysB]));
      const cleanKeys = allKeys.filter((k) => !["_id", "__v", "createdAt", "updatedAt"].includes(k));
      setFeatures(cleanKeys);
    } else {
      setFeatures([]);
    }
  }, [a, b]);

  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Compare Products</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <select
          style={{ padding: 12 }}
          onChange={(e) => {
            const sel = products.find((p) => p.productName === e.target.value);
            setA(sel || null);
            setB(null);
          }}
        >
          <option value="">-- Product A (Redmi/Xiaomi/Mi) --</option>
          {products.filter(p => p.productName && /redmi|xiaomi|\bmi\b/i.test(p.productName)).map(p => (
            <option key={p._id} value={p.productName}>{p.productName}</option>
          ))}
        </select>

        <select
          style={{ padding: 12 }}
          onChange={(e) => {
            const sel = products.find((p) => p.productName === e.target.value);
            setB(sel || null);
          }}
        >
          <option value="">-- Product B (related price) --</option>
          {a && products.filter(p => {
            if (!p.productName) return false;
            const name = p.productName.toLowerCase();
            if (/redmi|xiaomi|\bmi\b/.test(name)) return false;
            const priceA = getLowestPrice(a.price || "");
            const priceB = getLowestPrice(p.price || "");
            return Math.abs(priceA - priceB) <= 2000;
          }).map(p => (
            <option key={p._id} value={p.productName}>{p.productName}</option>
          ))}
        </select>
      </div>

      {a && b && features.length > 0 && (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: 20, textAlign: "center" }}>
          <thead>
            <tr><th>Feature</th><th>{a.productName}</th><th>{b.productName}</th></tr>
          </thead>
          <tbody>
            {features.filter(f => f !== "productName").map(f => (
              <tr key={f}>
                <td>{formatLabel(f)}</td>
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

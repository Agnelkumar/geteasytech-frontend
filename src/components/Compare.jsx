import React, { useState, useEffect } from "react";

// --- PRICE HELPERS --- //
const getHighestPrice = (price) => {
  if (!price) return 0;

  return price
    .split(",")
    .map((p) => parseInt(p.trim()))
    .filter((n) => !isNaN(n))
    .sort((a, b) => b - a)[0]; // highest
};

const getLowestPrice = (price) => {
  if (!price) return 0;

  return price
    .split(",")
    .map((p) => parseInt(p.trim()))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b)[0]; // lowest
};

const Compare = ({ products }) => {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [features, setFeatures] = useState([]);

  const productA = a;

  // --- MERGE FIELDS FOR TABLE --- //
  useEffect(() => {
    if (a && b) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      const allKeys = Array.from(new Set([...keysA, ...keysB]));

      const cleanKeys = allKeys.filter(
        (k) => !["_id", "__v", "createdAt", "updatedAt"].includes(k)
      );

      setFeatures(cleanKeys);
    }
  }, [a, b]);

  // --- FORMAT LABELS (Main Camera → Main Camera) --- //
  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase());

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
    setB(null); // reset B when A changes
  }}
>
  <option value="">-- Product A --</option>

  {products
    .filter((p) => {
      if (!p.productName) return false;

      const name = p.productName.toLowerCase();
      return (
        name.includes("redmi") ||
        name.includes("xiaomi") ||
        name.includes("mi")
      );
    })
    .map((p) => (
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

        {/* Price-based filtering */}
        {productA &&
          products
            .filter((p) => {
              if (!p.productName) return false;
              if (p.productName.toLowerCase().includes("redmi")) return false;

              const priceA = getHighestPrice(productA.price);
              const priceB = getLowestPrice(p.price);

              return Math.abs(priceA - priceB) <= 1000;
            })
            .map((p) => (
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
              .filter((f) => f !== "productName")
              .map((f) => (
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

import React, { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 15;

const ProductTable = ({ products = [], onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  // 🔍 SEARCH + 🔠 SORT
  const filteredAndSorted = useMemo(() => {
    return products
      .filter(p =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const nameA = a.productName?.toLowerCase() || "";
        const nameB = b.productName?.toLowerCase() || "";

        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
  }, [products, search, sortOrder]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredAndSorted.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset page when search or sort changes
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const toggleSort = () => {
    setSortOrder(o => (o === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  return (
    <>
      {/* 🔍 SEARCH + SORT */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={handleSearch}
          style={{ padding: 8, maxWidth: 300 }}
        />

        <button onClick={toggleSort}>
          Sort {sortOrder === "asc" ? "A → Z" : "Z → A"}
        </button>
      </div>

      {/* 📋 PRODUCT LIST */}
      <ul style={{ marginTop: 18 }}>
        {currentProducts.length === 0 && <p>No products found</p>}

        {currentProducts.map((p) => (
          <li
            key={p._id}
            style={{
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <div style={{ flex: 1 }}>
              <strong>{p.productName}</strong> — ₹{p.price}
            </div>

            <button
              onClick={() => onEdit(p)}
              style={{
                backgroundColor: "#1e88e5",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer"
              }}
            >
              Modify
            </button>

            <button
              onClick={() => onDelete(p._id)}
              style={{
                backgroundColor: "#e53935",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* 📑 PAGINATION */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 20
          }}
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                fontWeight: currentPage === i + 1 ? "bold" : "normal"
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ProductTable;

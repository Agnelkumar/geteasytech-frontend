import React, { useEffect, useState } from "react";
import api from "../services/api";
import Compare from "../components/Compare";

const ComparePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data)).catch(err => { console.error(err); alert("Failed to load"); });
  }, []);
  return (
    <div>
      <Compare products={products} />
    </div>
  );
};

export default ComparePage;

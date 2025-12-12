import React, { useEffect, useState } from "react";
import Compare from "../components/Compare";
import { getProducts } from "../services/api";

const ComparePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data || [])).catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Compare products={products} />
    </div>
  );
};

export default ComparePage;

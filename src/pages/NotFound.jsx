import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={{ padding: 40, textAlign: "center" }}>
    <h2>Page not found</h2>
    <p><Link to="/compare">Go to Compare</Link> or <Link to="/product">Go to Product</Link></p>
  </div>
);

export default NotFound;

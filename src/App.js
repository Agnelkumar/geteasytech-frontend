import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import ProductPage from "./pages/ProductPage";
import ComparePage from "./pages/ComparePage";
import MasterAdminPage from "./pages/MasterAdminPage";
import StateAdminPage from "./pages/StateAdminPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<Layout />}>
          <Route path="/products" element={<ProductPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/create-state-admin" element={<MasterAdminPage />} />
          <Route path="/state-users" element={<StateAdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

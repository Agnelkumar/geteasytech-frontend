import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import UserManagementRegion from "./pages/userManagement/UserManagementRegion";
import AddSingle from "./pages/userManagement/AddSingle";
import BulkUploadAdd from "./pages/userManagement/BulkUploadAdd";
import DeleteUserSingle from "./pages/userManagement/DeleteUserSingle";
import DeleteUserBulk from "./pages/userManagement/DeleteUserBulk";
import DownloadUsers from "./pages/userManagement/DownloadUsers";
import LoginPage from "./pages/LoginPage";
import Landing from "./pages/Landing"; // optional homepage

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />

            {/* region routes */}
            <Route path="/userManagement/:region" element={<UserManagementRegion />}>
              <Route path="add" element={<AddSingle />} />
              <Route path="add-bulk" element={<BulkUploadAdd />} />
              <Route path="delete" element={<DeleteUserSingle />} />
              <Route path="delete-bulk" element={<DeleteUserBulk />} />
              <Route path="download" element={<DownloadUsers />} />
            </Route>

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;

import React, { useEffect } from "react";
import api from "../../services/api";
import { saveAs } from "file-saver";

const DownloadUsers = ({ closeForm }) => {

  useEffect(() => {
    const download = async () => {
      try {
        const res = await api.get("/users/export-users", {
          responseType: "blob"
        });

        saveAs(res.data, "users.csv");
      } catch (err) {
        console.error(err);
        alert("Download failed");
      } finally {
        closeForm();   // Close popup immediately
      }
    };

    download();
  }, [closeForm]);

  return null; // No UI needed
};

export default DownloadUsers;

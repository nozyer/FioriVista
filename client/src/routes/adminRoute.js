import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { userProfile } = useContext(AuthContext);

  if (!userProfile || userProfile.userRole !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;

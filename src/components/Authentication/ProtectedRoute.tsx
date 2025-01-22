import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { token } = useAuth();
  //token ? <Outlet /> : <Navigate to="/auth" />;
  return <Outlet /> ;
};

export default ProtectedRoute;

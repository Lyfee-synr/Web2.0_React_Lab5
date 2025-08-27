// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const loc = useLocation();

  if (loading) return <div className="page center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: loc }} />;
  return children;
}

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthListener from "../hooks/use-auth-listener";

export default function ProtectedRoute() {
  const { user } = useAuthListener();

  return user !== null ? <Outlet /> : <Navigate to="/login" />;
}

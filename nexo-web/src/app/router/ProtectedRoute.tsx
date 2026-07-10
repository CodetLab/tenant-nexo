// src/app/router/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Outlet } from "react-router";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        Cargando sesión...
      </div>
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth"
      replace
    />
  );
};
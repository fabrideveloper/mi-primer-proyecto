import React from "react";
import { UseAuth } from "./contexto/ContextoUsuarioAuth";
import { Navigate, Outlet } from "react-router-dom";

function ProtectorRutas({ children, redirectTo = "/admin" }) {
  const { Autenticado, Cargando } = UseAuth();
  if (Cargando) return <h1>cargando...</h1>;

  if (!Cargando && !Autenticado) return <Navigate to={redirectTo} />;
  return children ? children : <Outlet />;
}

export default ProtectorRutas;

import React from "react";
import { UseAuth } from "./contexto/ContextoUsuarioAuth";
import { Navigate, Outlet } from "react-router-dom";

function ProtectorRutaRegister() {
  const { Contraseña } = UseAuth();
  if (!Contraseña) return <Navigate to="/admin" />;
  return <Outlet />;
}

export default ProtectorRutaRegister;

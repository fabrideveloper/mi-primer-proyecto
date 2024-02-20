import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {
  PeticionLogin,
  PeticionRegister,
  PeticionVerifyToken,
} from "../api/Autenticacion";
import Cookies from "js-cookie";

export const ContextoAuth = createContext();

export const UseAuth = () => {
  const Context = useContext(ContextoAuth);
  if (!Context) {
    throw new Error("error al usar usecontext");
  }
  return Context;
};

export const AuthProvider = ({ children }) => {
  const [Usuarios, setUsuarios] = useState([]);
  const [Autenticado, setAutenticado] = useState(false);
  const [Cargando, setCargando] = useState(true);

  const [Errors, setErrors] = useState("");

  const Login = async (usuario) => {
    try {
      const res = await PeticionLogin(usuario);
      console.log(res);
      setUsuarios(res.data);
      setAutenticado(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data]);
    }
  };
  const Registro = async (usuario) => {
    try {
      const res = await PeticionRegister(usuario);
      console.log(res);
      setUsuarios(res.data);
      setAutenticado(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data]);
    }
  };
  const CerrarSesion = () => {
    Cookies.remove("token");
    setAutenticado(false);
    setUsuarios(null);
  };
  useEffect(() => {
    if (Errors.length > 0) {
      setTimeout(() => {
        setErrors("");
      }, 4000);
    }
    return () => clearTimeout(TimeRanges);
  }, [Errors]);

  useEffect(() => {
    async function chequearToken() {
      const cookies = Cookies.get();

      if (!cookies) {
        setAutenticado(false);
        setCargando(false);
        setUsuarios(null);
        return;
      }
      try {
        const res = await PeticionVerifyToken(cookies.token);
        if (!res.data) {
          setAutenticado(false);
          setCargando(false);
          return;
        }
        setAutenticado(true);
        setCargando(false);
        setUsuarios(res.data);
      } catch (error) {
        setAutenticado(false);
        setCargando(false);
        setUsuarios(null);
      }
    }
    chequearToken();
  }, []);
  return (
    <ContextoAuth.Provider
      value={{
        Usuarios,
        Autenticado,
        Cargando,
        Errors,
        Login,
        Registro,
        CerrarSesion,
      }}
    >
      {children}
    </ContextoAuth.Provider>
  );
};

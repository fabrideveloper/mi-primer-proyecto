import { createContext, useContext, useEffect, useState } from "react";
import {
  PeticionActualizarProducto,
  PeticionCrearProducto,
  PeticionEliminarProducto,
  PeticionProducto,
  PeticionProductos,
} from "../api/Productos";
import {
  PeticionActualizarPortada,
  PeticionCrearPortada,
  PeticionEliminarPortada,
  PeticionPortada,
  PeticionPortadas,
} from "../api/Portada";

export const ContextoProductos = createContext();

export const UseProductos = () => {
  const Context = useContext(ContextoProductos);
  if (!Context) {
    throw new Error("no se pudo utilizar el contexto");
  }
  return Context;
};

export const ProductosProvider = ({ children }) => {
  const [Productos, setProductos] = useState([]);
  const [Portadas, setPortadas] = useState([]);
  const [Errors, setErrors] = useState([""]);

  //ESTADOS DE CAMBIOS DE PAGINAS
  const [CambiarPag, setCambiarPag] = useState([""]);
  const [FormEdition, setFormEdition] = useState([""]);
  const [FormEdition1, setFormEdition1] = useState([""]);

  //PRODUCTOS
  const MostrarProductos = async () => {
    try {
      const res = await PeticionProductos();
      console.log(res.data);
      setProductos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const CrearProducto = async (producto) => {
    try {
      const res = await PeticionCrearProducto(producto);
      console.log(res);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data]);
    }
  };

  const MostrarProducto = async (id) => {
    try {
      const res = await PeticionProducto(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const ActualizarProductos = async (producto, id) => {
    try {
      const res = await PeticionActualizarProducto(producto, id);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data]);
    }
  };

  const EliminarProducto = async (id) => {
    const res = await PeticionEliminarProducto(id);
    if (res.status == 200) {
      setProductos(Productos.filter((e) => e._id !== id));
    }
  };

  //PORTADA
  const MostrarPortadas = async () => {
    try {
      const res = await PeticionPortadas();
      console.log(res.data);
      setPortadas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const CrearPortada = async (portada) => {
    try {
      const res = await PeticionCrearPortada(portada);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }

      setErrors([error.response.data]);
    }
  };

  const MostrarPortada = async (id) => {
    try {
      const res = await PeticionPortada(id);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const ActualizarPortada = async (portada, id) => {
    try {
      const res = await PeticionActualizarPortada(portada, id);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data]);
    }
  };

  const EliminarPortada = async (id) => {
    const res = await PeticionEliminarPortada(id);
    if (res.status == 200) {
      setPortadas(Portadas.filter((e) => e._id !== id));
    }
  };
  useEffect(() => {
    if (Errors.length > 0) {
      setTimeout(() => {
        setErrors("");
      }, 4000);
    }
  }, [Errors]);
  return (
    <ContextoProductos.Provider
      value={{
        //ESTADOS DE USUARIOS
        Productos,
        Portadas,
        Errors,
        //ESTADOS PARA CAMBIAR PAGINA
        CambiarPag,
        setCambiarPag,
        FormEdition,
        setFormEdition,
        FormEdition1,
        setFormEdition1,
        //FUNCIONES SOBRE ESTADOS DE USUARIOS
        MostrarProductos,
        CrearProducto,
        MostrarProducto,
        ActualizarProductos,
        MostrarPortadas,
        CrearPortada,
        MostrarPortada,
        ActualizarPortada,
        EliminarPortada,
        EliminarProducto,
        //
      }}
    >
      {children}
    </ContextoProductos.Provider>
  );
};

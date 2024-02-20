import React, { useEffect, useState } from "react";
import "../styles/CardProductos.css";
import { UseProductos } from "../contexto/ContextoProductos";

function CardProductos({
  elemento,

  Navegar,
  EliminarProducto,
}) {
  const EditarPublicacion = () => {
    Navegar(`/productos/actualizar/${elemento._id}`);
  };
  const { CambiarPag } = UseProductos();

  return (
    <div className="contenedor_card">
      <div className="contenedor_imagenes">
        {elemento.imagen && (
          <img src={elemento.imagen.url} className="imagenes" />
        )}
      </div>

      {CambiarPag && (
        <div className="contenedor_botones">
          <button
            className="botones"
            onClick={() => {
              EliminarProducto(elemento._id);
            }}
          >
            eliminar publicacion
          </button>
          <button className="botones" onClick={EditarPublicacion}>
            editar publicacion
          </button>
        </div>
      )}
    </div>
  );
}

export default CardProductos;

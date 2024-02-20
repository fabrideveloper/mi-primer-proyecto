import React, { useEffect, useState } from "react";
import "../styles/ProductosStyle.css";
import CardProductos from "../componentes/CardProductos";
import { imagenes } from "../componentes/Helpers";
import { UseProductos } from "../contexto/ContextoProductos";
import { useNavigate } from "react-router-dom";

function ProductosPage() {
  const {
    //ESTADOS DE USUARIOS

    Productos,
    Portadas,
    //ESTADO DE CAMBIO DE PAGINA
    CambiarPag,
    setCambiarPag,

    //FUNCIONES DE USUARIO
    MostrarProductos,
    MostrarPortadas,
    EliminarPortada,
    EliminarProducto,
  } = UseProductos();

  const Navegar = useNavigate();

  useEffect(() => {
    MostrarPortadas();
    MostrarProductos();

    if (CambiarPag == "") {
      setCambiarPag(true);
    }
  }, []);
  if (Productos.length == 0 && Portadas.length == 0)
    return <h1>no hay productos y portada</h1>;
  return (
    <div className="contenedor_productos">
      {Portadas.map((e) => (
        <>
          <div className="contenedor_imagenprincipal" key={e._id}>
            {e.imagen && (
              <img src={e.imagen.url} className="imagen_principal" />
            )}
          </div>
          <div className="contenedor_textos">
            <h2 className="titulo_portada">
              listas de precios: {e.listaprecios}
            </h2>
            <span className="parrafos">fecha: {e.fecha}</span>
            <span className="parrafos">ofertas y combos :{e.ofertas}</span>
            {CambiarPag ? (
              <div className="contenedor_botones_portada">
                {" "}
                <button
                  className="botones_portada"
                  onClick={() => {
                    Navegar(`/portadas/actualizar/${e._id}`);
                  }}
                >
                  editar
                </button>
                <button
                  className="botones_portada"
                  onClick={() => {
                    EliminarPortada(e._id);
                  }}
                >
                  eliminar
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      ))}

      <div className="contenedor_imagenes">
        {Productos.map((elemento) => (
          <div className="contenedor_cardproductos_mayor">
            <CardProductos
              elemento={elemento}
              key={elemento._id}
              Navegar={Navegar}
              EliminarProducto={EliminarProducto}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductosPage;

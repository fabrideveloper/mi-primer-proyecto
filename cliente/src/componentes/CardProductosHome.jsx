import React from "react";
import "../styles/CardProductosHome.css";

function CardProductosHome({ elemento }) {
  return (
    <div className="contenedor_cardproductohome">
      <div className="contenedor_imagen_cardproductoshome">
        <img src={elemento.imagen} className="imagen_cardproductoshome" />
      </div>
      <div className="contenedor_titulos_homepage">
        <h3 className="nombre_producto_cardproductoshome">
          nombre del producto
        </h3>
        <span className="precio_producto_cardproductoshome">precio</span>
      </div>
    </div>
  );
}

export default CardProductosHome;

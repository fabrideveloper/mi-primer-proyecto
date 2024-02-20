import React from "react";
import { imagenes } from "../componentes/Helpers";
import CardProductosHome from "../componentes/CardProductosHome";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="contenedor_homepage">
      <div className="contenedor_navbar_lateral_homepage">
        <h2 className="nombre_busqueda_homepage">producto</h2>
        <span className="resultados_busqueda_homepage">
          resultados de busqueda
        </span>
        <div className="contenedor_de_los_inputs_homepage">
          <label htmlFor="menor precio" className="contenedor_inputs_homepage">
            <h4 className="texto_inputs_homepage">menor precio</h4>
            <input
              type="radio"
              value="menor precio"
              className="inputs_homepage"
            />
          </label>
          <label htmlFor="mayor  precio" className="contenedor_inputs_homepage">
            <h4 className="texto_inputs_homepage">mmayor precio</h4>
            <input
              type="radio"
              value="mayor precio"
              className="inputs_homepage"
            />
          </label>
          <label htmlFor="ofertas" className="contenedor_inputs_homepage">
            <h4 className="texto_inputs_homepage">ofertas</h4>
            <input type="radio" value="ofertas" className="inputs_homepage" />
          </label>
        </div>
      </div>
      <div className="contenedor_principal_productos_buscados_homepage">
        <div className="contenedor_hijo_productos_homepage">
          {imagenes.map((elemento) => (
            <CardProductosHome elemento={elemento} key={elemento.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

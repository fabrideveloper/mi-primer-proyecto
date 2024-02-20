import React from "react";
import "../styles/NavBar.css";
import { UseAuth } from "../contexto/ContextoUsuarioAuth";
import { useNavigate, useParams } from "react-router-dom";

import { UseProductos } from "../contexto/ContextoProductos";
import { MdEdit } from "react-icons/md";
import { PiListFill } from "react-icons/pi";
import { FaWindowClose } from "react-icons/fa";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";

function NavBar() {
  const { Autenticado, Usuarios, CerrarSesion } = UseAuth();
  const {
    //ESTADOS DE USUARIO
    Portadas,
    //ESTADOS DE CAMBIOS DE PAGINAS
    CambiarPag,
    setCambiarPag,
  } = UseProductos();

  const Params = useParams();
  const Navegar = useNavigate();

  const Logout = () => {
    CerrarSesion();
    setCambiarPag(false);
  };

  return (
    <>
      {Autenticado && !CambiarPag ? (
        <div
          className="contenedor_icono_editar_pagina"
          onClick={() => {
            setCambiarPag(true);
          }}
        >
          <MdEdit className="icono_editar_pagina" />
        </div>
      ) : (
        ""
      )}
      {CambiarPag == true ? (
        <nav className="contenedor_navbar">
          <div className="contenedor_bienvenida">
            <strong className="titulo">bienvenido </strong>
            <h2 className="nombre">{Usuarios.usuario}</h2>
          </div>
          <div className="contenedor_input_search">
            <input
              className="input_search"
              type="search"
              placeholder="busca tu publicacion"
            />
          </div>
          <div className="contenedor_botones_navbar">
            <button className="botones_navbar" onClick={Logout}>
              cerrar sesion
            </button>

            <div className="contenedor_lista_agregar_publicacion">
              <button className="botones_navbar">agregar publicacion</button>
              <ul className="lista_agregar_publicacion">
                {Portadas.length == 0 && (
                  <li
                    className="items_lista_agregar_publicacion"
                    onClick={() => {
                      Navegar("/portadas/formularios");
                    }}
                  >
                    portada
                  </li>
                )}
                <li
                  className="items_lista_agregar_publicacion"
                  onClick={() => {
                    Navegar("/productos/formularios");
                  }}
                >
                  productos
                </li>
              </ul>
            </div>
            <button
              className="botones_navbar"
              onClick={() => {
                setCambiarPag(false);
              }}
            >
              guardar y ver pagina
            </button>
            <i className="contenedor_barra_responsive">
              <PiListFill className="icono_barra" />
              <ul className="contenedor_lista_responsive">
                <li className="items_lista_responsive" onClick={Logout}>
                  cerrar sesion
                </li>
                <div className="contenedor_sublista">
                  <li className="items_lista_responsive">
                    <span>agregar publicacion </span>
                    <TbLayoutSidebarLeftCollapseFilled />
                  </li>
                  <ul className="sub_lista_responsive">
                    {Portadas.length == 0 && (
                      <li
                        className="items_lista_responsive"
                        onClick={() => {
                          Navegar("/portadas/formularios");
                        }}
                      >
                        portadas
                      </li>
                    )}
                    <li
                      className="items_lista_responsive"
                      onClick={() => {
                        Navegar("/productos/formularios");
                      }}
                    >
                      productos
                    </li>
                  </ul>
                </div>
                <li
                  className="items_lista_responsive"
                  onClick={() => {
                    setCambiarPag(false);
                  }}
                >
                  <FaWindowClose />
                </li>
              </ul>
            </i>
          </div>
        </nav>
      ) : (
        ""
      )}
    </>
  );
}

export default NavBar;

import React, { useEffect, useState } from "react";
import "../styles/NavBar.css";
import { UseAuth } from "../contexto/ContextoUsuarioAuth";
import { useNavigate, useParams } from "react-router-dom";

import { UseProductos } from "../contexto/ContextoProductos";
import { MdEdit } from "react-icons/md";
import { PiListFill } from "react-icons/pi";
import { FaWindowClose } from "react-icons/fa";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FiArrowUpLeft } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function NavBar() {
  const { Autenticado, Usuarios, CerrarSesion } = UseAuth();
  const {
    //ESTADOS DE USUARIO
    Portadas,
    Productos,
    //ESTADOS DE CAMBIOS DE PAGINAS
    CambiarPag,
    setCambiarPag,
    ManejoEstadoInputNavBar,
    setManejoEstadoInputNavBar,
    Buscador,
    setBuscador,
    // FUNCIONES DE USUARIO
    mostrarProductosBusqueda,
  } = UseProductos();

  const Params = useParams();
  const Navegar = useNavigate();

  const Logout = () => {
    CerrarSesion();
    setCambiarPag(false);
  };
  const handleChange = (e) => {
    mostrarProductosBusqueda(e);
    if (e.target.value) {
      let objeto = document.getElementById("contenedor_principal_input_search");
      objeto.style.borderRadius = "20px 20px 0px 0px";
    } else {
      let objeto = document.getElementById("contenedor_principal_input_search");
      objeto.style.borderRadius = "20px ";
    }
  };
  const SubmitInputSearch = (e) => {
    e.preventDefault();
    let objeto = document.getElementById("contenedor_principal_input_search");
    objeto.style.borderRadius = "20px ";
    setManejoEstadoInputNavBar({ submit: true });
    console.log(ManejoEstadoInputNavBar.submit);
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

          <form
            id="contenedor_principal_input_search"
            onSubmit={SubmitInputSearch}
            className="contenedor_principal_input_search"
          >
            <div className="contendor_secundario_input_search">
              <FaSearch className="icono_input_search" />
              <input
                className="input_search"
                type="text"
                placeholder="busca tu publicacion"
                value={ManejoEstadoInputNavBar.onchange}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <IoMdClose
                className="icono_input_search"
                onClick={(e) => {
                  let objeto = document.getElementById(
                    "contenedor_principal_input_search"
                  );
                  objeto.style.borderRadius = "20px ";
                  setManejoEstadoInputNavBar({
                    onchange: "",
                  });
                }}
              />
              <FaSearch
                className="icono_input_search"
                type="submit"
                onClick={SubmitInputSearch}
              />
            </div>

            {ManejoEstadoInputNavBar.onchange &&
              Buscador.map((elemento) => (
                <div
                  className="contenedor_principal_lista_busqueda_input_search"
                  key={elemento._id}
                  onClick={(e) => {
                    let objeto = e.target.childNodes[0].data;
                    console.log(objeto);
                    setManejoEstadoInputNavBar({
                      onchange: objeto,
                    });
                    let nuevoarray = [...Productos];
                    setBuscador(
                      nuevoarray.filter((elemento) =>
                        elemento.producto
                          .toLowerCase()
                          .startsWith(e.target.childNodes[0].data.toLowerCase())
                      )
                    );
                  }}
                >
                  <div
                    id="contenedor_lista_input_search"
                    className="contenedor_lista_busqueda_input_search"
                  >
                    <span className="items_busqueda_input_search">
                      <section className="hijo_items_busqueda_input_search">
                        <span className="texto_input_busqueda_search">
                          {elemento.producto}
                          <FiArrowUpLeft className="icono_input_search_busqueda" />
                        </span>
                      </section>
                    </span>
                  </div>
                </div>
              ))}
          </form>

          <div className="contenedor_botones_navbar">
            <span className="botones_navbar" onClick={Logout}>
              cerrar sesion
            </span>

            <div className="contenedor_lista_agregar_publicacion">
              <span className="botones_navbar">agregar publicacion</span>
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
            <span
              className="botones_navbar"
              onClick={() => {
                setCambiarPag(false);
              }}
            >
              guardar y ver pagina
            </span>
            <i className="contenedor_barra_responsive">
              <PiListFill className="icono_barra" />
              <ul className="contenedor_lista_responsive">
                <li className="items_lista_responsive" onClick={Logout}>
                  <span>cerrar sesion</span>
                  <RiLogoutBoxFill />
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
                  <span>guardar</span>
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

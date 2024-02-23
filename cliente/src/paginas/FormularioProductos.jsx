import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/FormularioProductosStyle.css";
import "../styles/FormularioPortada.css";
import { TipoProducto } from "../componentes/Helpers";
import { UseProductos } from "../contexto/ContextoProductos";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaSquareCheck } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";

function FormularioProductos() {
  const {
    //ESTADOS DE CAMBIAR PAGINA

    CambiarPag,
    setCambiarPag,
    //FUNCIONES DE USUARIO
    CrearProducto,
    MostrarProducto,
    ActualizarProductos,
    CrearPortada,
    MostrarPortada,
    ActualizarPortada,
    //
  } = UseProductos();
  const [mostrarError, setmostrarError] = useState({
    checked: "",
    errorPortada: "",
    erorrProducto: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const Navegar = useNavigate();
  const Params = useParams();
  const localitation = useLocation();

  const OnSubmit = handleSubmit(async (values) => {
    let boton = document.getElementById("botonsubmitproducto");

    if (values) {
      boton.disabled = true;
    }
    if (values.imagen) {
      if (Params.id && values.imagen) {
        await ActualizarProductos(values, Params.id);
      } else {
        await CrearProducto(values);

        console.log(values);
      }
      if (
        values.imagen.name.includes(".jpg") ||
        values.imagen.name.includes(".png") ||
        values.imagen.name.includes(".jpeg")
      ) {
        Navegar("/productos");
      }
    } else {
      setmostrarError({
        erorrProducto: "error al cargar producto",
        checked: "submit",
      });
    }

    boton.disabled = false;
  });
  const OnSubmitPortada = handleSubmit(async (data) => {
    let boton = document.getElementById("botonsubmitportada");

    if (data) {
      boton.disabled = true;
      setmostrarError({ checked: "2" });
    }
    if (data.imagen) {
      if (Params.id && data.imagen) {
        await ActualizarPortada(data, Params.id);
      } else {
        await CrearPortada(data);
        console.log(data);
      }
      if (
        data.imagen.name.includes(".jpg") ||
        data.imagen.name.includes(".jpeg") ||
        data.imagen.name.includes(".png")
      ) {
        Navegar("/productos");
      }
    } else {
      setmostrarError({
        errorPortada: "error al subir portada",
        checked: "submit",
      });
    }

    boton.disabled = false;
  });

  useEffect(() => {
    if (mostrarError.errorPortada) {
      setTimeout(() => {
        setmostrarError({ errorPortada: "" });
      }, 4000);
    }
    if (mostrarError.erorrProducto) {
      setTimeout(() => {
        setmostrarError({ erorrProducto: "" });
      }, 4000);
    }
  }, [mostrarError]);
  useEffect(() => {
    if (CambiarPag) {
      setCambiarPag([""]);
    }
  }, []);
  useEffect(() => {
    async function seleccionarProducto() {
      if (Params.id && localitation.pathname.includes("productos")) {
        const respuesta = await MostrarProducto(Params.id);
        console.log(respuesta);
        // setValue("imagen", respuesta.imagen.url);
        setValue("producto", respuesta.producto);
        setValue("tipoventa", respuesta.tipoventa);
        setValue("tipoproducto", respuesta.tipoproducto);
      }
    }
    seleccionarProducto();
  }, []);

  useEffect(() => {
    async function seleccionarPortada() {
      if (Params.id && localitation.pathname.includes("portadas")) {
        const portadaseleccionada = await MostrarPortada(Params.id);
        //setValue("imagen", portadaseleccionada.imagen.url);
        setValue("listaprecios", portadaseleccionada.listaprecios);
        setValue("fecha", portadaseleccionada.fecha);
        setValue("ofertas", portadaseleccionada.ofertas);
      }
    }
    seleccionarPortada();
  }, []);

  return (
    <div className="contenedor_formulario">
      {localitation.pathname.includes("portada") && (
        <form
          onSubmit={OnSubmitPortada}
          className="formulario_producto_principal"
        >
          <label
            htmlFor="imagen portada"
            className="contenedor_input_imagen_principal"
          >
            <span className="texto_input_portada">
              selecciona tu imagen portada
            </span>
            <div className="contenedor_input_file_formulario_portada">
              <input
                type="file"
                name="imagen"
                onChange={(e) => {
                  if (
                    e.target.files[0].name.includes(".png") ||
                    e.target.files[0].name.includes(".jpg") ||
                    e.target.files[0].name.includes(".jpeg")
                  ) {
                    setValue("imagen", e.target.files[0]);
                    setmostrarError({ checked: "ok" });
                  } else {
                    setmostrarError({
                      errorPortada: "debe subir una imagen",
                      checked: "null",
                    });
                    setValue("imagen", null);
                  }
                }}
                required={true}
                className="inputs_file_imagen_principal_portada"
              />
              {mostrarError.errorPortada && mostrarError.checked == "null" ? (
                <FaWindowClose className="icon_checkeds_false_portada" />
              ) : (
                ""
              )}
              {mostrarError.checked == "ok" && (
                <FaSquareCheck className="icon_checkeds_true_portada" />
              )}
              {mostrarError.errorPortada && mostrarError.checked == "null" ? (
                <span className="errors_submit">
                  {mostrarError.errorPortada}
                </span>
              ) : (
                ""
              )}
            </div>
          </label>

          <div className="contenedor_inputs_portada_principal">
            <span className="texto_input_portada">listas de precios</span>
            <input
              type="text"
              {...register("listaprecios", {
                required: {
                  value: true,
                  message: "este campo es requerido",
                },
              })}
              className="inputs_portada_principal"
            />
            {errors.listaprecios && (
              <span className="errors_hook_form_portada">
                {errors.listaprecios.message}
              </span>
            )}
            <span className="texto_input_portada">fecha</span>
            <input
              type="date"
              {...register("fecha", {
                required: {
                  value: true,
                  message: "este campo es requerido",
                },
              })}
              className="inputs_portada_principal"
            />
            {errors.fecha && (
              <span className="errors_hook_form_portada">
                {errors.fecha.message}
              </span>
            )}
            <span className="texto_input_portada">ofertas y combos</span>
            <input
              type="text"
              {...register("ofertas", {
                required: {
                  value: true,
                  message: "este campo es requerido",
                },
              })}
              className="inputs_portada_principal"
            />
            {errors.ofertas && (
              <span className="errors_hook_form_portada">
                {errors.ofertas.message}
              </span>
            )}
            {mostrarError.errorPortada && mostrarError.checked == "submit" ? (
              <span className="errors_submit_final">
                {mostrarError.errorPortada}
              </span>
            ) : (
              ""
            )}
          </div>

          <button
            id="botonsubmitportada"
            className="boton_submit_portada_principal"
          >
            guardar cambios
          </button>
        </form>
      )}
      {localitation.pathname.includes("productos") && (
        <form onSubmit={OnSubmit} className="formulario_producto">
          <h2 className="titulo_formulario">TU PUBLICACION</h2>
          <label htmlFor="producto" className="contenedor_input_producto">
            <span className="texto_inputs">nombre producto</span>
            <input
              type="text"
              placeholder="producto"
              {...register("producto", {
                required: {
                  value: true,
                  message: "este campo es requerido",
                },
              })}
              className="input_producto"
            />
            {errors.producto && (
              <span className="errors_productos_frontend">
                {errors.producto.message}
              </span>
            )}
          </label>

          <label
            htmlFor="tipo de venta"
            className="contenedor_principal_tipoventa"
          >
            <span className="texto_inputs">tipo de venta</span>
            <select
              {...register("tipoventa", {
                required: {
                  value: true,
                  message: "este campo es requerido",
                },
              })}
              className="input_tipoventa"
            >
              <option value="oferta">oferta</option>
              <option value="normal">normal</option>
            </select>
          </label>
          {errors.tipoventa && (
            <span className="errors_productos_frontend">
              {errors.tipoventa.message}
            </span>
          )}

          <label
            htmlFor="tipo de productos"
            className="contenedor_input_tipoproducto"
          >
            <span className="texto_inputs">tipo de producto</span>
            <select
              {...register("tipoproducto", {
                required: {
                  value: true,
                  message: "este campo es requerido",
                },
              })}
              className="input_tipoproducto"
            >
              {TipoProducto.map((elemento) => (
                <option
                  className="option"
                  value={elemento.producto}
                  key={elemento.id}
                >
                  {elemento.producto}{" "}
                </option>
              ))}
            </select>
            {errors.tipoproducto && (
              <span className="errors_productos_frontend">
                {errors.tipoproducto.message}
              </span>
            )}
          </label>

          <label htmlFor="image" className="contenedor_input_imagen">
            <span className="texto_inputs">imagen</span>
            <div className="contenedor_file_producto">
              <input
                type="file"
                name="imagen"
                onChange={(e) => {
                  const dato = e.target.files[0].name;

                  if (
                    dato.includes(".png") ||
                    dato.includes(".jpg") ||
                    dato.includes(".jpeg")
                  ) {
                    setValue("imagen", e.target.files[0]);
                    setmostrarError({ checked: "ok" });
                    console.log(e.target.files[0]);
                  } else {
                    setmostrarError({
                      erorrProducto: "debe subir una imagen",
                      checked: "null",
                    });
                    setValue("imagen", null);
                  }
                }}
                required={true}
                className="input_imagen"
              />
              {mostrarError.erorrProducto && mostrarError.checked == "null" ? (
                <FaWindowClose className="icon_checkeds_false_producto" />
              ) : (
                ""
              )}
              {mostrarError.checked == "ok" && (
                <FaSquareCheck className="icon_checkeds_true_producto" />
              )}
            </div>
            {mostrarError.erorrProducto && mostrarError.checked == "null" ? (
              <span className="errors_submit_producto">
                {mostrarError.erorrProducto}
              </span>
            ) : (
              ""
            )}
            {mostrarError.erorrProducto && mostrarError.checked == "submit" ? (
              <span className="errors_submit_producto">
                {mostrarError.erorrProducto}
              </span>
            ) : (
              ""
            )}
          </label>

          <div className="contenedor_boton_submit">
            <button id="botonsubmitproducto" className="boton_submit_publicar">
              guardar cambios
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FormularioProductos;

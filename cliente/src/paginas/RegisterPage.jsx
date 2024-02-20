import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../styles/Register.css";
import { provincias } from "../componentes/Helpers";
import { UseAuth } from "../contexto/ContextoUsuarioAuth";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const { Registro, Autenticado } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navegar = useNavigate();
  const Submit = (values) => {
    Registro(values);
  };
  useEffect(() => {
    if (Autenticado) {
      navegar("/productos");
    }
  }, [Autenticado]);
  return (
    <div className="contenedor_principal_formulario">
      <form
        className="contenedor_formulario_registro"
        onSubmit={handleSubmit(Submit)}
      >
        <h2 className="titulo_formulario_registro">Registrate</h2>
        <label htmlFor="usuario" className="contenedor_input_usuario_registro">
          <div className="separador_inputs_errors">
            <p className="texto_input_registro">usuario</p>
            <input
              type="text"
              className="input_usuario_registro"
              {...register("usuario", {
                required: {
                  value: true,
                  message: "el usuario es requerido",
                },
              })}
            />
          </div>
          {errors.usuario && (
            <span className="errors_inputs_formulario_registro">
              {errors.usuario.message}
            </span>
          )}
        </label>
        <label htmlFor="email" className="contenedor_input_email_registro">
          <div className="separador_inputs_errors">
            <p className="texto_input_registro">gmail</p>
            <input
              type="email"
              className="input_email_registro"
              {...register("email", {
                required: {
                  value: true,
                  message: "el email es requerido",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "formato de correo invalido",
                },
              })}
            />
          </div>
          {errors.email && (
            <span className="errors_inputs_formulario_registro">
              {errors.email.message}
            </span>
          )}
        </label>
        <label
          htmlFor="contraseña"
          className="contenedor_input_contraseña_registro"
        >
          <div className="separador_inputs_errors">
            <p className="texto_input_registro">contraseña</p>
            <input
              type="password"
              className="input_contraseña_registro"
              {...register("contraseña", {
                required: {
                  value: true,
                  message: "la contraseña es requerida",
                },

                pattern: {
                  value: "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
                  message:
                    "la contraseña debe tener al menos un número, una letra en mayúscula, una letra en minúscula ",
                },
              })}
            />
          </div>
          {errors.contraseña && (
            <span className="errors_inputs_formulario_registro">
              {errors.contraseña.message}
            </span>
          )}
        </label>
        <label
          htmlFor="confirmcontraseña"
          className="contenedor_input_confircontraseña_registro"
        >
          <div className="separador_inputs_errors">
            <p className="texto_input_registro">confirmar contraseña</p>
            <input
              type="password"
              className="input_confirmcontraseña_registro"
              {...register("confirmcontraseña", {
                required: {
                  value: true,
                  message: "debe confirmar la contraseña",
                },
                validate: (value) => {
                  if (value === watch("contraseña")) {
                    return true;
                  } else {
                    return "las contraseñas deben coincidir";
                  }
                },
              })}
            />
          </div>
          {errors.confirmcontraseña && (
            <span className="errors_inputs_formulario_registro">
              {errors.confirmcontraseña.message}
            </span>
          )}
        </label>
        <label
          htmlFor="provincia"
          className="contenedor_input_provincia_registro"
        >
          <div className="separador_inputs_errors">
            <p className="texto_input_registro">provincias</p>
            <select
              className="input_provincia_registro"
              {...register("provincia", {
                required: {
                  value: true,
                  message: "debe seleccionar su provincia",
                },
              })}
            >
              {provincias.map((e, i) => (
                <option value={e.provincia} key={i}>
                  {e.provincia}
                </option>
              ))}
            </select>
          </div>
          {errors.provincia && (
            <span className="errors_inputs_formulario_registro">
              {errors.provincia.message}
            </span>
          )}
        </label>

        <label htmlFor="sexo" className="contenedor_input_sexo_registro">
          <div className="separador_inputs_errors">
            <p className="texto_input_registro">sexo</p>
            <span className="nombre_input_sexo">
              otros
              <input
                type="radio"
                className="input_sexo_registro"
                value="otros"
                {...register("sexo", {
                  required: {
                    value: true,
                    message: "debe sleccionar su sexo",
                  },
                })}
              />
            </span>
            <span className="nombre_input_sexo">
              femenino
              <input
                type="radio"
                value="femenino"
                className="input_sexo_registro"
                {...register("sexo", {
                  required: {
                    value: true,
                    message: "debe sleccionar su sexo",
                  },
                })}
              />
            </span>
            <span className="nombre_input_sexo">
              masculino
              <input
                type="radio"
                value="masculino"
                {...register("sexo", {
                  required: {
                    value: true,
                    message: "debe sleccionar su sexo",
                  },
                })}
                className="input_sexo_registro"
              />
            </span>
          </div>
          {errors.sexo && (
            <span className="errors_inputs_formulario_registro">
              {errors.sexo.message}
            </span>
          )}
        </label>
        <button className="boton_submit_registro">registrarse</button>
      </form>
    </div>
  );
}

export default RegisterPage;

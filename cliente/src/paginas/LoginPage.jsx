import React, { useEffect } from "react";
import { Checkbox } from "antd";

import "../styles/Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../contexto/ContextoUsuarioAuth";

function LoginPage() {
  const { Login, Autenticado, Errors } = UseAuth();
  const Navegar = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const OnSubmit = handleSubmit((values) => {
    Login(values);
  });
  useEffect(() => {
    if (Autenticado) {
      Navegar("/productos");
    }
  }, [Autenticado, Errors]);
  return (
    <div className="contenedor_principal_login">
      <form className="formulario" onSubmit={OnSubmit}>
        <h2 className="titulo_form_login">iniciar sesion</h2>

        <div className="contenedor_inputs">
          <input
            type="text"
            className="inputs"
            placeholder="email"
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
          {errors.email && (
            <span className="errors_frontend">{errors.email.message}</span>
          )}
        </div>

        <div className="contenedor_inputs">
          <input
            type="password"
            className="inputs"
            placeholder="contraseña"
            {...register("contraseña", {
              required: {
                value: true,
                message: "la contraseña es requerida",
              },
              minLength: {
                value: 8,
                message: "la contraseña debe tener la menos 8 caracteres",
              },
            })}
          />
          {errors.contraseña && (
            <span className="errors_frontend">{errors.contraseña.message}</span>
          )}
        </div>
        {Errors && (
          <span>
            {Errors.map((e) => (
              <span>{e}</span>
            ))}
          </span>
        )}
        <div className="contenedor_check">
          <Checkbox className="checkbox" {...register("checkbox")}>
            Recordarme la contraseña
          </Checkbox>
        </div>

        <div className="contenedor_boton">
          <button className="boton_submit">iniciar sesion</button>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;

import { Router } from "express";
import {
  Login,
  Logout,
  Register,
  VerificarToken,
} from "../Controladores/AuthControlador.js";

const RouterAuth = Router();

RouterAuth.post("/register", Register);
RouterAuth.post("/login", Login);
RouterAuth.get("/verificartoken", VerificarToken);
RouterAuth.post("/logout", Logout);

export default RouterAuth;

import Jwt from "jsonwebtoken";
import { Token_Secret } from "../Config.js";

export const ValidarToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(404).json(["token invalido,acceso denegado"]);

  Jwt.verify(token, Token_Secret, (err, usuario) => {
    if (err) return res.status(404).json(["token inavlido, acceso denegado"]);
    req.usuario = usuario;
    next();
  });
};

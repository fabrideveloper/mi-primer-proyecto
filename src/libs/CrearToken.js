import Jwt from "jsonwebtoken";
import { Token_Secret } from "../Config.js";

export function CrearToken(params) {
  return new Promise((resolve, reject) => {
    Jwt.sign(params, Token_Secret, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

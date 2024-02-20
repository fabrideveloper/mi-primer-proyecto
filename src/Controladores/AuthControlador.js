import Jwt from "jsonwebtoken";
import { CrearToken } from "../libs/CrearToken.js";
import Usuario from "../modules/User.model.js";
import bcryptjs from "bcryptjs";
import { Token_Secret } from "../Config.js";

export const Register = async (req, res) => {
  const { usuario, email, contraseña, provincia, sexo } = req.body;
  try {
    const usuarioActivo = await Usuario.findOne({ email });
    if (usuarioActivo)
      return res
        .status(400)
        .json(["el formato de usuario que desea ingresar ya esta registado"]);
    const encriptarPassword = await bcryptjs.hash(contraseña, 10);
    const nuevoUsuario = new Usuario({
      usuario,
      email,
      contraseña: encriptarPassword,
      provincia,
      sexo,
    });
    const usuarioSave = await nuevoUsuario.save();
    const token = await CrearToken({ id: usuarioSave._id });
    res.cookie("token", token);
    res.json(usuarioSave);
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const UsuarioFound = await Usuario.findOne({ email });
    if (!UsuarioFound)
      return res.status(400).json(["el usuario que desea loguear no existe"]);

    const compararContraseñas = await bcryptjs.compare(
      contraseña,
      UsuarioFound.contraseña
    );
    if (!compararContraseñas)
      return res.status(400).json(["la contraseña es incorrecta"]);
    const token = await CrearToken({ id: UsuarioFound._id });
    res.cookie("token", token);

    res.json(UsuarioFound);
  } catch (error) {
    console.log(error);
  }
};

export const VerificarToken = async (req, res) => {
  const { token } = req.cookies;
  try {
    if (!token) return res.status(400).json(["token no autorizado"]);

    Jwt.verify(token, Token_Secret, async (err, usuario) => {
      if (err) return res.status(400).json(["token no autorizado"]);
      const usuarioTokenOk = await Usuario.findById(usuario.id);
      if (!usuarioTokenOk) return res.status(400).json(["token no autorizado"]);
      res.json(usuarioTokenOk);
    });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

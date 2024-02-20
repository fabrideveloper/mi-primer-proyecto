import { Router } from "express";
import {
  ActualizarPortada,
  ActualizarProducto,
  CrearPortada,
  CrearProducto,
  EliminarPortada,
  EliminarProducto,
  MostrarPortada,
  MostrarPortadas,
  PedirProducto,
  PedirProductos,
} from "../Controladores/ProductsControlador.js";
import { ValidarToken } from "../middlewares/ValidarToken.js";

const routesProductos = Router();
//RUTAS PORTADA
routesProductos.post("/producto", ValidarToken, CrearProducto);

routesProductos.get("/productos", ValidarToken, PedirProductos);

routesProductos.get("/producto/:id", ValidarToken, PedirProducto);

routesProductos.put("/producto/:id", ValidarToken, ActualizarProducto);

routesProductos.delete("/producto/:id", ValidarToken, EliminarProducto);

//RUTAS PRODUCTOS

routesProductos.post("/portada", ValidarToken, CrearPortada);

routesProductos.get("/portadas", ValidarToken, MostrarPortadas);

routesProductos.get("/portada/:id", ValidarToken, MostrarPortada);

routesProductos.put("/portada/:id", ValidarToken, ActualizarPortada);

routesProductos.delete("/portada/:id", ValidarToken, EliminarPortada);

export default routesProductos;

import { EliminarImagen, SubirImagen } from "../middlewares/Cloudinary.js";
import Producto from "../modules/Products.Model.js";
import fs from "fs-extra";
import Portada from "../modules/Portada.Model.js";
import path from "path";

export const CrearProducto = async (req, res) => {
  const { producto, tipoventa, tipoproducto } = req.body;

  try {
    const datoProducto = await Producto.findOne({ producto });
    if (datoProducto)
      return res
        .status(401)
        .json(["este tipo de nombre de producto ya existe, ingrese uno nuevo"]);
    let imagen = null;
    if (req.files.imagen) {
      const imagenSubida = await SubirImagen(req.files.imagen.tempFilePath);
      await fs.remove(req.files.imagen.tempFilePath);
      imagen = {
        url: imagenSubida.secure_url,
        public_id: imagenSubida.public_id,
      };
    }

    const nuevoProducto = new Producto({
      producto: producto,
      tipoventa: tipoventa,
      tipoproducto: tipoproducto,
      imagen: imagen,
      usuario: req.usuario.id,
    });
    if (!nuevoProducto)
      return res.status(404).json(["no se pudo crear producto"]);
    const guardarProductoDB = await nuevoProducto.save();

    res.json(guardarProductoDB);
  } catch (error) {
    console.log(error);
    await fs.remove(req.files.imagen.tempFilePath);
    return res.status(500).json(["debe subir una imagen"]);
  }
};

export const PedirProductos = async (req, res) => {
  try {
    const buscarProductos = await Producto.find({
      usuario: req.usuario.id,
    }).populate("usuario");
    if (!buscarProductos)
      return res.status(401).json(["no se pudo encontrar los productos"]);
    res.json(buscarProductos);
  } catch (error) {
    console.log(error);
    return res.status(500).json(["error al buscar productos"]);
  }
};

export const PedirProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const buscarProducto = await Producto.findById(id).populate("usuario");
    if (!buscarProducto)
      return res.status(401).json(["no se pudo encontrar el producto"]);

    res.json(buscarProducto);
  } catch (error) {
    console.log(error);
    return res.status(404).json(["error al buscar el producto"]);
  }
};

export const ActualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { producto, tipoventa, tipoproducto } = req.body;
  try {
    const buscarImagen = await Producto.findById(id);
    if (buscarImagen.imagen.public_id) {
      await EliminarImagen(buscarImagen.imagen.public_id);
    }
    let imagen = null;
    if (req.files.imagen) {
      const actualizarImagen = await SubirImagen(req.files.imagen.tempFilePath);
      await fs.remove(req.files.imagen.tempFilePath);
      imagen = {
        url: actualizarImagen.secure_url,
        public_id: actualizarImagen.public_id,
      };
    }
    const actualizarProducto = await Producto.findByIdAndUpdate(
      id,
      {
        producto,
        tipoventa,
        tipoproducto,
        imagen: imagen,
      },
      { new: true }
    );
    if (!actualizarProducto)
      return res.status(401).json(["no se pudo actualizar producto"]);
    res.json(actualizarProducto);
  } catch (error) {
    console.log(error);
    await fs.remove(req.files.imagen.tempFilePath);
    return res.status(401).json(["debe subir una imagen"]);
  }
};

export const EliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminarProducto = await Producto.findByIdAndDelete(id);
    if (!eliminarProducto)
      return res.status(401).json(["no se pudo eliminar producto"]);

    if (eliminarProducto.imagen.public_id) {
      await EliminarImagen(eliminarProducto.imagen.public_id);
      //await fs.remove(req.files.imagen.tempFilePath);
    }

    return res.status(200).json(["producto eliminado"]);
  } catch (error) {
    console.log(error);
    return res.status(401).json(["error al eliminar"]);
  }
};

//CONTROLADOR PORTADA

export const CrearPortada = async (req, res) => {
  const { listaprecios, fecha, ofertas } = req.body;
  try {
    let imagen = null;

    if (req.files.imagen) {
      const subirPortada = await SubirImagen(req.files.imagen.tempFilePath);
      await fs.remove(req.files.imagen.tempFilePath);

      imagen = {
        url: subirPortada.secure_url,
        public_id: subirPortada.public_id,
      };
    }
    const nuevaPortada = new Portada({
      listaprecios: listaprecios,
      fecha: fecha,
      ofertas: ofertas,
      imagen: imagen,
      usuario: req.usuario.id,
    });

    if (!nuevaPortada)
      return res.status(401).json(["no se pudo crear portada"]);

    const PortadaGuardaDB = await nuevaPortada.save();
    res.json(PortadaGuardaDB);
  } catch (error) {
    console.log(error);
    await fs.remove(req.files.imagen.tempFilePath);
    return res.status(500).json(["debe subir una imagen"]);
  }
};

export const MostrarPortadas = async (req, res) => {
  try {
    const mostrarPortadas = await Portada.find({
      usuario: req.usuario.id,
    });

    if (!mostrarPortadas)
      return res.status(401).json({ Message: "no se pudo mostrar portadas" });

    res.json(mostrarPortadas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "error al mostrar las portadas" });
  }
};

export const MostrarPortada = async (req, res) => {
  const { id } = req.params;
  try {
    const mostrarPortada = await Portada.findById(id);
    if (!mostrarPortada)
      return res.status(401).json({ Message: "no se pudo mostrar la pórtada" });

    res.json(mostrarPortada);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "error al mostrar la portada" });
  }
};

export const ActualizarPortada = async (req, res) => {
  const { listaprecios, fecha, ofertas } = req.body;
  const { id } = req.params;
  try {
    const buscarImagen = await Portada.findById(id);
    if (buscarImagen.imagen.public_id) {
      await EliminarImagen(buscarImagen.imagen.public_id);
    }
    let imagen = null;
    if (req.files.imagen) {
      const ActualizarPortada = await SubirImagen(
        req.files.imagen.tempFilePath
      );
      await fs.remove(req.files.imagen.tempFilePath);
      imagen = {
        url: ActualizarPortada.secure_url,
        public_id: ActualizarPortada.public_id,
      };
    }

    const Actualizado = await Portada.findByIdAndUpdate(
      id,
      {
        listaprecios,
        fecha,
        ofertas,
        imagen: imagen,
      },
      {
        new: true,
      }
    );

    if (!Actualizado)
      return res.status(401).json(["no se pudo actualizar portada"]);

    res.json(Actualizado);
  } catch (error) {
    console.log(error);
    await fs.remove(req.files.imagen.tempFilePath);
    return res.status(500).json(["debe subir una imagen"]);
  }
};

export const EliminarPortada = async (req, res) => {
  const { id } = req.params;
  try {
    const EliminarPortada = await Portada.findByIdAndDelete(id);
    if (!EliminarPortada)
      return res
        .status(401)
        .json({ Message: "no se pudo eliminar la portada" });

    if (EliminarPortada.imagen.public_id) {
      await EliminarImagen(EliminarPortada.imagen.public_id);
    }

    return res.status(200).json({ Message: "portada eliminada" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "error al eliminar portada" });
  }
};

import mongoose from "mongoose";

const PortadaModel = new mongoose.Schema(
  {
    listaprecios: {
      type: String,
      require: true,
      trim: true,
    },
    fecha: {
      type: String,
      require: true,
      trim: true,
    },
    ofertas: {
      type: String,
      require: true,
      trim: true,
    },
    imagen: {
      url: String,
      public_id: String,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      require: true,
    },
  },
  {
    timestamps: {
      type: Date,
      default: Date.now,
    },
  }
);

export default mongoose.model("Portada", PortadaModel);

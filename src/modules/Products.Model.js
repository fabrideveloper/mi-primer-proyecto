import mongoose from "mongoose";

const ProductoModel = new mongoose.Schema(
  {
    producto: {
      type: String,
      require: true,
      trim: true,
    },
    tipoventa: {
      type: String,
      require: true,
      trim: true,
    },
    tipoproducto: {
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
export default mongoose.model("Producto", ProductoModel);

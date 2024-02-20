import mongoose from "mongoose";

const UsuarioModel = new mongoose.Schema(
  {
    usuario: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    contraseña: {
      type: String,
      require: true,
      trim: true,
    },
    provincia: {
      type: String,
      require: true,
      trim: true,
    },
    sexo: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Usuario", UsuarioModel);

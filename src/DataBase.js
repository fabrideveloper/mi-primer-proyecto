import dotenv from "dotenv";
import mongoose from "mongoose";
import { MONGODB_URI } from "./Config.js";

dotenv.config();

export const ConectarBaseDatos = async () => {
  try {
    const DataBase = await mongoose.connect(MONGODB_URI);
    console.log("base de datos conectada", DataBase.connection.name);
  } catch (error) {
    console.log(error);
  }
};

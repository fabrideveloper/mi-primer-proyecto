import axios from "./Axios";

export const PeticionRegister = (usuario) => axios.post("/register", usuario);

export const PeticionLogin = (usuario) => axios.post("/login", usuario);

export const PeticionVerifyToken = () => axios.get("/verificartoken");

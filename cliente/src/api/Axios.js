import axios from "axios";

const InstanciaAxios = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default InstanciaAxios;

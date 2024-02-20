import axios from "./Axios";

export const PeticionCrearPortada = async (portada) => {
  let formdata = new FormData();

  for (let key in portada) {
    formdata.append(key, portada[key]);
  }

  return await axios.post("/portada", formdata, {
    headers: {
      "Content-Type": "multipart/form/data",
    },
  });
};

export const PeticionActualizarPortada = async (portada, id) => {
  let formdata = new FormData();

  for (let key in portada) {
    formdata.append(key, portada[key]);
  }

  return await axios.put(`/portada/${id}`, formdata, {
    headers: {
      "Content-Type": "multipart/form/data",
    },
  });
};

export const PeticionPortadas = () => axios.get("/portadas");

export const PeticionPortada = (id) => axios.get(`/portada/${id}`);

export const PeticionEliminarPortada = (id) => axios.delete(`/portada/${id}`);

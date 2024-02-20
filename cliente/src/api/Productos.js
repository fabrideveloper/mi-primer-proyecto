import axios from "./Axios";

export const PeticionCrearProducto = async (producto) => {
  let formdata = new FormData();

  for (let key in producto) {
    formdata.append(key, producto[key]);
  }
  return await axios.post("/producto", formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const PeticionActualizarProducto = async (producto, id) => {
  let formdata = new FormData();
  for (let key in producto) {
    formdata.append(key, producto[key]);
  }
  return await axios.put(`/producto/${id}`, formdata, {
    headers: {
      "Content-Type": "multipart/form/data",
    },
  });
};

export const PeticionProductos = () => axios.get("/productos");

export const PeticionProducto = (id) => axios.get(`/producto/${id}`);

export const PeticionEliminarProducto = (id) => axios.delete(`/producto/${id}`);

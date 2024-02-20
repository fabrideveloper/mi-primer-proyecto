import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dywzq0ion",
  api_key: "493144698165362",
  api_secret: "gm4GTzC3992vn-V2U1t1N4kk22s",
});

export const SubirImagen = async (filepath) => {
  return await cloudinary.v2.uploader.upload(filepath, {
    folder: "productosOnRender",
  });
};

export const EliminarImagen = async (id) => {
  return await cloudinary.v2.uploader.destroy(id);
};

export const ActualizarImagen = async (URL) => {
  return await cloudinary.v2.uploader.explicit(URL, {
    type: "fetch",
    invalidate: true,
  });
};

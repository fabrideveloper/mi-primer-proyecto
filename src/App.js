import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import RouterAuth from "./routes/Auth.Routes.js";
import routesProductos from "./routes/Products.Routes.js";
import path from "path";
import fileupload from "express-fileupload";

const App = express();

App.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

App.use(morgan("dev"));
App.use(cookieParser());
App.use(express.json());
App.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "src/public/uploads",
  })
);

App.use("/api", RouterAuth);
App.use("/api", routesProductos);

export default App;

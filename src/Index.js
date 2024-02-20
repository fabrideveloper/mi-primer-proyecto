import App from "./App.js";
import { PORT } from "./Config.js";
import { ConectarBaseDatos } from "./DataBase.js";

ConectarBaseDatos();

App.listen(PORT);
console.log("server corriendo", PORT);

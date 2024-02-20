import { ProductosProvider } from "./contexto/ContextoProductos";
import { AuthProvider } from "./contexto/ContextoUsuarioAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./paginas/LoginPage";
import ProtectorRutas from "./ProtectorRutas";
import RegisterPage from "./paginas/RegisterPage";
import ProductosPage from "./paginas/ProductosPage";
import FormularioProductos from "./paginas/FormularioProductos";
import NavBar from "./componentes/NavBar";
import HomePage from "./paginas/HomePage";
import ProtectorRutaRegister from "./ProtectorRutaRegister";

function App() {
  return (
    <div>
      <AuthProvider>
        <ProductosProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/admin" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectorRutas />}>
                <Route path="/productos" element={<ProductosPage />} />
                <Route
                  path="/productos/formularios"
                  element={<FormularioProductos />}
                />
                <Route
                  path="/portadas/formularios"
                  element={<FormularioProductos />}
                />
                <Route
                  path="/productos/actualizar/:id"
                  element={<FormularioProductos />}
                />
                <Route
                  path="/portadas/actualizar/:id"
                  element={<FormularioProductos />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProductosProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

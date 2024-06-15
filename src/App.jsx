import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import PrivateLayout from "./layout/PrivateLayout";

import Login from "./paginas/login";
import OlvidePassword from "./paginas/OlvidePassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import Registrar from "./paginas/Registrar";
import NuevoPassword from "./paginas/NuevoPassword";

import AdministrarPacientes from "./paginas/AdministrarPacientes";
import VerCita from "./paginas/VerCita";
import VerPacientes from "./paginas/VerPacientes";
import CrearPacientes from "./paginas/CrearPacientes";
import EditarPerfil from "./paginas/EditarPerfil";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";
import CambiarPassword from "./paginas/CambiarPassword";
function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
          <PacientesProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Login />} />
                  <Route path="registrar" element={<Registrar />} />
                  <Route path="olvide-password" element={<OlvidePassword />} />
                  <Route path="olvide-password/:token" element={<NuevoPassword />} />
                  <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              </Route>
              <Route path="/admin" element={<PrivateLayout/>}>
                <Route index element={<AdministrarPacientes/>}/>
                <Route path="pacientes" element={<VerPacientes/>}/>
                <Route path="crear-pacientes" element={<CrearPacientes/>}/>
                <Route path="pacientes/:id" element={<VerCita/>}/>
                <Route path="perfil" element={<EditarPerfil/>}/>
                <Route path="cambiar-password" element={<CambiarPassword/>}/>
                
              </Route>
            </Routes>
          </PacientesProvider>

        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

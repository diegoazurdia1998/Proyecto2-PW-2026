import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./app/pages/Home";
import { About } from "./app/pages/About";      // ← agregar
import { Login } from "./app/pages/Login";
import { Register } from "./app/pages/Register";
import { Contact } from "./app/pages/Contact";
import { FAQ } from "./app/pages/FAQ";
import { ClientDashboard } from "./app/pages/ClientDashboard";
import { NewShipment } from "./app/pages/NewShipment";
import { AdminDashboard } from "./app/pages/AdminDashboard";
import { AdminCRUD } from "./app/pages/AdminCRUD";   // ← agregar
import { NotFound } from "./app/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<About />} />    {/* ← agregar */}
        <Route path="/contacto" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Auth */}
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registrarse" element={<Register />} />

        {/* Cliente */}
        <Route path="/mis-envios" element={<ClientDashboard />} />
        <Route path="/nuevo-envio" element={<NewShipment />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/usuarios-envios" element={<AdminCRUD />} />  {/* ← agregar */}

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

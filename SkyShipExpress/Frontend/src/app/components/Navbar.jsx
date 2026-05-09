import { Link, useLocation } from "react-router";
import { Package } from "lucide-react";

export function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#00AEEF] flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1B2A4A]">SkyShip Express</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors ${isActive('/') ? 'text-[#00AEEF]' : 'text-[#2D2D2D] hover:text-[#00AEEF]'}`}
            >
              Inicio
            </Link>
            <Link
              to="/nosotros"
              className={`transition-colors ${isActive('/nosotros') ? 'text-[#00AEEF]' : 'text-[#2D2D2D] hover:text-[#00AEEF]'}`}
            >
              Nosotros
            </Link>
            <Link
              to="/faq"
              className={`transition-colors ${isActive('/faq') ? 'text-[#00AEEF]' : 'text-[#2D2D2D] hover:text-[#00AEEF]'}`}
            >
              FAQ
            </Link>
            <Link
              to="/contacto"
              className={`transition-colors ${isActive('/contacto') ? 'text-[#00AEEF]' : 'text-[#2D2D2D] hover:text-[#00AEEF]'}`}
            >
              Contacto
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/iniciar-sesion"
              className="px-5 py-2.5 border-2 border-[#1B2A4A] text-[#1B2A4A] rounded-lg hover:bg-[#1B2A4A] hover:text-white transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/registrarse"
              className="px-5 py-2.5 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

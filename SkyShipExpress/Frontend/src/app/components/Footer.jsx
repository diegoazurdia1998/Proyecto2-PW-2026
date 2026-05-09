import { Link } from "react-router";
import { Package, Globe, Camera, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1B2A4A] text-white mt-20">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="grid grid-cols-4 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#00AEEF] flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">SkyShip Express</span>
            </div>
            <p className="text-sm text-gray-300">
              La solución de paquetería más confiable de Guatemala
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Navegación</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="text-gray-300 hover:text-[#00AEEF] transition-colors">Inicio</Link>
              <Link to="/nosotros" className="text-gray-300 hover:text-[#00AEEF] transition-colors">Nosotros</Link>
              <Link to="/faq" className="text-gray-300 hover:text-[#00AEEF] transition-colors">FAQ</Link>
              <Link to="/contacto" className="text-gray-300 hover:text-[#00AEEF] transition-colors">Contacto</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contacto</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <p>15 Avenida 10-20, Zona 10</p>
              <p>Ciudad de Guatemala</p>
              <p>+502 2345-6789</p>
              <p>info@skyshipexpress.com.gt</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Redes Sociales</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00AEEF] transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00AEEF] transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00AEEF] transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-300">
          © 2026 SkyShip Express Guatemala. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

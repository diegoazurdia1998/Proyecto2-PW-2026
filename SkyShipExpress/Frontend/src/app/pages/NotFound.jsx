import { Link } from "react-router";
import { PackageX } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
      <div className="text-center">
        <PackageX className="w-24 h-24 text-[#00AEEF] mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-[#1B2A4A] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">Página no encontrada</h2>
        <p className="text-[#2D2D2D] mb-8">
          Lo sentimos, la página que buscás no existe o fue movida.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

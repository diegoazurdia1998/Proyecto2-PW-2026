import { useState } from "react";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Truck, Globe, Zap, MapPin, Search } from "lucide-react";

export function Home() {
  const [trackingCode, setTrackingCode] = useState("");

  return (
    <div>
      <Navbar />

      <section className="bg-gradient-to-br from-[#1B2A4A] to-[#2a4070] text-white py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Envía tus paquetes con SkyShip Express
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              La solución de paquetería más confiable de Guatemala
            </p>
            <div className="flex gap-4">
              <Link
                to="/nuevo-envio"
                className="px-8 py-3 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors"
              >
                Cotizar Envío
              </Link>
              <Link
                to="/registrarse"
                className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#1B2A4A] transition-colors"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-8 -mt-12">
        <div className="bg-white rounded-xl shadow-lg p-6 flex gap-4 items-center">
          <div className="flex-1">
            <label className="block text-sm text-[#2D2D2D] mb-2">
              Ingresa tu código de guía
            </label>
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Ej: SKY123456789GT"
              className="w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
            />
          </div>
          <button className="px-8 py-3 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors flex items-center gap-2 mt-6">
            <Search className="w-5 h-5" />
            Rastrear
          </button>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-8 py-20">
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-[#00AEEF]" />
            </div>
            <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Envío Nacional</h3>
            <p className="text-sm text-[#2D2D2D]">
              Cobertura en los 22 departamentos de Guatemala
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-[#00AEEF]" />
            </div>
            <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Envío Internacional</h3>
            <p className="text-sm text-[#2D2D2D]">
              Conexiones con Centroamérica y el mundo
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#00AEEF]" />
            </div>
            <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Envío Express</h3>
            <p className="text-sm text-[#2D2D2D]">
              Entrega el mismo día en zonas metropolitanas
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-[#00AEEF]" />
            </div>
            <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Rastreo en Tiempo Real</h3>
            <p className="text-sm text-[#2D2D2D]">
              Seguí tu paquete en cada paso del camino
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

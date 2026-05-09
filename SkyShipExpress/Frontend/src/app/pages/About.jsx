import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Target, Eye, Shield, Users, Lightbulb, Award } from "lucide-react";

export function About() {
  return (
    <div>
      <Navbar />

      <section className="bg-gradient-to-br from-[#1B2A4A] to-[#2a4070] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-4xl font-bold text-center">
            Conectando Guatemala con el mundo
          </h1>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="grid grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">Nuestra Historia</h2>
            <p className="text-[#2D2D2D] leading-relaxed">
              Fundada en 2015 en Ciudad de Guatemala, SkyShip Express nació con la visión de revolucionar
              la logística y paquetería en Guatemala. Comenzamos con una pequeña flota y un gran sueño:
              conectar cada rincón del país con un servicio confiable y eficiente. Hoy, con presencia en
              los 22 departamentos de Guatemala, somos el socio logístico de confianza para miles de
              guatemaltecos y empresas que necesitan que sus envíos lleguen a tiempo, cada vez.
            </p>
          </div>
          <div className="bg-[#F7F8FA] rounded-xl p-8">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop"
              alt="Equipo SkyShip Express"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-[#00AEEF]" />
            </div>
            <h3 className="text-xl font-bold text-[#1B2A4A] mb-3">Misión</h3>
            <p className="text-[#2D2D2D]">
              Proveer soluciones de paquetería y logística de clase mundial, conectando a Guatemala
              con el resto del mundo mediante un servicio confiable, seguro y eficiente que supere
              las expectativas de nuestros clientes.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-[#00AEEF]" />
            </div>
            <h3 className="text-xl font-bold text-[#1B2A4A] mb-3">Visión</h3>
            <p className="text-[#2D2D2D]">
              Ser la empresa de paquetería líder en Guatemala y Centroamérica, reconocida por nuestra
              innovación tecnológica, excelencia operativa y compromiso inquebrantable con la satisfacción
              de nuestros clientes.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-8 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#00AEEF]" />
              </div>
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Confianza</h3>
              <p className="text-sm text-[#2D2D2D]">
                Cada envío es tratado con el máximo cuidado y responsabilidad, garantizando que llegue
                a su destino en perfectas condiciones.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-[#00AEEF]" />
              </div>
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Innovación</h3>
              <p className="text-sm text-[#2D2D2D]">
                Adoptamos las últimas tecnologías para optimizar procesos y brindar la mejor experiencia
                a nuestros clientes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#00AEEF]" />
              </div>
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Seguridad</h3>
              <p className="text-sm text-[#2D2D2D]">
                Implementamos rigurosos protocolos de seguridad en cada etapa del proceso logístico
                para proteger tus envíos.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#00AEEF]" />
              </div>
              <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">Compromiso</h3>
              <p className="text-sm text-[#2D2D2D]">
                Nos comprometemos con nuestros clientes, colaboradores y comunidades para construir
                un futuro mejor juntos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

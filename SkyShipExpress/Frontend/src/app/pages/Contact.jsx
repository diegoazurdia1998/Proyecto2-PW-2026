import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name ? "" : "Este campo es requerido",
      email: formData.email ? "" : "Este campo es requerido",
      subject: formData.subject ? "" : "Este campo es requerido",
      message: formData.message ? "" : "Este campo es requerido"
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      alert("Mensaje enviado con éxito. Nos pondremos en contacto pronto.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div>
      <Navbar />

      <section className="bg-gradient-to-br from-[#1B2A4A] to-[#2a4070] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-4xl font-bold text-center">Contacto</h1>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">Envianos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Nombre completo</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name ? 'ring-2 ring-red-500' : 'focus:ring-[#00AEEF]'
                  }`}
                  placeholder="Juan Pérez"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Correo electrónico</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email ? 'ring-2 ring-red-500' : 'focus:ring-[#00AEEF]'
                  }`}
                  placeholder="juan@ejemplo.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Asunto</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 ${
                    errors.subject ? 'ring-2 ring-red-500' : 'focus:ring-[#00AEEF]'
                  }`}
                >
                  <option value="">Seleccioná un asunto</option>
                  <option value="cotizacion">Cotización de envío</option>
                  <option value="seguimiento">Seguimiento de paquete</option>
                  <option value="reclamo">Reclamo o queja</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Mensaje</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className={`w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 ${
                    errors.message ? 'ring-2 ring-red-500' : 'focus:ring-[#00AEEF]'
                  }`}
                  placeholder="Escribí tu mensaje aquí..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">Información de contacto</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#00AEEF]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] mb-1">Dirección</h3>
                  <p className="text-[#2D2D2D]">15 Avenida 10-20, Zona 10</p>
                  <p className="text-[#2D2D2D]">Ciudad de Guatemala</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#00AEEF]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] mb-1">Horario</h3>
                  <p className="text-[#2D2D2D]">Lunes a Viernes: 8:00 AM – 6:00 PM</p>
                  <p className="text-[#2D2D2D]">Sábado: 8:00 AM – 12:00 PM</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#00AEEF]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] mb-1">Teléfono</h3>
                  <p className="text-[#2D2D2D]">+502 2345-6789</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-[#00AEEF]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] mb-1">WhatsApp</h3>
                  <p className="text-[#2D2D2D]">+502 5678-9012</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#00AEEF]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2A4A] mb-1">Email</h3>
                  <p className="text-[#2D2D2D]">info@skyshipexpress.com.gt</p>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="font-bold text-[#1B2A4A] mb-3">Redes Sociales</h3>
                <div className="flex gap-3">
                  <a href="#" className="text-[#00AEEF] hover:text-[#0098d1]">Facebook</a>
                  <span className="text-gray-300">•</span>
                  <a href="#" className="text-[#00AEEF] hover:text-[#0098d1]">Instagram</a>
                  <span className="text-gray-300">•</span>
                  <a href="#" className="text-[#00AEEF] hover:text-[#0098d1]">WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

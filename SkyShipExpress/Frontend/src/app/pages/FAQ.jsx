import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Search, ChevronDown } from "lucide-react";

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [openIndex, setOpenIndex] = useState(null);

  const categories = ["Todos", "Envíos", "Pagos", "Seguimiento", "Cuentas"];

  const faqs = [
    {
      category: "Envíos",
      question: "¿Hacen envíos a todos los departamentos de Guatemala?",
      answer: "Sí, tenemos cobertura completa en los 22 departamentos de Guatemala. Nuestras rutas llegan desde Petén hasta San Marcos, incluyendo áreas rurales y urbanas."
    },
    {
      category: "Pagos",
      question: "¿Cuáles son los métodos de pago aceptados?",
      answer: "Aceptamos efectivo, tarjetas de crédito y débito (Visa, Mastercard), transferencias bancarias y pagos móviles. También ofrecemos la opción de pago contra entrega en áreas metropolitanas."
    },
    {
      category: "Envíos",
      question: "¿Cuánto tarda un envío de Guatemala City a Quetzaltenango?",
      answer: "Un envío estándar tarda entre 24 a 48 horas. Con nuestro servicio Express, podemos realizar la entrega en menos de 24 horas."
    },
    {
      category: "Seguimiento",
      question: "¿Cómo puedo rastrear mi paquete?",
      answer: "Podés rastrear tu paquete ingresando el código de guía en nuestra página principal o en la sección 'Rastrear Envío'. Recibirás actualizaciones en tiempo real sobre la ubicación de tu paquete."
    },
    {
      category: "Cuentas",
      question: "¿Necesito crear una cuenta para enviar paquetes?",
      answer: "No es obligatorio, pero te recomendamos crear una cuenta para acceder a beneficios como historial de envíos, cotizaciones guardadas, y descuentos exclusivos para clientes frecuentes."
    },
    {
      category: "Envíos",
      question: "¿Cuál es el peso máximo permitido por paquete?",
      answer: "Aceptamos paquetes de hasta 50 kg para envíos estándar. Para cargas mayores, ofrecemos nuestro servicio de carga especializada. Contactá a nuestro equipo para más información."
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "Todos" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <Navbar />

      <section className="bg-gradient-to-br from-[#1B2A4A] to-[#2a4070] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-4xl font-bold text-center mb-8">Preguntas Frecuentes</h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿En qué podemos ayudarte?"
              className="w-full pl-12 pr-4 py-3 bg-white text-[#2D2D2D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
            />
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="flex gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeCategory === category
                  ? 'bg-[#00AEEF] text-white'
                  : 'bg-[#F7F8FA] text-[#2D2D2D] hover:bg-[#e5e7eb]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F7F8FA] transition-colors"
              >
                <span className="text-left font-medium text-[#1B2A4A]">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#00AEEF] transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-[#2D2D2D]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#F7F8FA] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-[#2D2D2D] mb-6">
            Nuestro equipo de soporte está listo para ayudarte
          </p>
          <a
            href="/contacto"
            className="inline-block px-8 py-3 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors"
          >
            Contáctanos
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

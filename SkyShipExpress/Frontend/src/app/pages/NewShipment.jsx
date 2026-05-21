import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Package, Plus, User, LogOut, Calculator } from "lucide-react";

export function NewShipment() {
  const location = useLocation();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    recipient_name: "",
    recipient_address: "",
    recipient_phone: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    package_type: "",
    insurance: false,
    urgent: false,
    pickup: false
  });

  const [user] = useState({
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("userRole") || "",
    token: localStorage.getItem("token") || ""
  });

  const cities = [
    "Guatemala",
    "Quetzaltenango",
    "Escuintla",
    "Cobán",
    "Huehuetenango",
    "Antigua Guatemala",
    "Petén",
    "Mazatenango",
    "Jalapa",
    "Chimaltenango"
  ];

  const calculateCost = () => {
    const { length, width, height, weight, insurance, urgent, pickup } = formData;

    // Si no hay datos, costo 0
    if (!weight && (!length || !width || !height)) return 0;

    // Costo por peso
    const weightCost = weight ? parseFloat(weight) * 15 : 0;

    // Costo por volumen (ejemplo: 6000 cm³ = 1 kg equivalente)
    let volumeCost = 0;
    if (length && width && height) {
      const volume = length * width * height; // cm³
      const volumetricWeight = volume / 6000; // factor de conversión
      volumeCost = volumetricWeight * 15;
    }

    // Tomar el mayor entre peso y volumen
    let cost = Math.max(weightCost, volumeCost);

    // Extras
    if (insurance) cost += 25;
    if (urgent) cost += 50;
    if (pickup) cost += 30;

    return cost.toFixed(2);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch('http://127.0.0.1:5000/api/shipments/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        origin: formData.origin,
        destination: formData.destination,
        recipient_name: formData.recipient_name, // Mapeo a snake_case del modelo
        recipient_address: formData.recipient_address,
        recipient_phone: formData.recipient_phone,
        weight: parseFloat(formData.weight),
        package_type: formData.package_type,
        cost: calculateCost()
      })
    });

    if (response.ok) {
      const result = await response.json();
      alert(`Envío generado. Código: ${result.code}`);
      window.location.href = "/mis-envios";
    }
  };
// Obtener iniciales a partir del nombre
  const getInitials = (fullName) => {
    if (!fullName) return "U";
    const parts = fullName.trim().split(/\s+/);
    return parts.slice(0, 2).map(p => p[0]?.toUpperCase() || "").join("") || "U";
  };
  // Función para calcular tipo de paquete
  const calcularTipoPaquete = (largo, ancho, alto) => {
    const volumen = largo * ancho * alto; // cm³

    if (volumen <= 1000) return "sobre";            // Ejemplo: sobres pequeños
    if (volumen <= 10000) return "caja-pequena";    // hasta 10 mil cm³
    if (volumen <= 30000) return "caja-mediana";    // hasta 30 mil cm³
    if (volumen <= 60000) return "caja-grande";     // hasta 60 mil cm³
    return "carga";                                 // más grande
  };
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <nav className="bg-white border-b border-gray-200">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#00AEEF] flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1B2A4A]">SkyShip Express</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00AEEF] flex items-center justify-center text-white font-bold">
              {getInitials(user.name)}
            </div>
            <div>
              <div className="text-sm font-medium text-[#1B2A4A]">{user.name}</div>
              <div className="text-xs text-gray-500">{user.role}</div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <Link
              to="/mis-envios"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === "/mis-envios"
                  ? "bg-[#00AEEF] text-white"
                  : "text-[#2D2D2D] hover:bg-[#F7F8FA]"
              }`}
            >
              <Package className="w-5 h-5" />
              Mis Envíos
            </Link>
            <Link
              to="/nuevo-envio"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === "/nuevo-envio"
                  ? "bg-[#00AEEF] text-white"
                  : "text-[#2D2D2D] hover:bg-[#F7F8FA]"
              }`}
            >
              <Plus className="w-5 h-5" />
              Nuevo Envío
            </Link>

            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-[#1B2A4A] mb-6">Nuevo Envío</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Ciudad de origen</label>
                <select
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  required
                >
                  <option value="">Seleccioná una ciudad</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Ciudad de destino</label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  required
                >
                  <option value="">Seleccioná una ciudad</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Nombre del destinatario</label>
                <input
                    type="text"
                    value={formData.recipient_name}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, recipient_name: value });

                      // Validaciones
                      if (!value.trim()) {
                        setError({ ...error, recipient_name: "El nombre no puede estar vacío" });
                      } else if (value.trim().length < 5) {
                        setError({ ...error, recipient_name: "Debe tener al menos 5 caracteres" });
                      } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
                        setError({ ...error, recipient_name: "Solo se permiten letras y espacios" });
                      } else if (value.trim().split(" ").length < 2) {
                        setError({ ...error, recipient_name: "Debe incluir al menos nombre y apellido" });
                      } else {
                        setError({ ...error, recipient_name: null });
                      }
                    }}
                    className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${
                        error.recipient_name ? 'ring-2 ring-red-500' : 'focus:ring-[#00AEEF]'
                    }`}
                    placeholder="Nombre completo"
                    required
                />
                {error.recipient_name && (
                    <p className="text-red-500 text-sm mt-1">{error.recipient_name}</p>
                )}

              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Dirección de entrega</label>
                <input
                    type="text"
                    value={formData.recipient_address}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, recipient_address: value });

                      // Validaciones
                      if (!value.trim()) {
                        setError({ ...error, recipient_address: "La dirección no puede estar vacía" });
                      } else if (value.trim().length < 5) {
                        setError({ ...error, recipient_address: "Debe tener al menos 5 caracteres" });
                      } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,#-]+$/.test(value)) {
                        setError({ ...error, recipient_address: "Solo se permiten letras, números y símbolos comunes (.,-#)" });
                      } else if (!/\d/.test(value)) {
                        setError({ ...error, recipient_address: "Debe incluir al menos un número (ej. Zona 10, Calle 5)" });
                      } else {
                        setError({ ...error, recipient_address: null });
                      }
                    }}
                    className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${
                        error.recipient_address ? 'ring-2 ring-red-500' : 'focus:ring-[#00AEEF]'
                    }`}
                    placeholder="Zona, Municipio, Departamento"
                    required
                />
                {error.recipient_address && (
                    <p className="text-red-500 text-sm mt-1">{error.recipient_address}</p>
                )}

              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Teléfono del destinatario</label>
                <input
                    type="tel"
                    value={formData.recipient_phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, recipient_phone: value });

                      // Validaciones
                      const cleanValue = value.replace(/\s|-/g, ""); // quitar espacios y guiones
                      if (!cleanValue.trim()) {
                        setError({ ...error, recipient_phone: "El teléfono no puede estar vacío" });
                      } else if (!/^\+?\d+$/.test(cleanValue)) {
                        setError({ ...error, recipient_phone: "Solo se permiten dígitos y el prefijo +" });
                      } else if (cleanValue.startsWith("+502") && cleanValue.length !== 12) {
                        setError({ ...error, recipient_phone: "El número con prefijo +502 debe tener 12 caracteres" });
                      } else if (!cleanValue.startsWith("+") && cleanValue.length !== 8) {
                        setError({ ...error, recipient_phone: "El número debe tener 8 dígitos" });
                      } else {
                        setError({ ...error, recipient_phone: null });
                      }
                    }}
                    className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${
                        error.recipient_phone ? 'ring-2 ring-red-500' : 'focus:ring-[#00AEEF]'
                    }`}
                    placeholder="+502 1234-5678"
                    required
                />
                {error.recipient_phone && (
                    <p className="text-red-500 text-sm mt-1">{error.recipient_phone}</p>
                )}

              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2D2D2D] mb-2">Largo (cm)</label>
                  <input
                    type="number"
                    value={formData.length}
                    onChange={(e) => {
                      let value = Number(e.target.value);
                      if (value < 0) value = 0;
                      const newForm = { ...formData, length: value };
                      const tipo = calcularTipoPaquete(newForm.length, newForm.width, newForm.height);
                      setFormData({ ...newForm, package_type: tipo });
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2D2D2D] mb-2">Ancho (cm)</label>
                  <input
                    type="number"
                    value={formData.width}
                    onChange={(e) => {
                      let value = Number(e.target.value);
                      if (value < 0) value = 0;
                      const newForm = { ...formData, width: value };
                      const tipo = calcularTipoPaquete(newForm.length, newForm.width, newForm.height);
                      setFormData({ ...newForm, package_type: tipo });
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2D2D2D] mb-2">Alto (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => {
                      let value = Number(e.target.value);
                      if (value < 0) value = 0;
                      const newForm = { ...formData, height: value };
                      const tipo = calcularTipoPaquete(newForm.length, newForm.width, newForm.height);
                      setFormData({ ...newForm, package_type: tipo });
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2D2D2D] mb-2">Peso (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) =>
                    {
                      let value = Number(e.target.value);
                      if (value < 0) value = 0;
                      setFormData({ ...formData, weight: value })
                    }}

                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Tipo de paquete</label>

                <select
                    value={formData.package_type}
                    onChange={(e) => setFormData({ ...formData, package_type: e.target.value })}
                    disabled={formData.width>0 && formData.length>0 && formData.height}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    required
                >
                  <option value="">Seleccioná el tipo</option>
                  <option value="sobre">Sobre</option>
                  <option value="caja-pequena">Caja Pequeña</option>
                  <option value="caja-mediana">Caja Mediana</option>
                  <option value="caja-grande">Caja Grande</option>
                  <option value="carga">Carga</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-3">Extras</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.insurance}
                      onChange={(e) => setFormData({ ...formData, insurance: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#00AEEF] focus:ring-[#00AEEF]"
                    />
                    <span className="text-sm text-[#2D2D2D]">Seguro de envío (+Q 25.00)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.urgent}
                      onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#00AEEF] focus:ring-[#00AEEF]"
                    />
                    <span className="text-sm text-[#2D2D2D]">Entrega Urgente (+Q 50.00)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.pickup}
                      onChange={(e) => setFormData({ ...formData, pickup: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#00AEEF] focus:ring-[#00AEEF]"
                    />
                    <span className="text-sm text-[#2D2D2D]">Recolección a Domicilio (+Q 30.00)</span>
                  </label>
                </div>
              </div>

              <div className="bg-[#F7F8FA] rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-[#00AEEF]" />
                  <span className="text-sm text-[#2D2D2D]">Costo Estimado</span>
                </div>
                <div className="text-3xl font-bold text-[#1B2A4A]">Q {calculateCost()}</div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors"
              >
                Generar Envío
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

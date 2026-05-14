import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Package, Plus, User, LogOut, Calculator } from "lucide-react";

export function NewShipment() {
  const location = useLocation();

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
    if (!formData.weight) return 0;
    let cost = parseFloat(formData.weight) * 15;
    if (formData.insurance) cost += 25;
    if (formData.urgent) cost += 50;
    if (formData.pickup) cost += 30;
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
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#2D2D2D] hover:bg-[#F7F8FA] transition-colors"
            >
              <User className="w-5 h-5" />
              Mi Perfil
            </a>
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
                  onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  placeholder="Nombre completo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Dirección de entrega</label>
                <input
                  type="text"
                  value={formData.recipient_address}
                  onChange={(e) => setFormData({ ...formData, recipient_address: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  placeholder="Zona, Municipio, Departamento"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Teléfono del destinatario</label>
                <input
                  type="tel"
                  value={formData.recipient_phone}
                  onChange={(e) => setFormData({ ...formData, recipient_phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  placeholder="+502 1234-5678"
                  required
                />
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2D2D2D] mb-2">Largo (cm)</label>
                  <input
                    type="number"
                    value={formData.length}
                    onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2D2D2D] mb-2">Ancho (cm)</label>
                  <input
                    type="number"
                    value={formData.width}
                    onChange={(e) => setFormData({ ...formData, width: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2D2D2D] mb-2">Peso (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
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

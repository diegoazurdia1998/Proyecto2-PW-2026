import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Package, Plus, User, LogOut, Calculator } from "lucide-react";

export function NewShipment() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    recipientName: "",
    recipientAddress: "",
    recipientPhone: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    packageType: "",
    insurance: false,
    urgent: false,
    pickup: false
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

 const handleSubmit = (e) => {
    e.preventDefault();
    alert("Envío generado con éxito. Código de guía: SKY" + Math.floor(Math.random() * 1000000000) + "GT");
    window.location.href = "/mis-envios";
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
              JP
            </div>
            <div>
              <div className="text-sm font-medium text-[#1B2A4A]">Juan Pérez</div>
              <div className="text-xs text-gray-500">Cliente</div>
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
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  placeholder="Nombre completo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Dirección de entrega</label>
                <input
                  type="text"
                  value={formData.recipientAddress}
                  onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  placeholder="Zona, Municipio, Departamento"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#2D2D2D] mb-2">Teléfono del destinatario</label>
                <input
                  type="tel"
                  value={formData.recipientPhone}
                  onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
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
                  value={formData.packageType}
                  onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
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

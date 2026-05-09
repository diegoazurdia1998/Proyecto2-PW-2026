import { Link, useLocation } from "react-router";
import { Package, Plus, User, LogOut, PackageOpen } from "lucide-react";

export function ClientDashboard() {
  const location = useLocation();

  const shipments = [
    {
      code: "SKY123456789GT",
      destination: "Quetzaltenango",
      date: "2026-05-05",
      status: "En Tránsito",
      cost: "Q 125.00"
    },
    {
      code: "SKY987654321GT",
      destination: "Escuintla",
      date: "2026-05-03",
      status: "Entregado",
      cost: "Q 85.00"
    },
    {
      code: "SKY456789123GT",
      destination: "Petén",
      date: "2026-05-01",
      status: "Pendiente",
      cost: "Q 250.00"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "En Tránsito":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Entregado":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-[#1B2A4A]">Mis Envíos</h1>
            <Link
              to="/nuevo-envio"
              className="px-6 py-3 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nuevo Envío
            </Link>
          </div>

          {shipments.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F7F8FA]">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">
                      Código de Guía
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">
                      Destino
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">
                      Fecha de Creación
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">
                      Estado
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">
                      Costo Estimado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-[#F7F8FA] transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-sm text-[#00AEEF]">
                        {shipment.code}
                      </td>
                      <td className="px-6 py-4 text-[#2D2D2D]">{shipment.destination}</td>
                      <td className="px-6 py-4 text-[#2D2D2D]">{shipment.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            shipment.status
                          )}`}
                        >
                          {shipment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-[#1B2A4A]">{shipment.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <PackageOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-[#1B2A4A] mb-2">
                Aún no tenés envíos registrados
              </h2>
              <p className="text-[#2D2D2D] mb-6">
                Creá tu primer envío para comenzar a utilizar nuestro servicio
              </p>
              <Link
                to="/nuevo-envio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors"
              >
                <Plus className="w-5 h-5" />
                Crear Nuevo Envío
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

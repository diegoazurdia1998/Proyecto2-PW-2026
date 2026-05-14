import { Link, useLocation } from "react-router";
import { Package, Plus, User, LogOut, PackageOpen } from "lucide-react";
import {useEffect, useRef, useState} from "react";

export function ClientDashboard()
{
  const location = useLocation();

  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");
  const [user] = useState({
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("userRole") || "",
    token: localStorage.getItem("token") || ""
  });

  // Evita actualizar estado si el componente ya se desmontó
  const mountedRef = useRef(false);
  // Evita lanzar múltiples fetches simultáneos
  //const inFlightRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const token = user.token;
    if (!token) { window.location.href = "/iniciar-sesion"; return; }

    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      console.log("Starting fetch /api/shipments/list", new Date().toISOString());
      try {
        const res = await fetch("http://127.0.0.1:5000/api/shipments/list", {
          headers: { Authorization: `Bearer ${token}` },
          signal
        });

        console.log("Response status:", res.status);
        console.log("Response headers:", [...res.headers.entries()]);

        // Intentar leer como texto primero para ver si hay algo raro
        const raw = await res.text();
        console.log("Raw response length:", raw?.length);
        console.log("Raw response preview:", raw?.slice(0, 1000));

        // Si es JSON válido, parsear y usarlo
        try {
          const parsed = JSON.parse(raw);
          console.log("Parsed JSON:", Array.isArray(parsed) ? `array(${parsed.length})` : typeof parsed);
          if (mountedRef.current) setShipments(Array.isArray(parsed) ? parsed : []);
        } catch (parseErr) {
          console.warn("No JSON parseable body:", parseErr);
          if (mountedRef.current) {
            setServerError("Respuesta inválida del servidor (no JSON). Revisa el backend.");
            setShipments([]);
          }
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted (controller).");
        } else {
          console.error("Fetch error:", err);
          if (mountedRef.current) {
            setServerError("No se pudo conectar con el servidor.");
            setShipments([]);
          }
        }
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    })();

    //return () => controller.abort();
  }, [user.token]);

  // Obtener iniciales a partir del nombre
  const getInitials = (fullName) => {
    if (!fullName) return "U";
    const parts = fullName.trim().split(/\s+/);
    return parts.slice(0, 2).map(p => p[0]?.toUpperCase() || "").join("") || "U";
  };

  // Formateo simple de fecha (ajusta según el formato que devuelva el backend)
  const formatDate = (isoOrString) => {
    if (!isoOrString) return "-";
    const d = new Date(isoOrString);
    if (isNaN(d)) return isoOrString;
    return d.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pendiente": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "En Tránsito": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Entregado": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    window.location.href = "/";
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
                <div className="text-sm font-medium text-[#1B2A4A]">{user.name || "Usuario"}</div>
                <div className="text-xs text-gray-500">{user.role || "Cliente"}</div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
            <nav className="p-4 space-y-2">
              <Link to="/mis-envios" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === "/mis-envios" ? "bg-[#00AEEF] text-white" : "text-[#2D2D2D] hover:bg-[#F7F8FA]"}`}>
                <Package className="w-5 h-5" /> Mis Envíos
              </Link>
              <Link to="/nuevo-envio" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === "/nuevo-envio" ? "bg-[#00AEEF] text-white" : "text-[#2D2D2D] hover:bg-[#F7F8FA]"}`}>
                <Plus className="w-5 h-5" /> Nuevo Envío
              </Link>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#2D2D2D] hover:bg-[#F7F8FA]">
                <User className="w-5 h-5" /> Mi Perfil
              </a>
              <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-5 h-5" /> Cerrar Sesión
              </button>
            </nav>
          </aside>

          <main className="flex-1 p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-[#1B2A4A]">Mis Envíos</h1>
              <Link to="/nuevo-envio" className="px-6 py-3 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" /> Nuevo Envío
              </Link>
            </div>

            {loading ? (
                <div className="p-8 text-center">Cargando envíos...</div>
            ) : serverError ? (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-red-600">{serverError}</div>
            ) : shipments.length > 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#F7F8FA]">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Código de Guía</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Destino</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Fecha de Creación</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Estado</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Costo Estimado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {shipments.map((s) => (
                        <tr key={s.id} className="border-t border-gray-200 hover:bg-[#F7F8FA] transition-colors">
                          <td className="px-6 py-4 font-mono text-sm text-[#00AEEF]">{s.code}</td>
                          <td className="px-6 py-4 text-[#2D2D2D]">{s.destination}</td>
                          <td className="px-6 py-4 text-[#2D2D2D]">{formatDate(s.created_at || s.date)}</td>
                          <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(s.status)}`}>{s.status}</span></td>
                          <td className="px-6 py-4 font-medium text-[#1B2A4A]">{s.cost}</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <PackageOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-[#1B2A4A] mb-2">Aún no tienes envíos registrados</h2>
                  <p className="text-[#2D2D2D] mb-6">Creá tu primer envío para comenzar a utilizar nuestro servicio</p>
                  <Link to="/nuevo-envio" className="inline-flex items-center gap-2 px-6 py-3 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors">
                    <Plus className="w-5 h-5" /> Crear Nuevo Envío
                  </Link>
                </div>
            )}
          </main>
        </div>
      </div>
  );
}
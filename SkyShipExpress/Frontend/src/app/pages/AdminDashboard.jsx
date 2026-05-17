import {Link, useLocation} from "react-router";
import {
  Package,
  Users,
  LogOut,
  LayoutDashboard,
  UserCog,
  PackageCheck,
  TrendingUp,
  Trash2,
  RefreshCw
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useState, useEffect, useRef } from "react";

export function AdminDashboard() {
  const location = useLocation();

  const [stats, setStats] = useState({
    totalShipments: 0,
    monthlyShipments: 0,
    totalUsers: 0,
    estimatedRevenue: 0,
    monthlyData: [],
    departmentData: [],
    recentActivity: []
  });

  const [shipments, setShipments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingStats ,setLoadingStats] = useState(true);
  const [loadingLists, setLoadingLists] = useState(true);
  const [serverError, setServerError] = useState("");

  const [user] = useState({
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("userRole") || "",
    token: localStorage.getItem("token") || ""
  });
  const inFlightRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Helper: fetch JSON with token and abort support
  const fetchWithToken = async (url, { signal } = {}) => {
    const token = user.token;
    if (!token) {
      // Si no hay token, redirigir al login
      localStorage.removeItem("token");
      window.location.href = "/iniciar-sesion";
      throw new Error("No token");
    }
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      signal
    });
    console.log("url: "+url+" res--:   "+res.status);
    return res;
  };

  // Cargar estadísticas
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      setLoadingStats(true);
      setServerError("");
      try {
        const res = await fetchWithToken("http://127.0.0.1:5000/api/admin/stats", { signal });

        if (signal.aborted) return;
        if (res.status === 401) {
          localStorage.clear();
          window.location.href = "/iniciar-sesion";
          return;
        }
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          setServerError(err.message || "Error al cargar estadísticas");
          return;
        }
        const dataRes = await res.json();
        if (mountedRef.current) {
          setStats(prev => ({ ...prev, ...dataRes }));
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          //console.error("Error fetch stats:", err);
          if (mountedRef.current) setServerError("No se pudo conectar para cargar estadísticas");
        }
      } finally {
        if (mountedRef.current) setLoadingStats(false);
      }
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cargar listas (usuarios y envíos)
  useEffect(() => {
    console.log("Cargando users y ships, inFlight: " + inFlightRef.current);
    if (inFlightRef.current) return;

    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      //setLoadingLists(true);
      try {
        console.log("Probando promesas : "+ inFlightRef.current);
        //inFlightRef.current = true;

        const rShip = await fetchWithToken("http://127.0.0.1:5000/api/shipments/list", { signal })
        const rUsers = await fetchWithToken("http://127.0.0.1:5000/api/users/all", { signal })

        console.log("rShip: "+rShip.status,"rUsers: "+rUsers.status);
        if (signal.aborted) return;

        if (rShip.status === 401 || rUsers.status === 401) {
          localStorage.clear();
          window.location.href = "/iniciar-sesion";
          return;
        }

        if (!rShip.ok) {
          const err = await rShip.json().catch(() => ({}));
          setServerError(err.message || "Error al obtener envíos");
        } else {
          const dataShip = await rShip.json();
          console.log(dataShip);
          if (mountedRef.current) setShipments(Array.isArray(dataShip) ? dataShip : []);
        }

        if (!rUsers.ok) {
          const err = await rUsers.json().catch(() => ({}));
          setServerError(prev => prev || err.message || "Error al obtener usuarios");
        } else {
          const dataUsers = await rUsers.json();
          console.log(dataUsers);
          if (mountedRef.current) setUsers(Array.isArray(dataUsers) ? dataUsers : []);
        }

      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetch lists:", err);
          if (mountedRef.current) setServerError("No se pudo conectar para obtener listas");
        }
      } finally {
        inFlightRef.current = false;
        if (mountedRef.current) setLoadingLists(false);
      }
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Acciones administrativas
  const handleDeleteShipment = async (id) => {
    if (!confirm("¿Eliminar envío? Esta acción no se puede deshacer.")) return;
    try {
      const res = await fetchWithToken(`http://127.0.0.1:5000/api/shipments/remove?id=${id}`, { });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "No se pudo eliminar el envío");
        return;
      }
      // Actualizar lista localmente
      setShipments(prev => prev.filter(s => s.id !== id));
      alert("Envío eliminado");
    } catch (err) {
      console.error("Delete shipment error:", err);
      alert("Error al eliminar envío");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("¿Eliminar usuario? Se eliminarán sus envíos asociados.")) return;
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/users/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${user.token}`}
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "No se pudo eliminar el usuario");
        return;
      }
      setUsers(prev => prev.filter(u => u.id !== id));
      alert("Usuario eliminado");
    } catch (err) {
      console.error("Delete user error:", err);
      alert("Error al eliminar usuario");
    }
  };

  const refreshAll = () => {
    // Forzar recarga de datos: recarga la página o re-ejecuta efectos
    // Aquí simplemente recargamos la ruta actual para re-montar componentes
    window.location.reload();
  };

  const formatDate = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleString();
  };

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
              <div className="px-3 py-1 bg-[#1B2A4A] text-white text-xs font-medium rounded-full">Admin</div>
              <div className="w-10 h-10 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white font-bold">{getInitials(user.name)}</div>
              <div>
                <div className="text-sm font-medium text-[#1B2A4A]">{user.name}</div>
                <div className="text-xs text-gray-500">admin@skyship.com.gt</div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
            <nav className="p-4 space-y-2">
              <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === "/admin" ? "bg-[#00AEEF] text-white" : "text-[#2D2D2D] hover:bg-[#F7F8FA]"}`}>
                <LayoutDashboard className="w-5 h-5" /> Tablero
              </Link>

              <Link to="/admin/usuarios-envios" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === "/admin/usuarios-envios" ? "bg-[#00AEEF] text-white" : "text-[#2D2D2D] hover:bg-[#F7F8FA]"}`}>
                <UserCog className="w-5 h-5" /> Usuarios y Envíos
              </Link>

              <button onClick={() => { localStorage.clear(); window.location.href = "/"; }} className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-left">
                <LogOut className="w-5 h-5" /> Cerrar Sesión
              </button>
            </nav>
          </aside>

          <main className="flex-1 p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-[#1B2A4A]">Panel de Administración</h1>
              <div className="flex items-center gap-2">
                <button onClick={refreshAll} className="px-4 py-2 bg-[#00AEEF] text-white rounded-lg flex items-center gap-2 hover:bg-[#0098d1]">
                  <RefreshCw className="w-4 h-4" /> Refrescar
                </button>
              </div>
            </div>

            {serverError && <div className="mb-4 text-red-600">{serverError}</div>}

            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#00AEEF]" />
                  </div>
                  <span className="text-sm text-[#2D2D2D]">Total Envíos</span>
                </div>
                <div className="text-3xl font-bold text-[#1B2A4A]">{stats.totalShipments ?? 0}</div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <PackageCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm text-[#2D2D2D]">Envíos Este Mes</span>
                </div>
                <div className="text-3xl font-bold text-[#1B2A4A]">{stats.monthlyShipments ?? 0}</div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm text-[#2D2D2D]">Usuarios Registrados</span>
                </div>
                <div className="text-3xl font-bold text-[#1B2A4A]">{stats.totalUsers ?? 0}</div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                  </div>
                  <span className="text-sm text-[#2D2D2D]">Ingresos Estimados</span>
                </div>
                <div className="text-3xl font-bold text-[#1B2A4A]">{stats.estimatedRevenue ?? 0}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-[#1B2A4A] mb-4">Envíos por Mes</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={stats.monthlyData || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#2D2D2D" />
                    <YAxis stroke="#2D2D2D" />
                    <Tooltip />
                    <Bar dataKey="envios" fill="#00AEEF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-[#1B2A4A] mb-4">Envíos por Departamento</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={stats.departmentData || []} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                      {(stats.departmentData || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {(stats.departmentData || []).map((dept) => (
                      <div key={dept.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                        <span className="text-xs text-[#2D2D2D]">{dept.name}</span>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1B2A4A]">Actividad Reciente</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {(stats.recentActivity || []).length === 0 && <div className="p-6 text-sm text-gray-500">Sin actividad reciente</div>}
                {(stats.recentActivity || []).map((activity, index) => (
                    <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-[#F7F8FA] transition-colors">
                      <div>
                        <div className="font-mono text-sm text-[#00AEEF]">{activity.id}</div>
                        <div className="text-sm text-[#2D2D2D]"><span className="font-medium">{activity.client}</span> - {activity.action}</div>
                      </div>
                      <div className="text-sm text-gray-500">{activity.email}</div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-[#1B2A4A] mb-4">Usuarios</h2>
              {loadingLists ? (
                  <div>Cargando listas...</div>
              ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-[#F7F8FA]">
                      <tr>
                        <th className="px-4 py-3 text-sm">ID</th>
                        <th className="px-4 py-3 text-sm">Nombre</th>
                        <th className="px-4 py-3 text-sm">Email</th>
                        <th className="px-4 py-3 text-sm">Rol</th>
                      </tr>
                      </thead>
                      <tbody>
                      {users.map(u => (
                          <tr key={u.id} className="border-t">
                            <td className="px-4 py-3 font-mono text-sm">{u.id}</td>
                            <td className="px-4 py-3">{u.name}</td>
                            <td className="px-4 py-3">{u.email}</td>
                            <td className="px-4 py-3">{u.role}</td>

                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
              <h2 className="text-lg font-bold text-[#1B2A4A] mb-4">Envíos</h2>
              {loadingLists ? (
                  <div>Cargando listas...</div>
              ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-[#F7F8FA]">
                      <tr>
                        <th className="px-4 py-3 text-sm">Código</th>
                        <th className="px-4 py-3 text-sm">Destino</th>
                        <th className="px-4 py-3 text-sm">Fecha</th>
                        <th className="px-4 py-3 text-sm">Estado</th>
                      </tr>
                      </thead>
                      <tbody>
                      {shipments.map(s => (
                          <tr key={s.id} className="border-t">
                            <td className="px-4 py-3 font-mono text-sm">{s.code}</td>
                            <td className="px-4 py-3">{s.destination}</td>
                            <td className="px-4 py-3">{formatDate(s.created_at || s.date)}</td>
                            <td className="px-4 py-3">{s.status}</td>

                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
              )}
            </div>
          </main>
        </div>
      </div>
  );
}
import { Link, useLocation } from "react-router";
import { Package, Users, LogOut, LayoutDashboard, UserCog, PackageCheck, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function AdminDashboard() {
  const location = useLocation();

  const monthlyData = [
    { month: "Ene", envios: 145 },
    { month: "Feb", envios: 178 },
    { month: "Mar", envios: 203 },
    { month: "Abr", envios: 189 },
    { month: "May", envios: 234 }
  ];

  const departmentData = [
    { name: "Guatemala", value: 450, color: "#00AEEF" },
    { name: "Quetzaltenango", value: 280, color: "#1B2A4A" },
    { name: "Escuintla", value: 180, color: "#3d5a8f" },
    { name: "Huehuetenango", value: 120, color: "#66c2ff" },
    { name: "Otros", value: 220, color: "#a3d9ff" }
  ];

  const recentActivity = [
    { id: "SKY123456789GT", client: "María López", action: "Nuevo envío creado", time: "Hace 5 min" },
    { id: "SKY987654321GT", client: "Carlos Pérez", action: "Envío entregado", time: "Hace 15 min" },
    { id: "SKY456789123GT", client: "Ana Rodríguez", action: "En tránsito", time: "Hace 1 hora" }
  ];

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
            <div className="px-3 py-1 bg-[#1B2A4A] text-white text-xs font-medium rounded-full">
              Admin
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white font-bold">
              AD
            </div>
            <div>
              <div className="text-sm font-medium text-[#1B2A4A]">Administrador</div>
              <div className="text-xs text-gray-500">admin@skyship.com.gt</div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === "/admin"
                  ? "bg-[#00AEEF] text-white"
                  : "text-[#2D2D2D] hover:bg-[#F7F8FA]"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Tablero
            </Link>
            <Link
              to="/admin/usuarios-envios"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === "/admin/usuarios-envios"
                  ? "bg-[#00AEEF] text-white"
                  : "text-[#2D2D2D] hover:bg-[#F7F8FA]"
              }`}
            >
              <UserCog className="w-5 h-5" />
              Usuarios y Envíos
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
          <h1 className="text-3xl font-bold text-[#1B2A4A] mb-8">Tablero General</h1>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#00AEEF]/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#00AEEF]" />
                </div>
                <span className="text-sm text-[#2D2D2D]">Total Envíos</span>
              </div>
              <div className="text-3xl font-bold text-[#1B2A4A]">1,250</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <PackageCheck className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-[#2D2D2D]">Envíos Este Mes</span>
              </div>
              <div className="text-3xl font-bold text-[#1B2A4A]">234</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm text-[#2D2D2D]">Usuarios Registrados</span>
              </div>
              <div className="text-3xl font-bold text-[#1B2A4A]">428</div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-sm text-[#2D2D2D]">Ingresos Estimados</span>
              </div>
              <div className="text-3xl font-bold text-[#1B2A4A]">Q 156,750</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-[#1B2A4A] mb-4">Envíos por Mes</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
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
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {departmentData.map((dept) => (
                  <div key={dept.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                    <span className="text-xs text-[#2D2D2D]">{dept.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-[#1B2A4A]">Actividad Reciente</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity, index) => (
                <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-[#F7F8FA] transition-colors">
                  <div>
                    <div className="font-mono text-sm text-[#00AEEF]">{activity.id}</div>
                    <div className="text-sm text-[#2D2D2D]">
                      <span className="font-medium">{activity.client}</span> - {activity.action}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

import {useEffect, useState} from "react";
import { Link, useLocation } from "react-router";
import { Package, LogOut, LayoutDashboard, UserCog, Search, Pencil, Trash2, Plus } from "lucide-react";

export function AdminCRUD() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("usuarios");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingShip, setEditingShip] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  const [user] = useState({
    name: localStorage.getItem("userName") || "",
    role: localStorage.getItem("userRole") || "",
    token: localStorage.getItem("token") || ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const headers = { 'Authorization': `Bearer ${token}` };
      const [resUsers, resShipments] = await Promise.all([
        fetch('http://127.0.0.1:5000/api/users/all', { headers }),
        fetch('http://127.0.0.1:5000/api/shipments/list', { headers })
      ]);
      setUsers(await resUsers.json());
      setShipments(await resShipments.json());
    };
    fetchData();
  }, []);

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
  const handleDeleteUser = async (id) => {
    if (confirm("¿Eliminar usuario?")) {
      await fetch(`http://127.0.0.1:5000/api/users/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${user.token}`}});
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleUpdateUser = async (id, user_data) => {
    // Pedimos nuevos valores (reemplaza por modal si prefieres)
    const current = users.find(u => u.id === id);
    if (!current) {
      alert("Usuario no encontrado en la lista");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/users/update?id=${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}`,'Content-Type': 'application/json' },
        body: JSON.stringify(user_data)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "No se pudo actualizar el usuario");
        return;
      }

      const data = await res.json().catch(() => ({}));
      // Si el backend devuelve el usuario actualizado, úsalo; si no, actualiza manualmente
      if (data.user) {
        setUsers(prev => prev.map(u => (u.id === id ? data.user : u)));
      } else {
        setUsers(prev => prev.map(u => (u.id === id ? user_data : u)));
      }

      alert(data.message || "Usuario actualizado");
    } catch (err) {
      console.error("Update user error:", err);
      alert("Error al actualizar usuario");
    }
    setEditingUser(null);
  };

  const handleDeleteShipment = async (id) => {
    if (confirm("¿Eliminar envio?")) {
      await fetch(`http://127.0.0.1:5000/api/shipments/remove?id=${id}`, {
        headers: { Authorization: `Bearer ${user.token}`}});
      setShipments(shipments.filter(s => s.id !== id));
    }
  };

  const handleUpdateShipment = async (id, shipment_data) => {

    const current = shipments.find(s => s.id === id);
    if (!current) {
      alert("Envio no encontrado en la lista");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/shipments/edit?id=${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}`,'Content-Type': 'application/json' },
        body: JSON.stringify(shipment_data)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "No se pudo actualizar el envio");
        return;
      }

      const data = await res.json().catch(() => ({}));
      // Si el backend devuelve el envio actualizado, úsalo; si no, actualiza manualmente
      if (data.user) {
        setUsers(prev => prev.map(u => (u.id === id ? data.user : u)));
      } else {
        setUsers(prev => prev.map(u => (u.id === id ? shipment_data : u)));
      }

      alert(data.message || "Envio actualizado");
    } catch (err) {
      console.error("Update shipment error:", err);
      alert("Error al actualizar envio");
    }
    setEditingShip(null);
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shipment.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "todos" || shipment.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });
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
            <div className="px-3 py-1 bg-[#1B2A4A] text-white text-xs font-medium rounded-full">
              Admin
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white font-bold">
              {getInitials(user.name)}
            </div>
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
          <h1 className="text-3xl font-bold text-[#1B2A4A] mb-6">Gestión de Usuarios y Envíos</h1>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("usuarios")}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === "usuarios"
                  ? "bg-[#00AEEF] text-white"
                  : "bg-white text-[#2D2D2D] border border-gray-200 hover:bg-[#F7F8FA]"
              }`}
            >
              Usuarios
            </button>
            <button
              onClick={() => setActiveTab("envios")}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === "envios"
                  ? "bg-[#00AEEF] text-white"
                  : "bg-white text-[#2D2D2D] border border-gray-200 hover:bg-[#F7F8FA]"
              }`}
            >
              Envíos
            </button>
          </div>

          {activeTab === "usuarios" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar usuarios..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  />
                </div>


              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#F7F8FA]">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">ID</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Nombre</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Correo</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Teléfono</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Dirección</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Rol</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-t border-gray-200 hover:bg-[#F7F8FA] transition-colors">
                        <td className="px-6 py-4 text-[#2D2D2D]">{user.id}</td>
                        <td className="px-6 py-4 text-[#2D2D2D]">{user.name}</td>
                        <td className="px-6 py-4 text-[#2D2D2D]">{user.email}</td>
                        <td className="px-6 py-4 text-[#2D2D2D]">{user.phone}</td>
                        <td className="px-6 py-4 text-[#2D2D2D]">{user.address}</td>
                        <td className="px-6 py-4 text-[#2D2D2D]">{user.role}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingUser(user);
                                setShowEditModal(true);

                              }}
                              className="p-2 text-[#00AEEF] hover:bg-[#00AEEF]/10 rounded-lg transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "envios" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar envíos..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="en tránsito">En Tránsito</option>
                  <option value="entregado">Entregado</option>
                </select>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#F7F8FA]">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Código Guía</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Cliente</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Destino</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Estado</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Fecha</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Costo</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-[#2D2D2D]">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShipments.map((shipment, index) => (
                      <tr key={index} className="border-t border-gray-200 hover:bg-[#F7F8FA] transition-colors">
                        <td className="px-6 py-4 font-mono text-sm text-[#00AEEF]">{shipment.code}</td>
                        <td className="px-6 py-4 text-[#2D2D2D]">{shipment.client}</td>
                        <td className="px-6 py-4 text-[#2D2D2D]">{shipment.destination}</td>
                        <td className="px-6 py-4 text-[#2D2D2D] ">{shipment.status}</td>

                        <td className="px-6 py-4 text-[#2D2D2D]">{shipment.date}</td>
                        <td className="px-6 py-4 font-medium text-[#1B2A4A]">{shipment.cost}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => {
                              setEditingShip(shipment);
                              setShowEditModal(true);

                            }}
                                className="p-2 text-[#00AEEF] hover:bg-[#00AEEF]/10 rounded-lg transition-colors">

                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteShipment(shipment.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">

                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>



      {showEditModal && editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-lg">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold text-[#1B2A4A]">
                  {editingUser.id ? "Editar Usuario" : "Agregar Usuario"}
                </h2>
                <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-md"
                    aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">Nombre completo</label>
                    <input
                        type="text"
                        defaultValue={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                        className="w-full px-4 py-2 bg-[#F7F8FA] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">Correo electrónico</label>
                    <input
                        type="email"
                        defaultValue={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                        className="w-full px-4 py-2 bg-[#F7F8FA] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">Teléfono</label>
                    <input
                        type="tel"
                        defaultValue={editingUser.phone}
                        onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                        className="w-full px-4 py-2 bg-[#F7F8FA] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">Dirección</label>
                    <input
                        type="text"
                        defaultValue={editingUser.address}
                        onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                        className="w-full px-4 py-2 bg-[#F7F8FA] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-2">Rol</label>
                    <select
                        defaultValue={editingUser.role}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                        className="w-full px-4 py-2 bg-[#F7F8FA] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    >
                      <option value="Cliente">Cliente</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 border border-gray-200 text-[#2D2D2D] rounded-lg hover:bg-[#F7F8FA] transition-colors"
                  >
                    Cancelar
                  </button>

                  <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpdateUser(editingUser.id, editingUser);
                        setShowEditModal(false)
                      }}
                      className="px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors"
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router";
import { Package } from "lucide-react";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Validaciones básicas antes de enviar
    if (!formData.email || !formData.password) {
      setError("Por favor ingresá tu correo y contraseña");
      return;
    }

    try {
      // 2. Petición real al backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // 3. GUARDAR EN LOCALSTORAGE
        // Guardamos el token para usarlo en el middleware de las rutas protegidas
        localStorage.setItem('token', data.token);
        // También es útil guardar el rol y el nombre para la interfaz
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userName', data.name);

        alert("Inicio de sesión exitoso");

        // 4. REDIRECCIÓN SEGÚN ROL (Requisito del enunciado)
        // Si el usuario es administrador, lo mandamos al panel administrativo
        if (data.role === 'admin') {
          window.location.href = "/admin";
        } else {
          window.location.href = "/mis-envios";
        }
      } else {
        // Manejo de errores que vienen del backend
        setError(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor. Verificá que el backend esté corriendo.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#00AEEF] flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1B2A4A]">SkyShip Express</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1B2A4A] text-center mb-6">Iniciar Sesión</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#2D2D2D] mb-2">Correo electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
              placeholder="juan@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm text-[#2D2D2D] mb-2">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
              placeholder="Tu contraseña"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-[#00AEEF] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-3 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-[#2D2D2D]">
            ¿Aún no tenés cuenta?{" "}
            <Link to="/registrarse" className="text-[#00AEEF] hover:underline">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

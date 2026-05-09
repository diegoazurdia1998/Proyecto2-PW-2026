import { useState } from "react";
import { Link } from "react-router";
import { Package } from "lucide-react";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Por favor ingresá tu correo y contraseña");
      return;
    }

    if (formData.password.length < 6) {
      setError("Credenciales incorrectas. Por favor verificá tu correo y contraseña.");
      return;
    }

    alert("Inicio de sesión exitoso");
    window.location.href = "/mis-envios";
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

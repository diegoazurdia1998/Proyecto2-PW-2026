import { useState } from "react";
import { Link } from "react-router";
import { Package, Check, X } from "lucide-react";

export function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name ? "" : "Este campo es requerido",
      email: formData.email ? "" : "Este campo es requerido",
      phone: formData.phone ? "" : "Este campo es requerido",
      address: formData.address ? "" : "Este campo es requerido",
      password: formData.password.length >= 6 ? "" : "La contraseña debe tener al menos 6 caracteres",
      confirmPassword: formData.password === formData.confirmPassword ? "" : "Las contraseñas no coinciden"
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      alert("Cuenta creada con éxito");
      window.location.href = "/mis-envios";
    }
  };

  const isPasswordValid = formData.password.length >= 6;
  const isConfirmPasswordValid = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#00AEEF] flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1B2A4A]">SkyShip Express</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1B2A4A] text-center mb-6">Crear Cuenta</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#2D2D2D] mb-2">Nombre completo</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? 'ring-2 ring-red-500' : 'focus:ring-[#00AEEF]'
              }`}
              placeholder="Juan Pérez López"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm text-[#2D2D2D] mb-2">Correo electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'ring-2 ring-red-500' : 'focus:ring-[#00AEEF]'
              }`}
              placeholder="juan@ejemplo.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm text-[#2D2D2D] mb-2">Teléfono</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? 'ring-2 ring-red-500' : 'focus:ring-[#00AEEF]'
              }`}
              placeholder="+502 1234-5678"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm text-[#2D2D2D] mb-2">Dirección</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 ${
                errors.address ? 'ring-2 ring-red-500' : 'focus:ring-[#00AEEF]'
              }`}
              placeholder="Zona 10, Guatemala, Guatemala"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm text-[#2D2D2D] mb-2">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onBlur={() => setTouched({ ...touched, password: true })}
              className={`w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 ${
                errors.password && touched.password ? 'ring-2 ring-red-500' :
                isPasswordValid && touched.password ? 'ring-2 ring-green-500' :
                'focus:ring-[#00AEEF]'
              }`}
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <X className="w-4 h-4" />
                {errors.password}
              </p>
            )}
            {isPasswordValid && touched.password && (
              <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Contraseña válida
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-[#2D2D2D] mb-2">Confirmar contraseña</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              onBlur={() => setTouched({ ...touched, confirmPassword: true })}
              className={`w-full px-4 py-3 bg-[#F7F8FA] rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword && touched.confirmPassword ? 'ring-2 ring-red-500' :
                isConfirmPasswordValid && touched.confirmPassword ? 'ring-2 ring-green-500' :
                'focus:ring-[#00AEEF]'
              }`}
              placeholder="Repetí tu contraseña"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <X className="w-4 h-4" />
                {errors.confirmPassword}
              </p>
            )}
            {isConfirmPasswordValid && touched.confirmPassword && (
              <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Las contraseñas coinciden
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-8 py-3 bg-[#00AEEF] text-white rounded-lg hover:bg-[#0098d1] transition-colors"
          >
            Crear Cuenta
          </button>
        </form>

        <p className="text-center text-sm text-[#2D2D2D] mt-6">
          ¿Ya tenés cuenta?{" "}
          <Link to="/iniciar-sesion" className="text-[#00AEEF] hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

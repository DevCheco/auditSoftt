"use client";
import { useState } from "react";


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de registro:", formData);
    // Aquí solo frontend, sin backend
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br py-10">

      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-800 shadow-lg">
        {/* Columna izquierda: Imagen */}
        <div className="hidden w-1/2 bg-gray-200 md:block">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Register banner"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Columna derecha: Formulario */}
        <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
          {/* Logo */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
              ✨
            </div>
            <h2 className="text-2xl font-bold text-white">Crea tu cuenta</h2>
            <p className="mt-1 text-sm text-gray-400">Únete a nosotros y comienza hoy</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Nombre completo</label>
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Confirma tu contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full  mb-4 rounded-lg  bg-rose-600 p-3 text-white font-semibold hover:bg-indigo-700 transition"
            >
              REGISTRATE
            </button>
          </form>

          {/* Botón de Google */}
         <button
  type="button"
  className="flex  mt-4 w-full items-center justify-center gap-2 rounded-lg border border-gray-600 bg-gray-900 p-3 text-white hover:bg-gray-700 transition"
>
  <img
    src="https://www.svgrepo.com/show/355037/google.svg"
    alt="Google"
    className="h-5 w-5"
  />
  Register with Google
</button>

          {/* Links */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Ya tienes una cuenta?{" "}
            <a href="/login-page" className="text-rose-400 hover:underline">
              Inicia sesión aquí
            </a>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Terms of use. Privacy policy
          </p>
        </div>
      </div>
    </div>
  );
}

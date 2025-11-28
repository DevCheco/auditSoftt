"use client";
import { useState } from "react";

export default function LoginPage({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dummyUser = { email: "admin@demo.com", password: "123456" };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === dummyUser.email && password === dummyUser.password) {
      onLoginSuccess();
    } else {
      setError("Credenciales inválidas. Intenta con admin@demo.com / 123456");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-white-900 via-rose-700 to-gray-900">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-800 shadow-lg">
        {/* Columna izquierda: Imagen */}
        <div className="hidden w-1/2 bg-gray-200 md:block">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Login banner"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Columna derecha: Formulario */}
        <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
          {/* Logo */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-rose-600 flex items-center justify-center text-white font-bold text-xl">
              🚀
            </div>
            <h2 className="text-2xl font-bold text-white">Iniciar Sesión</h2>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-400 focus:border-rose-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-400 focus:border-rose-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-rose-600 p-3 text-white font-semibold hover:bg-rose-700 transition"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 flex flex-col items-center text-sm text-gray-400">
            <a href="#" className="hover:text-rose-400">
              Se te olvido la contraseña?
            </a>
            <p className="mt-2">
              No tienes una cuenta?{" "}
              <a href="/register" className="text-rose-400 hover:underline">
                Registrate aquí
              </a>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Terms of use. Privacy policy
          </p>
        </div>
      </div>
    </div>
  );
}


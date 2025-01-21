/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Input, Button, Checkbox } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:5041/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Handle successful login, e.g., save JWT token
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard"; // Redirect to dashboard or appropriate route
    } catch (error: any) {
      console.error("Login failed:", error);
      setErrorMessage("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Column */}
      <div
        className="w-1/2 flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat px-10"
        style={{
          backgroundImage: 'url("https://picsum.photos/800/600")',
        }}
      >
        <div className="bg-white/70 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-primary">Bienvenido a Nuestra App</h1>
          <h2 className="text-xl text-gray-600 mt-4">
            Tu plataforma de farmacia digital
          </h2>
          <p className="text-gray-500 mt-2 text-center">
            Administra tus compras, recetas y más en un solo lugar con facilidad y seguridad.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <h2 className="text-2xl font-semibold text-gray-800">Iniciar sesión</h2>
        <form onSubmit={handleLogin} className="w-full max-w-md mt-6 space-y-4">
          <Input
            label="Correo Electrónico"
            placeholder="Ingresa tu correo"
            type="email"
            fullWidth
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            type={isPasswordVisible ? "text" : "password"}
            fullWidth
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <svg
                    className="text-2xl text-default-400 pointer-events-none"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 5C7.5 5 3.7 8.2 2 12c1.7 3.8 5.5 7 10 7s8.3-3.2 10-7c-1.7-3.8-5.5-7-10-7zm0 12c-2.8 0-5.2-2.4-5.2-5.2S9.2 6.6 12 6.6s5.2 2.4 5.2 5.2S14.8 17 12 17z" />
                  </svg>
                ) : (
                  <svg
                    className="text-2xl text-default-400 pointer-events-none"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 5C7.5 5 3.7 8.2 2 12c1.7 3.8 5.5 7 10 7s8.3-3.2 10-7c-1.7-3.8-5.5-7-10-7zm0 12c-2.8 0-5.2-2.4-5.2-5.2S9.2 6.6 12 6.6s5.2 2.4 5.2 5.2S14.8 17 12 17z" />
                  </svg>
                )}
              </button>
            }
          />

          <Checkbox size="sm" color="primary" defaultSelected>
            Acepto los <Link to="/terms">términos y condiciones</Link>
          </Checkbox>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <Button type="submit" color="primary" className="w-full" isLoading={loading}>
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
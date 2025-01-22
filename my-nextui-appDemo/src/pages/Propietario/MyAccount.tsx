import React, { useState, useEffect } from "react";
import PropietarioLayout from "../../layouts/PropietarioLayout";
import { Input, Button } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";

export default function MyAccount() {
  const [userData, setUserData] = useState({
    userId: "",
    documentUser: "",
    nameUser: "",
    lastNameUser: "",
    emailUser: "",
    passwordUser: "",
    documentTypeId: 0,
    personTypeId: 0, // Default person type
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Decode JWT to get userId
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No JWT token found in localStorage.");
      return null;
    }

    try {
      const decodedToken: { userId: string } = jwtDecode(token);
      return decodedToken.userId;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      const userId = getUserIdFromToken();
      if (!userId) {
        setErrorMessage("No se pudo obtener el ID del usuario.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5041/api/UserAccounts/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Ocurrió un error al cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`http://localhost:5041/api/UserAccounts/${userData.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      setSuccessMessage("Datos actualizados exitosamente.");
    } catch (error) {
      console.error("Error updating user data:", error);
      setErrorMessage("Ocurrió un error al actualizar los datos.");
    }
  };

  if (loading) {
    return <div className="p-6">Cargando datos del usuario...</div>;
  }

  return (
    <PropietarioLayout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Mi Cuenta</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre"
            name="nameUser"
            value={userData.nameUser}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Apellido"
            name="lastNameUser"
            value={userData.lastNameUser}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Correo Electrónico"
            name="emailUser"
            type="email"
            value={userData.emailUser}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Número de Documento"
            name="documentUser"
            value={userData.documentUser}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Contraseña (opcional)"
            name="passwordUser"
            type="password"
            placeholder="Dejar en blanco para no cambiar"
            onChange={handleInputChange}
          />
          <div className="flex justify-end">
            <Button type="submit" color="primary" className="w-full">
              Guardar Cambios
            </Button>
          </div>
        </form>

        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </div>
    </PropietarioLayout>
  );
}

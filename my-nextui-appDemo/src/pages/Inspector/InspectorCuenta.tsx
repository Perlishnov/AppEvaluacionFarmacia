import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EvaluadorLayout from "../../layouts/EvaluadorLayout";

const InspectorCuenta = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData] = useState({
    userId: 1, // Cambia este ID al ID real del usuario autenticado
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch inicial para cargar los datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5041/api/UserAccounts`);
        if (!response.ok) throw new Error("Error al cargar los datos del usuario.");
        const data = await response.json();

        // Encuentra al usuario por su ID (puedes ajustar esto según tu lógica de autenticación)
        const user = data.find((u: any) => u.userId === 1); // Reemplaza con el ID real
        if (!user) throw new Error("Usuario no encontrado.");
        
        setUserData({
          userId: user.userId,
          firstName: user.nameUser,
          lastName: user.lastNameUser,
          email: user.emailUser,
          phone: user.documentUser, // Reemplaza si tienes un campo de teléfono separado
        });
      } catch (err: any) {
        console.error(err.message);
        setError("Hubo un error al cargar los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5041/api/UserAccounts/${userData.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameUser: userData.firstName,
          lastNameUser: userData.lastName,
          emailUser: userData.email,
          documentUser: userData.phone, // Cambia según el campo de la base de datos
        }),
      });

      if (!response.ok) throw new Error("Error al guardar los datos.");
      alert("Los cambios han sido guardados correctamente.");
      togglePopup();
    } catch (err: any) {
      console.error(err.message);
      alert("Hubo un error al guardar los cambios.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <EvaluadorLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-700">Mi Cuenta</h1>
        <div className="bg-[#F8F9FC] p-6 rounded-lg border shadow flex items-center gap-6">
          {/* Foto de Perfil */}
          <img
            alt="Foto de perfil"
            className="w-40 h-40 rounded-full"
            src="https://i.pravatar.cc/450?u=inspector"
          />

          {/* Datos del Usuario */}
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Nombre:</strong> {userData.firstName} {userData.lastName}
            </p>
            <p>
              <strong>Correo:</strong> {userData.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {userData.phone}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-[#4E5BA6] text-white rounded hover:bg-[#3A4786] transition-all"
            onClick={togglePopup}
          >
            Editar Perfil
          </button>
          <button
            className="px-4 py-2 bg-[#EF4444] text-white rounded hover:bg-[#D32F2F] transition-all"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Popup para editar perfil */}
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#F8F9FC] p-8 rounded-lg shadow-lg w-1/2">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Editar Perfil</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded"
                    placeholder="Ingrese su nombre..."
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-2">Apellido</label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded"
                    placeholder="Ingrese su apellido..."
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-2">Correo</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded"
                    placeholder="Ingrese su correo..."
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded"
                    placeholder="Ingrese su número de teléfono..."
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-[#EF4444] text-white rounded hover:bg-[#374151] transition-all"
                    onClick={togglePopup}
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-4 py-2 bg-[#4E5BA6] text-white rounded hover:bg-[#3A4786] transition-all"
                    onClick={handleSave}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </EvaluadorLayout>
  );
};

export default InspectorCuenta;
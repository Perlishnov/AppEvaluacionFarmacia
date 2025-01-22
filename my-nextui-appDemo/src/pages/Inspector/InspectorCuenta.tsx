import React, { useState } from "react";
import EvaluadorLayout from "../../layouts/EvaluadorLayout";

const InspectorCuenta = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Luis",
    lastName: "Martínez",
    email: "inspector@email.com",
    phone: "809-555-1234",
  });

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    togglePopup();
    alert("Los cambios han sido guardados correctamente.");
    // Aquí puedes conectar con el backend para enviar los datos actualizados
  };

  const handleCancel = () => {
    togglePopup();
    alert("¿Estás seguro de que quieres salir sin guardar los cambios?");
  };

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
        <button
          className="px-4 py-2 bg-[#4E5BA6] text-white rounded hover:bg-[#3A4786] transition-all"
          onClick={togglePopup}
        >
          Editar Perfil
        </button>

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
                    onClick={handleCancel}
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

import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Layout del Inspector reutilizado
const EvaluadorLayout = ({
  children,
  menuItems,
  role,
}: {
  children: React.ReactNode;
  menuItems: { title: string; path: string }[];
  role: string;
}) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">{role}</h2>
        <nav>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
};

const DetallesFarmacia = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const { farmaciaId } = useParams();

  const farmaciasData = [
    {
      id: 1,
      name: "Farmacia Central",
      address: "Calle 123",
      owner: "Juan Pérez",
      ownerPhone: "809-555-1234",
      ownerEmail: "juan.perez@farmaciacentral.com",
      director: "Ana Gómez",
      directorPhone: "809-555-6789",
      directorEmail: "ana.gomez@farmaciacentral.com",
      pharmacyPhone: "809-555-5678",
      inspectionDate: "2023-05-15",
      status: "Pendiente",
    },
  ];

  const farmacia = farmaciasData.find((f) => f.id.toString() === farmaciaId);

  if (!farmacia) {
    return (
      <EvaluadorLayout
        menuItems={[
          { title: "Dashboard", path: "/inspector/dashboard" },
          { title: "Mis Farmacias", path: "/inspector/evaluations" },
          { title: "Cuenta", path: "/inspector/account" },
        ]}
        role="Inspector"
      >
        <div>Farmacia no encontrada.</div>
      </EvaluadorLayout>
    );
  }

  return (
    <EvaluadorLayout
      menuItems={[
        { title: "Dashboard", path: "/inspector/dashboard" },
        { title: "Mis Farmacias", path: "/inspector/evaluations" },
        { title: "Cuenta", path: "/inspector/account" },
      ]}
      role="Inspector"
    >
      <div className="p-6 relative">
        <div className="bg-gray-100 p-6 rounded-lg border shadow">
          <h1 className="text-2xl font-bold mb-4">Detalles de la Farmacia</h1>
          <div className="space-y-4">
            <p>
              <strong>Nombre:</strong> {farmacia.name}
            </p>
            <p>
              <strong>Dirección:</strong> {farmacia.address}
            </p>
            <p>
              <strong>Teléfono de la Farmacia:</strong> {farmacia.pharmacyPhone}
            </p>
            <p>
              <strong>Propietario:</strong> {farmacia.owner}
            </p>
            <p>
              <strong>Teléfono del Propietario:</strong> {farmacia.ownerPhone}
            </p>
            <p>
              <strong>Correo del Propietario:</strong> {farmacia.ownerEmail}
            </p>
            <p>
              <strong>Director Técnico:</strong> {farmacia.director}
            </p>
            <p>
              <strong>Teléfono del Director Técnico:</strong> {farmacia.directorPhone}
            </p>
            <p>
              <strong>Correo del Director Técnico:</strong> {farmacia.directorEmail}
            </p>
            <p>
              <strong>Fecha Pautada para la Inspección:</strong> {farmacia.inspectionDate}
            </p>
            <p>
              <strong>Estado:</strong> {farmacia.status}
            </p>
          </div>
        </div>

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={togglePopup}
        >
          Añadir Resultados
        </button>

        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
              <h2 className="text-xl font-bold mb-4">Agregar Resultados</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold mb-2">Descripción de Resultados</label>
                  <textarea
                    className="w-full p-3 border rounded"
                    rows={4}
                    placeholder="Ingrese la descripción de los resultados..."
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Observaciones</label>
                  <textarea
                    className="w-full p-3 border rounded"
                    rows={4}
                    placeholder="Ingrese las observaciones..."
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={() => {
                      togglePopup
                      alert("¿Seguro que quiere salir?");
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      togglePopup();
                      alert("Resultados guardados correctamente (simulación).");
                    }}
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

export default DetallesFarmacia;

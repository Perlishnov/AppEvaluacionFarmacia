import React from "react";
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
  // Obtén el parámetro de la URL (ID o nombre de la farmacia)
  const { farmaciaId } = useParams();

  // Aquí puedes cargar datos adicionales de la farmacia utilizando `farmaciaId`
  const farmaciasData = [
    { id: 1, name: "Farmacia Central", address: "Calle 123", owner: "Juan Pérez", status: "Pendiente" },
    { id: 2, name: "Farmacia del Pueblo", address: "Avenida Principal", owner: "María García", status: "Completada" },
    { id: 3, name: "Farmacia Salud Total", address: "Boulevard Saludable", owner: "Carlos Ruiz", status: "Rechazada" },
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
      <div className="p-6">
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
              <strong>Propietario:</strong> {farmacia.owner}
            </p>
            <p>
              <strong>Estado:</strong> {farmacia.status}
            </p>
          </div>
        </div>
      </div>
    </EvaluadorLayout>
  );
};

export default DetallesFarmacia;

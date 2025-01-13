import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

// Layout del Inspector
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

// Tabla de Inspecciones
function InspectionsTable() {
  const navigate = useNavigate();

  const inspectionsData = [
    { id: 1, date: "2023-05-01", status: "Pendiente", pharmacyName: "Farmacia Central" },
    { id: 2, date: "2023-05-02", status: "Completada", pharmacyName: "Farmacia del Pueblo" },
    { id: 3, date: "2023-05-03", status: "Rechazada", pharmacyName: "Farmacia Salud Total" },
  ];

  return (
    <Card>
      <CardHeader>
        <h3>Mis Inspecciones</h3>
      </CardHeader>
      <CardBody>
        <Table aria-label="Mis Inspecciones" className="w-full">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Fecha</TableColumn>
            <TableColumn>Estado</TableColumn>
            <TableColumn>Nombre de Farmacia</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody>
            {inspectionsData.map((inspection) => (
              <TableRow key={inspection.id}>
                <TableCell>{inspection.id}</TableCell>
                <TableCell>{inspection.date}</TableCell>
                <TableCell>{inspection.status}</TableCell>
                <TableCell>{inspection.pharmacyName}</TableCell>
                <TableCell>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => navigate(`/inspector/farmacia/${inspection.id}`)}
                  >
                    Ver
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

// Dashboard del Inspector
const DashboardInspector = () => {
  return (
    <EvaluadorLayout
      menuItems={[
        { title: "Mis Evaluaciones", path: "/inspector/dashboard" },
        { title: "Asignar Evaluaciones", path: "/inspector/assignments" },
        { title: "Mi Cuenta", path: "/inspector/account" },
      ]}
      role="Inspector"
    >
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Dashboard del Inspector</h1>
        {/* Datos del Usuario */}
        <div className="bg-gray-50 p-6 rounded-lg border flex items-center gap-4">
          <img
            alt="Foto de perfil"
            className="w-40 h-40 text-large rounded-full"
            src="https://i.pravatar.cc/450?u=inspector"
          />
          <div>
            <h3 className="text-lg font-bold mb-2">Datos del Usuario</h3>
            <p>Nombre: Luis Martínez</p>
            <p>Correo: inspector@email.com</p>
            <p>Rol: Inspector de Farmacias</p>
          </div>
        </div>
        {/* Tabla de Inspecciones */}
        <InspectionsTable />
      </div>
    </EvaluadorLayout>
  );
};

export default DashboardInspector;

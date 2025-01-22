import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Badge } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import EvaluadorLayout from "../../layouts/EvaluadorLayout";

function getBadgeColorByStatus(status) {
  switch (status.toLowerCase()) {
    case "pendiente":
      return { color: "warning", variant: "solid" }; // Amarillo
    case "completada":
      return { color: "success", variant: "solid" }; // Verde
    case "cancelada":
      return { color: "danger", variant: "solid" }; // Rojo
    default:
      return { color: "default", variant: "flat" }; // Por defecto
  }
}

function InspectionsTable() {
  const navigate = useNavigate();

  const inspectionsData = [
    { id: 1, date: "2023-05-01", status: "Pendiente", pharmacyName: "Farmacia Central" },
    { id: 2, date: "2023-05-02", status: "Completada", pharmacyName: "Farmacia del Pueblo" },
    { id: 3, date: "2023-05-03", status: "Cancelada", pharmacyName: "Farmacia Salud Total" },
    { id: 4, date: "2023-05-04", status: "Pendiente", pharmacyName: "Farmacia Moderna" },
    { id: 5, date: "2023-05-05", status: "Completada", pharmacyName: "Farmacia del Este" },
  ];

  // Dividir las inspecciones según el estado
  const pendingInspections = inspectionsData.filter(
    (inspection) => inspection.status === "Pendiente"
  );
  const otherInspections = inspectionsData.filter(
    (inspection) => inspection.status !== "Pendiente"
  );

  return (
    <div className="space-y-6">
      {/* Inspecciones Pendientes */}
      <div>
        <h3 className="text-xl font-bold text-gray-700 mb-4">Inspecciones Pendientes</h3>
        <Card className="bg-[#F8F9FC]">
          <CardBody>
            <Table aria-label="Inspecciones Pendientes" className="w-full">
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>Fecha</TableColumn>
                <TableColumn>Estado</TableColumn>
                <TableColumn>Nombre de Farmacia</TableColumn>
                <TableColumn>Acciones</TableColumn>
              </TableHeader>
              <TableBody>
                {pendingInspections.map((inspection) => (
                  <TableRow key={inspection.id}>
                    <TableCell>{inspection.id}</TableCell>
                    <TableCell>{inspection.date}</TableCell>
                    <TableCell>
                      <Badge {...getBadgeColorByStatus(inspection.status)}>
                        {inspection.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{inspection.pharmacyName}</TableCell>
                    <TableCell>
                      <button
                        className="px-4 py-2 bg-[#4E5BA6] text-white rounded hover:bg-[#3A4786] transition-all"
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
      </div>

      {/* Otras Inspecciones */}
      <div>
        <h3 className="text-xl font-bold text-gray-700 mb-4">Otras Inspecciones</h3>
        <Card className="bg-[#F8F9FC]">
          <CardBody>
            <Table aria-label="Otras Inspecciones" className="w-full">
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>Fecha</TableColumn>
                <TableColumn>Estado</TableColumn>
                <TableColumn>Nombre de Farmacia</TableColumn>
                <TableColumn>Acciones</TableColumn>
              </TableHeader>
              <TableBody>
                {otherInspections.map((inspection) => (
                  <TableRow key={inspection.id}>
                    <TableCell>{inspection.id}</TableCell>
                    <TableCell>{inspection.date}</TableCell>
                    <TableCell>
                      <Badge {...getBadgeColorByStatus(inspection.status)}>
                        {inspection.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{inspection.pharmacyName}</TableCell>
                    <TableCell>
                      <button
                        className="px-4 py-2 bg-[#4E5BA6] text-white rounded hover:bg-[#3A4786] transition-all"
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
      </div>
    </div>
  );
}

const DashboardInspector = () => {
  return (
    <EvaluadorLayout>
      <div className="space-y-6 p-6 bg-[#F8F9FC]">
        <h1 className="text-2xl font-bold text-gray-700">Dashboard del Inspector</h1>
        <InspectionsTable />
      </div>
    </EvaluadorLayout>
  );
};

export default DashboardInspector;

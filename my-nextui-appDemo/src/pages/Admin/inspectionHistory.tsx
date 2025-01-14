import React from "react";
import AdministradorLayout from "../../layouts/AdministradorLayout";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Eye, Pencil, Trash } from "lucide-react";

const InspectionHistoryPage: React.FC = () => {
  const columns = [
    { key: "pharmacyName", label: "Nombre" },
    { key: "location", label: "Ubicación" },
    { key: "ownerName", label: "Propietario" },
    { key: "status", label: "Estado" },
    { key: "submissionDate", label: "Fecha de Solicitud" },
    { key: "actions", label: "Acciones" },
  ];

  const rows = [
    {
      key: "1",
      pharmacyName: "Farmacia Central",
      location: "Calle Principal 123",
      ownerName: "Juan Pérez",
      status: "Pendiente",
      submissionDate: "2023-05-01",
    },
    {
      key: "2",
      pharmacyName: "Farmacia del Hospital",
      location: "Av. Salud 456",
      ownerName: "María García",
      status: "Aprobada",
      submissionDate: "2023-05-02",
    },
    {
      key: "3",
      pharmacyName: "Farmacia Norte",
      location: "Calle Norte 789",
      ownerName: "Pedro Sánchez",
      status: "En Inspección",
      submissionDate: "2023-05-03",
    },
    {
      key: "4",
      pharmacyName: "Farmacia Sur",
      location: "Calle Sur 101",
      ownerName: "Ana López",
      status: "Rechazada",
      submissionDate: "2023-05-04",
    },
  ];

  const renderCell = (request: any, columnKey: string) => {
    const cellValue = request[columnKey];
    switch (columnKey) {
      case "status":
        return (
          <span
            className={`capitalize text-xs font-semibold ${
              cellValue === "Aprobada"
                ? "text-green-500"
                : cellValue === "Pendiente"
                ? "text-yellow-500"
                : cellValue === "En Inspección"
                ? "text-blue-500"
                : "text-red-500"
            }`}
          >
            {cellValue}
          </span>
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <Button isIconOnly variant="light" aria-label="Ver detalles">
              <Eye className="h-4 w-4" />
            </Button>
            <Button isIconOnly variant="light" aria-label="Editar solicitud">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button isIconOnly variant="light" color="danger" aria-label="Eliminar solicitud">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <AdministradorLayout>
      <div>
        <h1 className="text-3xl font-semibold mb-6">Historial de Inspecciones</h1>

        {/* Buscador */}
        <div className="flex justify-between items-center mb-4">
          <Input 
            placeholder="Buscar inspecciones..." 
            className="w-1/3" 
          />
          
        </div>

        {/* Tabla */}
        <Table 
          aria-label="Inspection History Table"
          css={{ height: "auto", minWidth: "100%" }}
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key}>
                {columns.map((column) => (
                  <TableCell key={`${row.key}-${column.key}`}>
                    {renderCell(row, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdministradorLayout>
  );
};

export default InspectionHistoryPage;
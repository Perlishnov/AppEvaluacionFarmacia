import React from "react";
import AdministradorLayout from "../../layouts/AdministradorLayout";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Badge } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "lucide-react";

const PharmaciesManagementPage: React.FC = () => {
  const columns = [
    { key: "name", label: "Nombre" },
    { key: "location", label: "Ubicación" },
    { key: "owner", label: "Propietario" },
    { key: "lastInspection", label: "Última Inspección" },
    { key: "type", label: "Tipo" },
    { key: "status", label: "Estado" },
    { key: "actions", label: "Acciones" },
  ];

  const rows = [
    {
      key: "1",
      name: "Farmacia Central",
      location: "Calle Principal 123",
      owner: "Juan Pérez",
      lastInspection: "2023-05-01",
      type: "Retail",
      status: "Aprobada",
    },
    {
      key: "2",
      name: "Farmacia Hospital General",
      location: "Av. Salud 456",
      owner: "María García",
      lastInspection: "2023-04-15",
      type: "Hospitalaria",
      status: "Pendiente",
    },
    {
      key: "3",
      name: "Farmacia Norte",
      location: "Calle Norte 789",
      owner: "Pedro Sánchez",
      lastInspection: "2023-03-20",
      type: "Retail",
      status: "En Inspección",
    },
    {
      key: "4",
      name: "Farmacia Sur",
      location: "Calle Sur 101",
      owner: "Ana López",
      lastInspection: "2023-02-10",
      type: "Retail",
      status: "Rechazada",
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
        <h1 className="text-3xl font-semibold mb-6">Gestión de Farmacias</h1>

        {/* Buscador */}
        <div className="flex justify-between items-center mb-4">
          <Input 
            placeholder="Buscar farmacias..." 
            className="w-1/3" 
          />
           <Button color="primary" size="lg">
            Agregar Farmacia
          </Button>
        </div>

        {/* Tabla y boton agregar farmacia*/}
        <Table 
          aria-label="Tabla de farmacias"
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

export default PharmaciesManagementPage;


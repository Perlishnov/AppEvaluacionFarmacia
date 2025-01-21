import React from "react";
import AdministradorLayout from "../../layouts/AdministradorLayout";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Eye, Pencil, Trash } from "lucide-react";

const UserManagementPage: React.FC = () => {
  const columns = [
    { key: "name", label: "Nombre" },
    { key: "email", label: "Correo Electr�nico" },
    { key: "role", label: "Rol" },
    { key: "actions", label: "Acciones" },
  ];

  const rows = [
    { key: "1", name: "Juan P�rez", email: "juan@example.com", role: "Inspector" },
    { key: "2", name: "Mar�a Garc�a", email: "maria@example.com", role: "Propietario" },
    { key: "3", name: "Carlos Rodr�guez", email: "carlos@example.com", role: "Inspector" },
  ];

  const renderCell = (user: any, columnKey: string) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "actions":
        return (
          <div className="flex gap-2">
            <Button isIconOnly variant="light" aria-label="Ver detalles">
              <Eye className="h-4 w-4" />
            </Button>
            <Button isIconOnly variant="light" aria-label="Editar usuario">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button isIconOnly variant="light" color="danger" aria-label="Eliminar usuario">
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
        <h1 className="text-3xl font-semibold mb-6">Gesti�n de Usuarios</h1>

        {/* Buscador y Bot�n de Agregar Usuario */}
        <div className="flex justify-between items-center mb-4">
          <Input 
            placeholder="Buscar usuarios..." 
            className="w-1/3" 
          />
          <Button color="primary" size="lg">
            Agregar Usuario
          </Button>
        </div>

        {/* Tabla */}
        <Table 
          aria-label="Tabla de usuarios"
          style={{ height: "auto", minWidth: "100%" }}
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

export default UserManagementPage;
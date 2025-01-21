import React, { useState } from "react";
import AdministradorLayout from "../../layouts/AdministradorLayout";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";

import { Users, Building2, ClipboardCheck, Award } from "lucide-react";

interface Solicitud {
  idSolicitud: number;
  idFarmacia: number;
  nombreFarmacia: string;
  propietario: string;
  tipoSolicitud: string;
  estado: string;
  fechaSolicitud: string;
}

interface Inspector {
  id: number;
  nombre: string;
}

/** 
 * Asigna colores según estado. 
 * variant="solid" para que el fondo y el texto tengan color 
 * (así evitamos texto negro).
 */
function getBadgeColorByStatus(status: string) {
  switch (status.toLowerCase()) {
    case "pendiente":
      return { color: "warning", variant: "solid" };
    case "revisando":
      return { color: "primary", variant: "solid" };
    case "aprobada":
      return { color: "success", variant: "solid" };
    case "rechazada":
      return { color: "danger", variant: "solid" };
    default:
      // Por si hay algún estado desconocido
      return { color: "default", variant: "flat" };
  }
}

/** 
 * Todas las Solicitudes tienen la opción de "Asignar Inspectores".
 * Para otras acciones (Aprobar, Rechazar, etc.), ajusta aquí si fuese necesario.
 * De momento, si quieres que todas las solicitudes tengan *solo* "Asignar Inspectores",
 * podrías devolver un array único.
 */
function obtenerAccionesPorTipo(tipo: string) {
  // Ejemplo: Todas tienen “Asignar Inspectores”
  // y solo algunas tienen “Aprobar” / “Rechazar”.
  // Ajusta según tus reglas.
  let acciones = [{ label: "Asignar Inspectores", color: "warning" }];

  // Ejemplo: Si quieres que todas tengan también "Aprobar" y "Rechazar",
  // puedes descomentar estas líneas:
  //
  // acciones.push({ label: "Aprobar", color: "success" });
  // acciones.push({ label: "Rechazar", color: "danger" });

  return acciones;
}

/**
 * Para mostrar (opcionalmente) la fecha límite 7 días después de la solicitud.
 * (No es restrictivo; solo informativo).
 */
function calcularFechaLimite(fechaSolicitud: string) {
  const dateObj = new Date(fechaSolicitud);
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
  const limitDate = new Date(dateObj.getTime() + oneWeekMs);
  return limitDate.toISOString().split("T")[0];
}

const AdminDashboardPage: React.FC = () => {
  // Solicitud seleccionada para mostrar en el Modal
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(
    null
  );
  // Mostrar u ocultar la sección para asignar inspectores
  const [showAsignarInspector, setShowAsignarInspector] = useState(false);

  // Manejamos múltiples inspectores seleccionados (hasta 2)
  // (COMENTARIO: Para cambiar el límite, ve a la lógica del onAction del Dropdown.)
  const [selectedInspectors, setSelectedInspectors] = useState<Inspector[]>([]);

  // Fecha de inspección seleccionada
  const [fechaInspeccion, setFechaInspeccion] = useState("");

  // Inspectores disponibles (simulados)
  const [inspectores] = useState<Inspector[]>([
    { id: 1, nombre: "Inspector Thomas" },
    { id: 2, nombre: "Inspector Lucy" },
    { id: 3, nombre: "Inspector Ramírez" },
    { id: 4, nombre: "Inspector Smith" },
  ]);

  // Datos simulados de solicitudes
  const [solicitudes] = useState<Solicitud[]>([
    {
      idSolicitud: 101,
      idFarmacia: 1,
      nombreFarmacia: "Farmacia ABC",
      propietario: "Juan Pérez",
      tipoSolicitud: "Apertura",
      estado: "Pendiente",
      fechaSolicitud: "2025-01-10",
    },
    {
      idSolicitud: 102,
      idFarmacia: 2,
      nombreFarmacia: "Farmacia XYZ",
      propietario: "María López",
      tipoSolicitud: "Cambio de Dirección",
      estado: "Revisando",
      fechaSolicitud: "2025-01-12",
    },
    {
      idSolicitud: 103,
      idFarmacia: 3,
      nombreFarmacia: "Farmacia Salud",
      propietario: "Farmacia Salud SRL",
      tipoSolicitud: "Renovación de Registro",
      estado: "Pendiente",
      fechaSolicitud: "2025-01-13",
    },
  ]);

  // Definimos las columnas de la tabla
  const columns = [
    { key: "idSolicitud", label: "ID Solicitud" },
    { key: "idFarmacia", label: "ID Farmacia" },
    { key: "nombreFarmacia", label: "Nombre Farmacia" },
    { key: "propietario", label: "Propietario" },
    { key: "tipoSolicitud", label: "Tipo de Solicitud" },
    { key: "fechaSolicitud", label: "Fecha Solicitud" },
    { key: "estado", label: "Estado" },
    { key: "acciones", label: "Acciones" },
  ];

  /**
   * Renderizamos cada celda según su columna
   */
  const renderCell = (solicitud: Solicitud, columnKey: string) => {
    switch (columnKey) {
      case "estado": {
        // Tomamos el color y el variant
        const { color, variant } = getBadgeColorByStatus(solicitud.estado);
        return (
          <Badge color={color} variant={variant}>
            {solicitud.estado}
          </Badge>
        );
      }

      case "acciones":
        // Botón para abrir el detalle
        return (
          <Button
            size="sm"
            color="primary"
            onPress={() => {
              setSelectedSolicitud(solicitud);
              setShowAsignarInspector(false);
              setSelectedInspectors([]);
              setFechaInspeccion("");
            }}
          >
            Ver Detalle
          </Button>
        );

      default:
        // Para las demás columnas, retornamos el valor
        return (solicitud as any)[columnKey];
    }
  };

  /**
   * Manejo de acciones (p.ej. Asignar Inspectores)
   */
  const handleAction = (action: string) => {
    if (action === "Asignar Inspectores") {
      setShowAsignarInspector(true);
      return;
    }
    // Aquí podrías manejar "Aprobar", "Rechazar", etc., si los agregas
    alert(`Acción seleccionada: ${action}`);
    setSelectedSolicitud(null);
    setShowAsignarInspector(false);
  };

  /**
   * Confirmar la asignación de Inspectores y fecha
   */
  const handleAsignarInspector = () => {
    // Validar que tengamos al menos un inspector seleccionado
    if (!selectedInspectors.length) {
      alert("Debe seleccionar al menos un inspector.");
      return;
    }
    // Aquí limitamos a 2 (si quisieras cambiarlo, busca el comentario en onAction de la lista)
    // Validar la fecha
    if (!fechaInspeccion) {
      alert("Debe seleccionar la fecha de inspección.");
      return;
    }
    if (selectedSolicitud) {
      // Debe ser posterior a la fecha de solicitud
      const fechaSolicitud = new Date(selectedSolicitud.fechaSolicitud);
      const fechaSeleccionada = new Date(fechaInspeccion);

      if (fechaSeleccionada <= fechaSolicitud) {
        alert(
          "La fecha de inspección debe ser posterior a la fecha de la solicitud."
        );
        return;
      }
    }

    // Aquí harías tu llamada a la API real
    const nombresInspectores = selectedInspectors.map((i) => i.nombre).join(", ");
    alert(
      `Inspectores asignados: ${nombresInspectores}\n` +
        `Fecha inspección: ${fechaInspeccion}\n` +
        "Asignación exitosa."
    );

    // Reset y cerrar modal
    setShowAsignarInspector(false);
    setSelectedInspectors([]);
    setFechaInspeccion("");
    setSelectedSolicitud(null);
  };

  /**
   * Manejo de selección de inspectores (hasta 2).
   * Cuando se selecciona un inspector del Dropdown, 
   * lo añadimos a selectedInspectors si no está ya y 
   * si no excede el límite.
   */
  const handleSelectInspector = (id: string) => {
    const inspectorId = Number(id);
    const existing = selectedInspectors.find((insp) => insp.id === inspectorId);
    if (existing) {
      // Ya está en la lista
      return;
    }

    // LIMITE DE 2 INSPECTORES
    // (COMENTARIO: Para cambiarlo, ajusta el número aquí)
    if (selectedInspectors.length >= 2) {
      alert("Solo puedes asignar hasta 2 inspectores.");
      return;
    }

    const inspectorSeleccionado = inspectores.find((i) => i.id === inspectorId);
    if (inspectorSeleccionado) {
      setSelectedInspectors((prev) => [...prev, inspectorSeleccionado]);
    }
  };

  return (
    <AdministradorLayout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold mb-6">Panel de Administración</h1>

        {/* TARJETAS DE ARRIBA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="text-sm font-medium">Total Usuarios</div>
              <Users size={24} className="text-gray-500" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">1,234</div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="text-sm font-medium">Total Farmacias</div>
              <Building2 size={24} className="text-gray-500" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">567</div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="text-sm font-medium">Inspecciones Pendientes</div>
              <ClipboardCheck size={24} className="text-gray-500" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">89</div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="text-sm font-medium">Certificados Emitidos</div>
              <Award size={24} className="text-gray-500" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">456</div>
            </CardBody>
          </Card>
        </div>

        {/* TABLA DE SOLICITUDES */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Solicitudes Pendientes</h2>
          <Table
            aria-label="Tabla de Solicitudes Pendientes"
            css={{ height: "auto", minWidth: "100%" }}
          >
            <TableHeader>
              {columns.map((col) => (
                <TableColumn key={col.key}>{col.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {solicitudes.map((sol) => (
                <TableRow key={sol.idSolicitud}>
                  {columns.map((col) => (
                    <TableCell key={`${sol.idSolicitud}-${col.key}`}>
                      {renderCell(sol, col.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* MODAL DETALLE DE LA SOLICITUD */}
        {selectedSolicitud && (
          <Modal
            isOpen={!!selectedSolicitud}
            onClose={() => {
              setSelectedSolicitud(null);
              setShowAsignarInspector(false);
              setSelectedInspectors([]);
              setFechaInspeccion("");
            }}
          >
            <ModalContent>
              <ModalHeader>
                <h2>Detalles de la Solicitud</h2>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-2">
                  <p>
                    <strong>ID Solicitud:</strong> {selectedSolicitud.idSolicitud}
                  </p>
                  <p>
                    <strong>ID Farmacia:</strong> {selectedSolicitud.idFarmacia}
                  </p>
                  <p>
                    <strong>Nombre Farmacia:</strong>{" "}
                    {selectedSolicitud.nombreFarmacia}
                  </p>
                  <p>
                    <strong>Propietario:</strong> {selectedSolicitud.propietario}
                  </p>
                  <p>
                    <strong>Tipo de Solicitud:</strong>{" "}
                    {selectedSolicitud.tipoSolicitud}
                  </p>
                  <p>
                    <strong>Fecha Solicitud:</strong>{" "}
                    {selectedSolicitud.fechaSolicitud}
                  </p>
                  <p>
                    <strong>Tiempo de compromiso:</strong>{" "}
                    Hasta el{" "}
                    <span className="font-semibold">
                      {calcularFechaLimite(selectedSolicitud.fechaSolicitud)}
                    </span>{" "}
                    (7 días)
                  </p>
                  <p>
                    <strong>Estado:</strong> {selectedSolicitud.estado}
                  </p>
                </div>

                {/* Acciones (si no estamos asignando inspector) */}
                {!showAsignarInspector && (
                  <div className="mt-6 flex gap-2 flex-wrap">
                    {obtenerAccionesPorTipo(selectedSolicitud.tipoSolicitud).map(
                      (accion) => (
                        <Button
                          key={accion.label}
                          color={accion.color as any}
                          onPress={() => handleAction(accion.label)}
                        >
                          {accion.label}
                        </Button>
                      )
                    )}
                  </div>
                )}

                {/* Sección de "Asignar Inspectores" (permite hasta 2 inspectores) */}
                {showAsignarInspector && (
                  <div className="mt-6 space-y-4 border-t pt-4">
                    <h3 className="text-lg font-semibold">
                      Asignar Inspectores y Programar Inspección
                    </h3>

                    {/* Dropdown para seleccionar Inspectores */}
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered">
                          {selectedInspectors.length
                            ? `Elegidos: ${selectedInspectors
                                .map((i) => i.nombre)
                                .join(", ")}`
                            : "Seleccione Inspector"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Inspectores Disponibles"
                        onAction={handleSelectInspector}
                      >
                        {inspectores.map((ins) => (
                          <DropdownItem key={ins.id} id={String(ins.id)}>
                            {ins.nombre}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>

                    {/* Fecha de Inspección (obligatorio > fecha de solicitud) */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Fecha de Inspección
                      </label>
                      <Input
                        type="date"
                        value={fechaInspeccion}
                        onValueChange={(val) => setFechaInspeccion(val)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button color="success" onPress={handleAsignarInspector}>
                        Confirmar
                      </Button>
                      <Button
                        variant="bordered"
                        color="default"
                        onPress={() => {
                          setShowAsignarInspector(false);
                          setSelectedInspectors([]);
                          setFechaInspeccion("");
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </div>
    </AdministradorLayout>
  );
};

export default AdminDashboardPage;


import React, { useEffect, useState } from "react";
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
      return { color: "default", variant: "flat" };
  }
}

/** 
 * Determina qué acciones mostrar.
 */
function obtenerAccionesPorTipo(tipo: string) {
  let acciones = [{ label: "Asignar Inspectores", color: "warning" }];
  // Podrías agregar “Aprobar”, “Rechazar”, etc.
  return acciones;
}

/**
 * Calcula fecha límite (7 días después de la solicitud).
 */
function calcularFechaLimite(fechaSolicitud: string) {
  const dateObj = new Date(fechaSolicitud);
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
  const limitDate = new Date(dateObj.getTime() + oneWeekMs);
  return limitDate.toISOString().split("T")[0];
}

const AdminDashboardPage: React.FC = () => {
  // Modal: Solicitud seleccionada
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);
  const [showAsignarInspector, setShowAsignarInspector] = useState(false);

  // Inspectores seleccionados (hasta 2)
  const [selectedInspectors, setSelectedInspectors] = useState<Inspector[]>([]);
  const [fechaInspeccion, setFechaInspeccion] = useState("");

  // Inspectores disponibles (harcodeado)
  const [inspectores] = useState<Inspector[]>([
    { id: 1, nombre: "Inspector Thomas" },
    { id: 2, nombre: "Inspector Lucy" },
    { id: 3, nombre: "Inspector Ramírez" },
    { id: 4, nombre: "Inspector Smith" },
  ]);

  // Lista de solicitudes cargadas desde la API
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

  // Stats
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalFarmacias: 0,
    inspeccionesPendientes: 0,
    certificadosEmitidos: 0,
  });

  /** 1) Efecto para cargar stats y solicitudes */
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchStats = async () => {
      let totalUsuarios = 0;
      let totalFarmacias = 0;
      let inspeccionesPendientes = 0;
      let certificadosEmitidos = 0;

      try {
        // Usuarios
        const userResponse = await fetch("http://localhost:5041/api/UserAccounts", {
          headers: { Accept: "application/json" },
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          totalUsuarios = userData.length || 0;
        }
      } catch (error) {
        console.error("Error fetching /api/UserAccounts", error);
      }

      try {
        // Farmacias totales
        const farmResponse = await fetch("http://localhost:5041/api/DrugStores/total", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (farmResponse.ok) {
          const farmData = await farmResponse.json();
          totalFarmacias = parseInt(farmData) || 0;
        }
      } catch (error) {
        console.error("Error fetching /api/DrugStores/total", error);
      }

      try {
        // Inspecciones pendientes
        const inspectionResponse = await fetch("http://localhost:5041/api/Inspection/pending", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (inspectionResponse.ok) {
          const inspectionData = await inspectionResponse.json();
          inspeccionesPendientes = inspectionData.length || 0;
        } else if (inspectionResponse.status === 404) {
          inspeccionesPendientes = 0;
        }
      } catch (error) {
        console.error("Error fetching /api/Inspection/pending", error);
      }

      try {
        // Certificados emitidos
        const licenseResponse = await fetch("http://localhost:5041/api/License", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (licenseResponse.ok) {
          const licenseData = await licenseResponse.json();
          certificadosEmitidos = licenseData.length || 0;
        }
      } catch (error) {
        console.error("Error fetching /api/License", error);
      }

      setStats({
        totalUsuarios,
        totalFarmacias,
        inspeccionesPendientes,
        certificadosEmitidos,
      });
    };

    const fetchSolicitudes = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await fetch("http://localhost:5041/api/Request", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (!resp.ok) {
          throw new Error("Error al obtener solicitudes");
        }
        const data = await resp.json();
        // Ajustar mapeo según estructura:
        // Ej. item: { requestId, drugStoreId, sendDate, requestType, statusReq, drugStore { nameDs, ownerName }, ... }
        const mapped: Solicitud[] = data.map((item: any) => ({
          idSolicitud: item.requestId,
          idFarmacia: item.drugStoreId,
          nombreFarmacia: item.drugStore?.nameDs || "(Desconocida)",
          propietario: item.drugStore?.owner?.nameOwner || "(Desconocido)",
          tipoSolicitud: item.requestType?.typeReq || "N/A",
          estado: item.statusReq?.statusReq || "Pendiente",
          fechaSolicitud: item.sendDate?.split("T")[0] || "",
        }));
        setSolicitudes(mapped);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
    fetchSolicitudes();
  }, []);

  // Columnas de la tabla
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

  const renderCell = (solicitud: Solicitud, columnKey: string) => {
    switch (columnKey) {
      case "estado": {
        const { color, variant } = getBadgeColorByStatus(solicitud.estado);
        return (
          <Badge color={color} variant={variant}>
            {solicitud.estado}
          </Badge>
        );
      }
      case "acciones":
        return (
          <Button
            className="bg-[#4E5BA6]"
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
        return (solicitud as any)[columnKey];
    }
  };

  // Manejo de acciones (p.ej. Asignar Inspectores)
  const handleAction = (action: string) => {
    if (action === "Asignar Inspectores") {
      setShowAsignarInspector(true);
      return;
    }
    // Otras acciones: "Aprobar", "Rechazar", etc.
    alert(`Acción seleccionada: ${action}`);
    setSelectedSolicitud(null);
    setShowAsignarInspector(false);
  };

  // Confirmar Asignación de Inspectores (PUT /api/Request/{id}/status?)
  const handleAsignarInspector = async () => {
    if (!selectedInspectors.length) {
      alert("Debe seleccionar al menos un inspector.");
      return;
    }
    if (!fechaInspeccion) {
      alert("Debe seleccionar la fecha de inspección.");
      return;
    }
    if (selectedSolicitud) {
      const fechaSolicitud = new Date(selectedSolicitud.fechaSolicitud);
      const fechaSeleccionada = new Date(fechaInspeccion);
      if (fechaSeleccionada <= fechaSolicitud) {
        alert("La fecha de inspección debe ser posterior a la fecha de la solicitud.");
        return;
      }
    }

    try {
      const token = localStorage.getItem("token");
      // Cambiamos la solicitud a "Revisando" (ej. statusReqId=2).
      const newStatusReqId = 2; 
      const resp = await fetch(
        `http://localhost:5041/api/Request/${selectedSolicitud?.idSolicitud}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStatusReqId),
        }
      );
      if (!resp.ok) {
        throw new Error(`Error al asignar estado. Status: ${resp.status}`);
      }

      const nombresInspectores = selectedInspectors.map((i) => i.nombre).join(", ");
      alert(
        `Inspectores asignados: ${nombresInspectores}\n` +
        `Fecha inspección: ${fechaInspeccion}\n` +
        "Solicitud actualizada a 'Revisando'."
      );

      // Opcional: recargar la lista de solicitudes para ver el cambio en su estado
      // o actualizar localmente
      setSolicitudes((prev) =>
        prev.map((sol) =>
          sol.idSolicitud === selectedSolicitud?.idSolicitud
            ? { ...sol, estado: "Revisando" }
            : sol
        )
      );
    } catch (error) {
      console.error(error);
      alert("Error asignando la inspección.");
    }

    setShowAsignarInspector(false);
    setSelectedInspectors([]);
    setFechaInspeccion("");
    setSelectedSolicitud(null);
  };

  // Manejo de selección de inspectores (hasta 2)
  const handleSelectInspector = (id: string) => {
    const inspectorId = Number(id);
    const existing = selectedInspectors.find((insp) => insp.id === inspectorId);
    if (existing) return;

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

        {/* TARJETAS DE ARRIBA (Estadísticas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-[#EAECF5]">
            <CardHeader className="flex items-center justify-between">
              <div className="text-sm font-medium">Total Usuarios</div>
              <Users size={24} className="text-gray-500" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">{stats.totalUsuarios}</div>
            </CardBody>
          </Card>

          <Card className="bg-[#EAECF5]">
            <CardHeader className="flex items-center justify-between">
              <div className="text-sm font-medium">Total Farmacias</div>
              <Building2 size={24} className="text-gray-500" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">{stats.totalFarmacias}</div>
            </CardBody>
          </Card>

          <Card className="bg-[#EAECF5]">
            <CardHeader className="flex items-center justify-between">
              <div className="text-sm font-medium">Inspecciones Pendientes</div>
              <ClipboardCheck size={24} className="text-gray-500" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">{stats.inspeccionesPendientes}</div>
            </CardBody>
          </Card>

          <Card className="bg-[#EAECF5]">
            <CardHeader className="flex items-center justify-between">
              <div className="text-sm font-medium">Certificados Emitidos</div>
              <Award size={24} className="text-gray-500" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">{stats.certificadosEmitidos}</div>
            </CardBody>
          </Card>
        </div>

        {/* TABLA DE SOLICITUDES */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Solicitudes Pendientes</h2>
          <Table aria-label="Tabla de Solicitudes Pendientes" css={{ height: "auto", minWidth: "100%" }}>
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

        {/* MODAL DETALLE DE SOLICITUD */}
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
                    <strong>Nombre Farmacia:</strong> {selectedSolicitud.nombreFarmacia}
                  </p>
                  <p>
                    <strong>Propietario:</strong> {selectedSolicitud.propietario}
                  </p>
                  <p>
                    <strong>Tipo de Solicitud:</strong> {selectedSolicitud.tipoSolicitud}
                  </p>
                  <p>
                    <strong>Fecha Solicitud:</strong> {selectedSolicitud.fechaSolicitud}
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

                {/* Acciones si NO estamos asignando inspector */}
                {!showAsignarInspector && (
                  <div className="mt-6 flex gap-2 flex-wrap">
                    {obtenerAccionesPorTipo(selectedSolicitud.tipoSolicitud).map((accion) => (
                      <Button
                        className="bg-[#4E5BA6] text-white"
                        key={accion.label}
                        color={accion.color as any}
                        onPress={() => handleAction(accion.label)}
                      >
                        {accion.label}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Sección "Asignar Inspectores" */}
                {showAsignarInspector && (
                  <div className="mt-6 space-y-4 border-t pt-4">
                    <h3 className="text-lg font-semibold">
                      Asignar Inspectores y Programar Inspección
                    </h3>

                    {/* Dropdown de Inspectores */}
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered" className="border-[#4E5BA6] text-[#4E5BA6]">
                          {selectedInspectors.length
                            ? `Elegidos: ${selectedInspectors.map((i) => i.nombre).join(", ")}`
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

                    {/* Fecha de Inspección */}
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
                      <Button
                        color="success"
                        onPress={handleAsignarInspector}
                        className="bg-[#4E5BA6] text-white"
                      >
                        Confirmar
                      </Button>
                      <Button
                        className="bg-[#EF4444] text-white"
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

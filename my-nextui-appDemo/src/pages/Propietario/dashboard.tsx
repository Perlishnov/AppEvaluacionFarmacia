/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import PropietarioLayout from "../../layouts/PropietarioLayout";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button, Dropdown, Input, Tabs, Tab, DropdownItem, DropdownTrigger, DropdownMenu, Select, SelectItem } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/modal";


const provinces = ["Provincia 1", "Provincia 2", "Provincia 3"]; // Lista de provincias
const municipalities = ["Municipio 1", "Municipio 2", "Municipio 3"]; // Lista de municipios
const userPharmacies = ["Farmacia 1", "Farmacia 2", "Farmacia 3"]; // Farmacias del usuario

function RequestFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [operation, setOperation] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Propietario
    ownerName: "",
    ownerDocument: "",
    ownerAddress: "",
    ownerPhone: "",
    ownerEmail: "",
    ownerMobile: "",
    // Director Técnico
    directorName: "",
    directorLastName: "",
    directorDocument: "",
    directorAddress: "",
    directorPhone: "",
    directorEmail: "",
    directorProfession: "",
    directorExequatur: "",
    issueDate: "",
    // Establecimiento
    pharmacyType: "",
    activityType: "",
    pharmacyName: "",
    newPharmacyName: "",
    pharmacyAddress: "",
    pharmacyStreet: "",
    pharmacySector: "",
    pharmacyCity: "",
    pharmacyMunicipality: "",
    pharmacyProvince: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderTabsContent = () => {
    switch (operation) {
      case "Apertura":
        return (
          <>
            {renderOwnerSection()}
            {renderDirectorSection()}
            {renderEstablishmentSection()}
          </>
        );
      case "Renovación de Registro":
        return renderEstablishmentSection();
      case "Cambio de Director Técnico":
        return renderDirectorSection();
      case "Cambio de Nombre":
        return (
          <Tab title="Nuevo Nombre">
            <Input
              label="Nuevo Nombre"
              name="newPharmacyName"
              value={formData.newPharmacyName}
              onChange={handleInputChange}
              required
            />
          </Tab>
        );
      case "Cambio de Propietario":
        return renderOwnerSection();
      case "Cambio de Dirección":
        return (
          <Tab title="Nueva Dirección">
            <Input
              label="Nueva Dirección"
              name="pharmacyAddress"
              value={formData.pharmacyAddress}
              onChange={handleInputChange}
              required
            />
          </Tab>
        );
      case "Cambio de Razón Social":
        return (
          <Tab title="Tipo de Actividad">
            <Input
              label="Tipo de Actividad"
              name="activityType"
              value={formData.activityType}
              onChange={handleInputChange}
              required
            />
          </Tab>
        );
      default:
        return null;
    }
  };

  const renderOwnerSection = () => (
    <Tab title="Datos del Propietario" className="flex-col">
      <Input
        label="Nombre o Razón Social"
        name="ownerName"
        value={formData.ownerName}
        onChange={handleInputChange}
        required
      />
      <Input
        label="No. de RNC/Cédula"
        name="ownerDocument"
        value={formData.ownerDocument}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Dirección"
        name="ownerAddress"
        value={formData.ownerAddress}
        onChange={handleInputChange}
      />
      <Input
        label="No. de Teléfono"
        name="ownerPhone"
        value={formData.ownerPhone}
        onChange={handleInputChange}
      />
      <Input
        label="Correo Electrónico"
        name="ownerEmail"
        value={formData.ownerEmail}
        onChange={handleInputChange}
      />
      <Input
        label="No. de Tel. Móvil"
        name="ownerMobile"
        value={formData.ownerMobile}
        onChange={handleInputChange}
      />
    </Tab>
  );

  const renderDirectorSection = () => (
    <Tab title="Datos del Director Técnico">
      <Input
        label="Nombre del Director Técnico"
        name="directorName"
        value={formData.directorName}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Apellidos"
        name="directorLastName"
        value={formData.directorLastName}
        onChange={handleInputChange}
        required
      />
      <Input
        label="No. Cédula"
        name="directorDocument"
        value={formData.directorDocument}
        onChange={handleInputChange}
      />
      <Input
        label="Profesión"
        name="directorProfession"
        value={formData.directorProfession}
        onChange={handleInputChange}
      />
      <Input
        label="No. de Exequatur"
        name="directorExequatur"
        value={formData.directorExequatur}
        onChange={handleInputChange}
      />
      <Input
        label="Fecha de Emisión"
        name="issueDate"
        type="date"
        value={formData.issueDate}
        onChange={handleInputChange}
      />
    </Tab>
  );

  const renderEstablishmentSection = () => (
    <Tab title="Datos del Establecimiento">
      <Input
        label="Tipo de Establecimiento"
        name="pharmacyType"
        value={formData.pharmacyType}
        onChange={handleInputChange}
      />
      <Input
        label="Tipo de Actividad"
        name="activityType"
        value={formData.activityType}
        onChange={handleInputChange}
      />
      <Input
        label="Nombre Actual"
        name="pharmacyName"
        value={formData.pharmacyName}
        onChange={handleInputChange}
      />
      <Input
        label="Dirección completa"
        name="pharmacyAddress"
        value={formData.pharmacyAddress}
        onChange={handleInputChange}
      />
      <Select
        label="Provincia"
        value={formData.pharmacyProvince}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, pharmacyProvince: value }))
        }
        required
      >
        {provinces.map((province) => (
          <SelectItem key={province} value={province}>
            {province}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Municipio"
        value={formData.pharmacyMunicipality}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, pharmacyMunicipality: value }))
        }
        required
      >
        {municipalities.map((municipality) => (
          <SelectItem key={municipality} value={municipality}>
            {municipality}
          </SelectItem>
        ))}
      </Select>
    </Tab>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2>Solicitud de Registro</h2>
        </ModalHeader>
        <ModalBody>
          <Tabs className="mt-4">
            <Tab title="Seleccionar Operación">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">
                    {operation || "Selecciona la operación"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu onAction={(value) => setOperation(value.toString())}>
                  {[
                    "Apertura",
                    "Renovación de Registro",
                    "Cambio de Director Técnico",
                    "Cambio de Nombre",
                    "Cambio de Propietario",
                    "Cambio de Dirección",
                    "Cambio de Razón Social",
                  ].map((option) => (
                    <DropdownItem key={option}>{option}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Tab>
            {operation && renderTabsContent()}
          </Tabs>
          <Button type="submit" className="mt-4" color="primary">
            Enviar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

// Tabla de Peticiones
function PetitionsTable() {
  const [selectedPetition, setSelectedPetition] = useState<null | {
    id: number;
    date: string;
    status: string;
    drugStoreId: number;
  }>(null);

  const petitionsData = [
    { id: 1, date: "2023-05-01", status: "Pendiente", drugStoreId: 101 },
    { id: 2, date: "2023-05-02", status: "Aprobada", drugStoreId: 102 },
    { id: 3, date: "2023-05-03", status: "Rechazada", drugStoreId: 103 },
  ];

  return (
    <Card>
      <CardHeader>
        <h3>Mis Peticiones</h3>
      </CardHeader>
      <CardBody>
        <Table aria-label="Mis Peticiones" className="w-full">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Fecha</TableColumn>
            <TableColumn>Estado</TableColumn>
            <TableColumn>ID de Farmacia</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody>
            {petitionsData.map((petition) => (
              <TableRow key={petition.id}>
                <TableCell>{petition.id}</TableCell>
                <TableCell>{petition.date}</TableCell>
                <TableCell>{petition.status}</TableCell>
                <TableCell>{petition.drugStoreId}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => setSelectedPetition(petition)}
                  >
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
      <Modal isOpen={!!selectedPetition} onClose={() => setSelectedPetition(null)}>
        <ModalContent>
          <ModalHeader>
            <h2>Detalles de la Petición</h2>
          </ModalHeader>
          <ModalBody>
            {selectedPetition && (
              <div>
                <p>
                  <strong>ID:</strong> {selectedPetition.id}
                </p>
                <p>
                  <strong>Fecha:</strong> {selectedPetition.date}
                </p>
                <p>
                  <strong>Estado:</strong> {selectedPetition.status}
                </p>
                <p>
                  <strong>ID de Farmacia:</strong> {selectedPetition.drugStoreId}
                </p>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
}

// Dashboard Principal
export default function PropietarioDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    // Objeto con datos simulados del usuario
    const usuarioSimulado = {
      nameOwner: "Juan",
      lastNameOwner: "Pérez",
      emailOwner: "juan.perez@email.com",
      phoneOwner: "809-123-4567",
    };

    // Simula el proceso de carga de datos
    setTimeout(() => {
      setUsuario(usuarioSimulado);
      setLoading(false);
    }, 500); // Simula un retraso de 500ms
  }, []);

  if (loading) {
    return <div className="p-6">Cargando datos del usuario...</div>;
  }

  if (!usuario) {
    return <div className="p-6 text-red-600">No se encontraron datos del usuario.</div>;
  }

  return (
    <PropietarioLayout>
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Dashboard del Propietario</h1>
        {/* Datos del Usuario */}
        <div className="bg-gray-50 p-6 rounded-lg border flex items-center gap-4">
          {/* Información del Usuario */}
          <div>
            <h3 className="text-lg font-bold mb-2">Datos del Usuario</h3>
            <p>
              <strong>Nombre:</strong> {usuario.nameOwner} {usuario.lastNameOwner}
            </p>
            <p>
              <strong>Correo:</strong> {usuario.emailOwner}
            </p>
            <p>
              <strong>Teléfono:</strong> {usuario.phoneOwner}
            </p>
          </div>
          </div>
        {/* Botón para Registrar Nueva Farmacia */}
        <div className="flex">
          <Button onPress={() => setIsModalOpen(true)} color="primary">
            Nueva solicitud
            <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
          </Button>
        
        </div>
        {/* Tabla de Peticiones */}
        <div>
          <PetitionsTable />
        </div>
        {/* Modal para Registrar Nueva Farmacia */}
        <RequestFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </PropietarioLayout>
  );
}

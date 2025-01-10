import PropietarioLayout from "../../layouts/PropietarioLayout";
import React, { useState } from "react";
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
import { Button, Avatar } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";

// Modal para Registrar Farmacia
function RegisterPharmacyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "",
    licenses: "",
    documents: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, documents: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2>Registrar Farmacia</h2>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nombre de la farmacia"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ej: Farmacia Central"
              required
            />
            <Input
              label="Ubicación"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Dirección exacta"
              required
            />
            <Input
              label="Tipo de establecimiento"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="Retail o Hospitalario"
              required
            />
            <Input
              label="Licencias y permisos legales"
              name="licenses"
              value={formData.licenses}
              onChange={handleInputChange}
              placeholder="Descripción breve"
              required
            />
            <Input
              label="Documentos requeridos"
              type="file"
              onChange={handleFileChange}
              required
            />
            <Button type="submit" color="primary" className="w-full">
              Enviar Solicitud
            </Button>
          </form>
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

  return (
    <PropietarioLayout>
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Dashboard del Propietario</h1>
        {/* Datos del Usuario */}
        <div className="bg-gray-50 p-6 rounded-lg border flex items-center gap-4">
          <Avatar
            alt="Foto de perfil"
            className="w-40 h-40 text-large rounded-full"
            src="https://i.pravatar.cc/450?u=usuario"
          />
          {/* Información del Usuario */}
          <div>
            <h3 className="text-lg font-bold mb-2">Datos del Usuario</h3>
            <p>Nombre: Juan Pérez</p>
            <p>Correo: juan.perez@email.com</p>
            <p>Rol: Propietario de Farmacia</p>
          </div>
        </div>
        {/* Botón para Registrar Nueva Farmacia */}
        <div className="flex">
          <Button onPress={() => setIsModalOpen(true)} color="primary">
            Registrar Nueva Farmacia
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
        <RegisterPharmacyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </PropietarioLayout>
  );
}

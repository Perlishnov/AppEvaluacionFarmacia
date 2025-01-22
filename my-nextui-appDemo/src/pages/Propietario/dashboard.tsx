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
import { Button, Avatar } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/modal";
import { jwtDecode } from "jwt-decode";
import RequestFormModal from "./RequestFormModal";


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
                <TableCell>{petition.drugStoreId}</TableCell>
                <TableCell>{petition.status}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    className="bg-[#4E5BA6] text-white"
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

export default function PropietarioDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Function to decode JWT and extract userId
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No JWT token found in localStorage.");
      return null;
    }

    try {
      const decodedToken: { userId: string } = jwtDecode(token);
      return decodedToken.userId;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const userId = getUserIdFromToken();

      if (!userId) {
        setUsuario(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5041/api/UserAccounts/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="p-6">Cargando datos del usuario...</div>;
  }

  if (!usuario) {
    return <div className="p-6 text-red-600">No se encontraron datos del usuario.</div>;
  }

  // Function to get initials from the user's name
  const getInitials = (name: string, lastName: string) => {
    const firstInitial = name.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <PropietarioLayout>
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Dashboard del Propietario</h1>
        <div className="bg-gray-50 p-6 rounded-lg border flex items-center gap-4">
          {/* User Avatar */}
          <Avatar
          isBordered
          className="w-20 h-20 text-large"
            size="lg"
            color="primary"
            name={getInitials(usuario.nameUser, usuario.lastNameUser)}
          />
          <div>
            <h3 className="text-lg font-bold mb-2">Datos del Usuario</h3>
            <p>
              <strong>Nombre:</strong> {usuario.nameUser} {usuario.lastNameUser}
            </p>
            <p>
              <strong>Correo:</strong> {usuario.emailUser}
            </p>
            <p>
              <strong>Teléfono:</strong> {usuario.phoneUser || "No disponible"}
            </p>
          </div>
        </div>

        {/* New Request Button */}
        <div className="flex">
          <Button className="bg-[#4E5BA6] text-white" onPress={() => setIsModalOpen(true)} color="primary">
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
        <div>
          <PetitionsTable />
        </div>
        <RequestFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userPharmacies={["Farmacia 1", "Farmacia 2", "Farmacia 3"]}
        />
      </div>
    </PropietarioLayout>
  );
}
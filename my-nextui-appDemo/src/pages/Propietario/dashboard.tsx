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
  ModalFooter
} from "@nextui-org/modal";
import { jwtDecode } from "jwt-decode";
import RequestFormModal from "./RequestFormModal";
import { Eye } from "lucide-react";

interface Petition {
  requestId: number;
  sendDate: string;
  details: string;
  userId: number;
  drugStoreId: number;
  requestTypeId: number;
  statusReqId: number;
  drugStore: string | null;
  requestType: string | null;
  statusReq: string | null;
  user: string | null;
}


function PetitionsTable() {
const [petitionsData, setPetitionsData] = useState<Petition[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPetition, setSelectedPetition] = useState<Petition | null>(null);
  const token = localStorage.getItem("token"); // Obtén el token JWT del almacenamiento local

  useEffect(() => {
    const fetchPetitions = async () => {
      if (!token) {
        console.error("Token no encontrado");
        setLoading(false);
        return;
      }

      try {
        // Decodificar el token para obtener el userId
        const decodedToken: { userId: number } = jwtDecode(token);
        const userId = decodedToken.userId;

        if (!userId) {
          console.error("El token no contiene un userId");
          setLoading(false);
          return;
        }

        // Llamada a la API para obtener las solicitudes del usuario
        const response = await fetch(`http://localhost:5041/api/Request/user/${userId}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data: Petition[] = await response.json();
          setPetitionsData(data);
        } else {
          console.error("Error fetching petitions data:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error decodificando el token o haciendo la petición:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetitions();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="py-3">Solicitudes del Usuario</h3>
      <Table
        aria-label="Tabla de solicitudes"
        className="max-w-full"
        onRowClick={(row) => setSelectedPetition(row)}
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Fecha de Envío</TableColumn>
          <TableColumn>Detalles</TableColumn>
          <TableColumn>Farmacia ID</TableColumn>
          <TableColumn>Tipo de Solicitud</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {petitionsData.map((petition) => (
            <TableRow
              key={petition.requestId}
              onClick={() => setSelectedPetition(petition)}
            >
              <TableCell>{petition.requestId}</TableCell>
              <TableCell>{new Date(petition.sendDate).toLocaleDateString()}</TableCell>
              <TableCell>{petition.details}</TableCell>
              <TableCell>{petition.drugStoreId}</TableCell>
              <TableCell>{petition.requestType || "No especificado"}</TableCell>
              <TableCell>{petition.statusReq || "No especificado"}</TableCell>
              <TableCell>
                <Button
                  isIconOnly
                  variant="light"
                  color="primary"
                  onPress={() => setSelectedPetition(petition)}
                >
                  <Eye />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal para mostrar los detalles de la petición */}
      <Modal
        isOpen={!!selectedPetition}
        onClose={() => setSelectedPetition(null)}
      >
        <ModalContent>
          <ModalHeader>
            <h2>Detalles de la Petición</h2>
          </ModalHeader>
          <ModalBody>
            {selectedPetition && (
              <div>
                <p>
                  <strong>ID:</strong> {selectedPetition.requestId}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(selectedPetition.sendDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Detalles:</strong> {selectedPetition.details}
                </p>
                <p>
                  <strong>ID de Farmacia:</strong> {selectedPetition.drugStoreId}
                </p>
                <p>
                  <strong>Tipo de Solicitud:</strong>{" "}
                  {selectedPetition.requestType || "No especificado"}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  {selectedPetition.statusReq || "No especificado"}
                </p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onPress={() => setSelectedPetition(null)}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default function PropietarioDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userPharmacies, setUserPharmacies] = useState<{ id: number, name: string }[]>([]); // Cambié el estado para contener ID y nombre

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

  // Fetch user data
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
        const response = await fetch(
          `http://localhost:5041/api/UserAccounts/${parseInt(userId)}`
        );
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

  // Fetch user pharmacies
  useEffect(() => {
    const fetchUserPharmacies = async () => {
      const userId = getUserIdFromToken();

      if (!userId) {
        setUserPharmacies([]);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5041/api/DrugStores/details/by-owner/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pharmacies");
        }

        const data = await response.json();
        // Mapeamos los datos para obtener tanto el ID como el nombre
        const pharmacies = data.map((pharmacy: any) => ({
          id: pharmacy.drugStoreID, // ID de la farmacia
          name: pharmacy.nameDS,    // Nombre de la farmacia
        }));
        setUserPharmacies(pharmacies);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
        setUserPharmacies([]);
      }
    };

    fetchUserPharmacies();
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
          </div>
        </div>

        {/* New Request Button */}
        <div className="flex">
          <Button
            className="bg-[#4E5BA6] text-white"
            onPress={() => setIsModalOpen(true)}
            color="primary"
          >
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
          userPharmacies={userPharmacies} // Ahora pasamos el arreglo de objetos con ID y nombre
        />
      </div>
    </PropietarioLayout>
  );
}
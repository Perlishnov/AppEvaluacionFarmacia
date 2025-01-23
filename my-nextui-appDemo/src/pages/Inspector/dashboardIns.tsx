import React, { useEffect, useState } from "react";
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
import {jwtDecode} from "jwt-decode";

function getBadgeColorByStatus(status: string) {
  switch (status.toLowerCase()) {
    case "pendiente":
      return { color: "warning", variant: "solid" }; // Yellow
    case "aprobado":
      return { color: "success", variant: "solid" }; // Green
    case "rechazado":
      return { color: "danger", variant: "solid" }; // Red
    default:
      return { color: "default", variant: "flat" }; // Default
  }
}

interface Inspection {
  inspectionId: number;
  scheduledDate: string;
  modifiedDate: string;
  drugStoreId: number;
  drugStoreName: string;
  statusInspId: number;
  status: string;
}

function InspectionsTable() {
  const navigate = useNavigate();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        setLoading(true);
        setError("");

        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found.");
        }

        // Decode the token to extract inspectorId
        const decodedToken: any = jwtDecode(token);
        const inspectorId = decodedToken.userId;

        // Fetch from API
        const response = await fetch(
          `http://localhost:5041/api/Inspector/inspections?inspectorId=${inspectorId}`,
          {
            method: "GET",
            headers: {
              "Accept": "text/plain", // Ensures correct response format
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching inspections.");
        }

        const data: Inspection[] = await response.json(); // Parse the JSON response
        setInspections(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load inspections.");
      } finally {
        setLoading(false);
      }
    };

    fetchInspections();
  }, []);

  if (loading) {
    return <p>Cargando inspecciones...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const pendingInspections = inspections.filter(
    (inspection) => inspection.status.toLowerCase() === "en espera"
  );
  const otherInspections = inspections.filter(
    (inspection) => inspection.status.toLowerCase() !== "en espera"
  );

  return (
    <div className="space-y-6">
      {/* Pending Inspections */}
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
                  <TableRow key={inspection.inspectionId}>
                    <TableCell>{inspection.inspectionId}</TableCell>
                    <TableCell>{inspection.scheduledDate}</TableCell>
                    <TableCell>
                      <Badge {...getBadgeColorByStatus(inspection.status)}>
                        {inspection.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{inspection.drugStoreName}</TableCell>
                    <TableCell>
                      <button
                        className="px-4 py-2 bg-[#4E5BA6] text-white rounded hover:bg-[#3A4786] transition-all"
                        onClick={() =>
                          navigate(`/inspector/farmacia/${inspection.drugStoreId}`)
                        }
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

      {/* Other Inspections */}
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
                  <TableRow key={inspection.inspectionId}>
                    <TableCell>{inspection.inspectionId}</TableCell>
                    <TableCell>{inspection.scheduledDate}</TableCell>
                    <TableCell>
                      <Badge {...getBadgeColorByStatus(inspection.status)}>
                        {inspection.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{inspection.drugStoreName}</TableCell>
                    <TableCell>
                      <button
                        className="px-4 py-2 bg-[#4E5BA6] text-white rounded hover:bg-[#3A4786] transition-all"
                        onClick={() =>
                          navigate(`/inspector/farmacia/${inspection.drugStoreId}`)
                        }
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

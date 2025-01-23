import React, { useEffect, useState } from "react";
import PropietarioLayout from "../../layouts/PropietarioLayout";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import {jwtDecode} from "jwt-decode";
import { Button } from "@nextui-org/react";

type Pharmacy = {
  drugStoreID: number;
  documentDS: string;
  nameDS: string;
  phoneDS: string;
  address: string;
  shortName: string;
  altitude: number;
  longitude: number;
  registrationDate: string;
  type: string;
  status: string;
  image: string;
};

export default function MisFarmacias() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found. Please log in again.");
        }

        // Decode the token to get ownerId
        const decodedToken: any = jwtDecode(token);
        const ownerId = decodedToken.userId;

        // Fetch pharmacies by ownerId
        const res = await fetch(`http://localhost:5041/api/DrugStores/details/by-owner/${ownerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        
        if (!res.ok) {
          throw new Error("Failed to fetch pharmacies.");
        }

        const data: Pharmacy[] = await res.json();
        setPharmacies(data);
      } catch (err: any) {
        console.error("Error fetching pharmacies:", err);
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  if (loading) {
    return <div className="p-6">Cargando datos...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <PropietarioLayout>
      <div className="p-6 space-y-6">
        {/* Título */}
        <h1 className="text-2xl font-bold">Mis Farmacias</h1>

        {/* Contenedor de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pharmacies.map((pharmacy) => (
            <Card key={pharmacy.drugStoreID}>
              {/* Imagen en la parte superior */}
              <div className="h-32 bg-gray-100">
                <img
                  src={pharmacy.image || "https://placehold.co/600x400/png"}
                  alt={`Imagen de ${pharmacy.nameDS}`}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>

              {/* Contenido de la tarjeta */}
              <CardHeader>
                <h2 className="text-lg font-bold">{pharmacy.nameDS}</h2>
              </CardHeader>
              <CardBody>
                <p>
                  <strong>Ubicación:</strong> {pharmacy.address}
                </p>
                <p>
                  <strong>Teléfono:</strong> {pharmacy.phoneDS}
                </p>
                <p>
                  <strong>Tipo:</strong> {pharmacy.type}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <span
                    className={`${
                      pharmacy.status === "Aprobada"
                        ? "text-green-600"
                        : pharmacy.status === "Pendiente"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {pharmacy.status}
                  </span>
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </PropietarioLayout>
  );
}

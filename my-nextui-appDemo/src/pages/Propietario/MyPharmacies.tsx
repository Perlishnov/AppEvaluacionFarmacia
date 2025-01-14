import PropietarioLayout from "../../layouts/PropietarioLayout";
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";

// Datos simulados de farmacias (deben provenir del backend)
const farmacias = [
  {
    drugStoreID: 1,
    documentDS: "12345678901",
    nameDS: "Farmacia Central",
    phoneDS: "809-123-4567",
    address: "Av. Principal 123, Santo Domingo",
    shortName: "FARMCTR",
    altitude: 18.5,
    longitude: -69.9,
    registrationDate: "2023-01-15",
    type: "Retail",
    status: "Aprobada",
    image: "https://placehold.co/600x400/png", // Imagen representativa
  },
  {
    drugStoreID: 2,
    documentDS: "10987654321",
    nameDS: "Farmacia Norte",
    phoneDS: "809-987-6543",
    address: "Calle Secundaria 456, Santiago",
    shortName: "FARMNRT",
    altitude: 19.4,
    longitude: -70.7,
    registrationDate: "2023-02-20",
    type: "Hospitalario",
    status: "Pendiente",
    image: "https://placehold.co/600x400/png", // Imagen representativa
  },
  {
    drugStoreID: 3,
    documentDS: "12345098765",
    nameDS: "Farmacia Este",
    phoneDS: "809-456-7890",
    address: "Calle Tercera 789, La Vega",
    shortName: "FARMEST",
    altitude: 19.2,
    longitude: -70.5,
    registrationDate: "2023-03-10",
    type: "Retail",
    status: "Rechazada",
    image: "https://placehold.co/600x400/png", // Imagen representativa
  },
];

export default function MisFarmacias() {
  return (
    <PropietarioLayout>
      <div className="p-6 space-y-6">
        {/* Título */}
        <h1 className="text-2xl font-bold">Mis Farmacias</h1>

        {/* Contenedor de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmacias.map((farmacia) => (
            <Card key={farmacia.drugStoreID}>
              {/* Imagen en la parte superior */}
              <div className="h-32 bg-gray-100">
                <img
                  src={farmacia.image}
                  alt={`Imagen de ${farmacia.nameDS}`}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>

              {/* Contenido de la tarjeta */}
              <CardHeader>
                <h2 className="text-lg font-bold">{farmacia.nameDS}</h2>
              </CardHeader>
              <CardBody>
                <p>
                  <strong>Ubicación:</strong> {farmacia.address}
                </p>
                <p>
                  <strong>Teléfono:</strong> {farmacia.phoneDS}
                </p>
                <p>
                  <strong>Tipo:</strong> {farmacia.type}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <span
                    className={`${
                      farmacia.status === "Aprobada"
                        ? "text-green-600"
                        : farmacia.status === "Pendiente"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {farmacia.status}
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

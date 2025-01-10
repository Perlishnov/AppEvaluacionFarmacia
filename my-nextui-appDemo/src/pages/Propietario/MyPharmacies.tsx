import PropietarioLayout from "../../layouts/PropietarioLayout";
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";

// Datos de ejemplo para las farmacias del usuario
const farmacias = [
  {
    id: 1,
    name: "Farmacia Central",
    location: "Av. Principal 123, Santo Domingo",
    type: "Retail",
    status: "Aprobada",
  },
  {
    id: 2,
    name: "Farmacia Norte",
    location: "Calle Secundaria 456, Santiago",
    type: "Hospitalario",
    status: "Pendiente",
  },
  {
    id: 3,
    name: "Farmacia Este",
    location: "Calle Tercera 789, La Vega",
    type: "Retail",
    status: "Rechazada",
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
            <Card key={farmacia.id}>
              <CardHeader>
                <h2 className="text-lg font-bold">{farmacia.name}</h2>
              </CardHeader>
              <CardBody>
                <p>
                  <strong>Ubicación:</strong> {farmacia.location}
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
              <CardFooter>
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => console.log(`Detalles de: ${farmacia.name}`)}
                >
                  Ver Detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PropietarioLayout>
  );
}

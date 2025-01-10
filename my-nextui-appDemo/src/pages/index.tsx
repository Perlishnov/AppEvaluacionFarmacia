import React from "react";
import {Form, Input, Button} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Link} from "react-router-dom";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {

  return (
    <DefaultLayout>
       <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Simplifica la gestión de tu farmacia
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Registra, gestiona y haz seguimiento de tus solicitudes y evaluaciones
            con facilidad.
          </p>
          <Button
            as={Link}
            href="/register"
            color="primary"
            radius="full"
            className="mt-6"
          >
            Crear una Cuenta
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            ¿Qué puedes hacer con nuestra plataforma?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "Registro de Farmacias",
                description: "Facilita el registro de farmacias y documentación.",
              },
              {
                title: "Seguimiento de Solicitudes",
                description: "Consulta el estado de tus solicitudes en tiempo real.",
              },
              {
                title: "Evaluaciones Rápidas",
                description: "Acceso eficiente a los resultados de evaluaciones.",
              },
              {
                title: "Gestión Centralizada",
                description: "Administra todo desde un panel fácil de usar.",
              },
              {
                title: "Notificaciones Inteligentes",
                description:
                  "Recibe alertas sobre cambios en tus solicitudes o evaluaciones.",
              },
            ].map((feature, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Opinions Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Lo que dicen nuestros usuarios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              {
                name: "Ana López",
                feedback:
                  "La plataforma simplificó enormemente la gestión de mi farmacia. ¡Altamente recomendada!",
              },
              {
                name: "Carlos Pérez",
                feedback:
                  "Ahora puedo seguir mis evaluaciones y solicitudes sin problemas desde un solo lugar.",
              },
              {
                name: "María Rodríguez",
                feedback:
                  "La interfaz es intuitiva y me ahorra mucho tiempo. Un excelente recurso para propietarios de farmacias.",
              },
            ].map((opinion, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <h3 className="text-lg font-bold">{opinion.name}</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600">"{opinion.feedback}"</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

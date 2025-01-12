import AdministradorLayout from "../../layouts/AdministradorLayout";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Users, Building2, ClipboardCheck, Award } from "@phosphor-icons/react";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="text-sm font-medium">Total Usuarios</div>
            <Users size={24} weight="bold" className="text-gray-500" />
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-bold">1,234</div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="text-sm font-medium">Total Farmacias</div>
            <Building2 size={24} weight="bold" className="text-gray-500" />
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-bold">567</div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="text-sm font-medium">Inspecciones Pendientes</div>
            <ClipboardCheck size={24} weight="bold" className="text-gray-500" />
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-bold">89</div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="text-sm font-medium">Certificados Emitidos</div>
            <Award size={24} weight="bold" className="text-gray-500" />
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-bold">456</div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

import { title } from "@/components/primitives";
import { Tab, Tabs } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";
import {Dropdown, DropdownMenu, DropdownTrigger, DropdownItem} from "@nextui-org/react";

import { useState } from "react";

export default function DocsPage() {
  const [formData, setFormData] = useState({
    documentUser: "",
    nameUser: "",
    lastNameUser: "",
    emailUser: "",
    passwordUser: "",
    documentTypeID: "",
    personTypeID: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    // Aquí se puede enviar la información al backend.
  };

  return (
    <DefaultLayout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Formulario de Usuario
        </h1>
      <Tabs aria-label="Formulario de usuario" className="w-full">
        {/* Pestaña 1: Información Personal */}
        <Tab key="personal" title="Información Personal">
          <div className="flex flex-col gap-4">
            <Input
              label="Nombre"
              placeholder="Ingresa tu nombre"
              name="nameUser"
              value={formData.nameUser}
              onChange={handleChange}
              required
            />
            <Input
              label="Apellido"
              placeholder="Ingresa tu apellido"
              name="lastNameUser"
              value={formData.lastNameUser}
              onChange={handleChange}
              required
            />
            <Input
              label="Correo Electrónico"
              placeholder="Ingresa tu correo"
              name="emailUser"
              value={formData.emailUser}
              onChange={handleChange}
              required
            />
            <Input
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              name="passwordUser"
              value={formData.passwordUser}
              onChange={handleChange}
              required
            />
          </div>
        </Tab>

        {/* Pestaña 2: Documento */}
        <Tab key="document" title="Documento">
          <div className="flex flex-col gap-4">
            <Input
              label="Número de Documento"
              placeholder="Ingresa tu documento"
              name="documentUser"
              value={formData.documentUser}
              onChange={handleChange}
              required
            />

            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">Selecciona el tipo de documento</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Tipo de Documento"
                selectionMode="single"
                selectedKeys={new Set([formData.documentTypeID])}
                onSelectionChange={(keys) => handleDropdownChange(Array.from(keys)[0] as string)}
              >
                <DropdownItem key="1">Cédula</DropdownItem>
                <DropdownItem key="2">Pasaporte</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Tab>

        {/* Pestaña 3: Tipo de Persona */}
        <Tab key="personType" title="Tipo de Persona">
          <div className="flex flex-col gap-4">
            <Input
              label="Tipo de Persona (ID)"
              placeholder="Ingresa el tipo de persona (ej. 1, 2, 3...)"
              name="personTypeID"
              value={formData.personTypeID}
              onChange={handleChange}
              required
            />
          </div>
        </Tab>
      </Tabs>

      {/* Botón de Submit */}
      <div className="mt-6 flex justify-end">
        <Button onPress={handleSubmit} color="primary">
          Enviar
        </Button>
      </div>
    </div>
    </DefaultLayout>
  );
}

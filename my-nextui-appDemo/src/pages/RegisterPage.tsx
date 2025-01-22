import { Input, Button } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
import { useState } from "react";
import { UserCircle2 } from "lucide-react";

export default function DocsPage() {
  const [formData, setFormData] = useState({
    documentUser: "",
    nameUser: "",
    lastNameUser: "",
    emailUser: "",
    passwordUser: "",
    documentTypeID: "",
    personTypeID: 3,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (key: string) => {
    setFormData((prev) => ({ ...prev, documentTypeID: key }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:5041/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          documentTypeID: parseInt(formData.documentTypeID),
        }),
      });
      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }
      const data = await response.json();
      setSuccessMessage("Usuario registrado correctamente.");
      console.log("API Response:", data);
    } catch (error: any) {
      console.error("Error:", error);
      setErrorMessage(
        error.message || "Ocurrió un error al registrar el usuario."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-3xl mx-auto p-6">
        <UserCircle2 size={48} className="mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4 text-center">Formulario de Usuario</h1>
        <form onSubmit={handleSubmit}>
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
                <Button variant="bordered">
                  {formData.documentTypeID
                    ? `Seleccionado: ${
                        formData.documentTypeID === "1" ? "Cédula" : "Pasaporte"
                      }`
                    : "Selecciona el tipo de documento"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Tipo de Documento"
                selectionMode="single"
                selectedKeys={new Set([formData.documentTypeID])}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0] as string;
                  if (key) handleDropdownChange(key);
                }}
              >
                <DropdownItem key="1">Cédula</DropdownItem>
                <DropdownItem key="2">Pasaporte</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
              type="email"
              value={formData.emailUser}
              onChange={handleChange}
              required
            />
            <Input
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              name="passwordUser"
              type="password"
              value={formData.passwordUser}
              onChange={handleChange}
              required
            />
          </div>
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          <div className="mt-6 flex justify-end">
            <Button className="bg-[#4E5BA6] hover:bg-[#293056] text-white" type="submit" color="primary" isLoading={loading}>
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}
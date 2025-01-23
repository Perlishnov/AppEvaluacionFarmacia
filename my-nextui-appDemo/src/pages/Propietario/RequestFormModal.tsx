import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Tabs, Tab, DropdownItem, DropdownTrigger, DropdownMenu, Select, SelectItem, Avatar } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/modal";
import {municipios} from "./municipios";

interface RequestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPharmacies: { id: string; name: string }[];
}

const initialFormData = {
  ownerName: "",
  ownerDocument: "",
  ownerAddress: "",
  ownerPhone: "",
  ownerEmail: "",
  ownerMobile: "",
  directorName: "",
  directorLastName: "",
  directorDocument: "",
  directorAddress: "",
  directorPhone: "",
  directorEmail: "",
  directorProfession: "",
  directorExequatur: "",
  issueDate: "",
  pharmacyType: "",
  activityType: "",
  pharmacyName: "",
  newPharmacyName: "",
  pharmacyAddress: "",
  pharmacyStreet: "",
  pharmacySector: "",
  pharmacyCity: "",
  pharmacyMunicipality: "",
  pharmacyProvince: "",
  selectedPharmacy: "",
};

const operationsList = [
  "Apertura",
  "Renovación de Registro",
  "Cambio de Director Técnico",
  "Cambio de Nombre",
  "Cambio de Propietario",
  "Cambio de Dirección",
];

export default function RequestFormModal({
  isOpen,
  onClose,
  userPharmacies,
}: RequestFormModalProps) {
  const [provincesList, setProvincesList] = useState<{ provinciaId: number, nameProv: string }[]>([]);
  const [municipalitiesList, setMunicipalitiesList] = useState<{ municipioId: number, nameMun: string }[]>([]);
  const [operation, setOperation] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
  // Fetch provinces on component mount
    const fetchProvinces = async () => {
      try {
        const response = await fetch("http://localhost:5041/api/Filter/provincias");
        if (!response.ok) throw new Error("Error fetching provinces");
        const data = await response.json();
        setProvincesList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProvinces();
  }, []); // Empty dependency array means this runs once when the component mounts


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
      const handleSubmit = async () => {
      if (operation !== "Cambio de Director Técnico") return;
      if (!validateForm()) return;

      const requestBody = {
        drugStoreID: parseInt(formData.selectedPharmacy), // Asegúrate de que el ID de la farmacia sea numérico
        newDirectorName: formData.directorName,
        newDirectorLastName: formData.directorLastName,
        newDirectorDocument: formData.directorDocument,
        newDirectorEmail: formData.directorEmail,
        newDirectorPhone: formData.directorPhone,
        newDirectorProfession: formData.directorProfession,
        newDirectorExequatur: formData.directorExequatur,
        issueDate: formData.issueDate,
      };

      try {
        const response = await fetch("/api/Request/technical-director-change", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("Cambio de director técnico exitoso:", responseData);
        alert("Solicitud realizada con éxito");
        onClose(); // Cierra el modal al finalizar
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        alert("Ocurrió un error. Por favor, intenta de nuevo.");
      }
    };
    const validateForm = () => {
      const requiredFields = [
        "directorName",
        "directorLastName",
        "directorDocument",
        "directorEmail",
        "directorPhone",
        "directorProfession",
        "directorExequatur",
        "issueDate",
        "selectedPharmacy",
      ];

      for (const field of requiredFields) {
        if (!formData[field]) {
          alert(`Por favor completa el campo: ${field}`);
          return false;
        }
      }

      return true;
    };


  const renderOwnerSection = () => (
    <Tab title="Datos del Propietario">
      <Input
        label="Nombre o Razón Social"
        name="ownerName"
        value={formData.ownerName}
        onChange={handleInputChange}
        required
      />
      <Input
        label="No. de RNC/Cédula"
        name="ownerDocument"
        value={formData.ownerDocument}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Dirección"
        name="ownerAddress"
        value={formData.ownerAddress}
        onChange={handleInputChange}
      />
      <Input
        label="No. de Teléfono"
        name="ownerPhone"
        value={formData.ownerPhone}
        onChange={handleInputChange}
      />
      <Input
        label="Correo Electrónico"
        name="ownerEmail"
        value={formData.ownerEmail}
        onChange={handleInputChange}
      />
      <Input
        label="No. de Tel. Móvil"
        name="ownerMobile"
        value={formData.ownerMobile}
        onChange={handleInputChange}
      />
    </Tab>
  );

  const renderDirectorSection = () => (
    <Tab title="Datos del Director Técnico">
      <Input
        label="Nombre del Director Técnico"
        name="directorName"
        value={formData.directorName}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Apellidos"
        name="directorLastName"
        value={formData.directorLastName}
        onChange={handleInputChange}
        required
      />
      <Input
        label="No. Cédula"
        name="directorDocument"
        value={formData.directorDocument}
        onChange={handleInputChange}
      />
      <Input
        label="Email"
        name="directorEmail" // Nombre correcto
        value={formData.directorEmail}
        onChange={handleInputChange}
      />
      <Input
        label="Phone"
        name="directorPhone" // Nombre correcto
        value={formData.directorPhone}
        onChange={handleInputChange}
      />
      <Input
        label="Profesión"
        name="directorProfession"
        value={formData.directorProfession}
        onChange={handleInputChange}
      />
      <Input
        label="No. de Exequatur"
        name="directorExequatur"
        value={formData.directorExequatur}
        onChange={handleInputChange}
      />
      <Input
        label="Fecha de Emisión"
        name="issueDate"
        type="date"
        value={formData.issueDate}
        onChange={handleInputChange}
      />
    </Tab>
  );

  const renderEstablishmentSection = () => (
    <Tab title="Datos del Establecimiento">
      <Input
        label="Tipo de Establecimiento"
        name="pharmacyType"
        value={formData.pharmacyType}
        onChange={handleInputChange}
      />
      <Input
        label="Tipo de Actividad"
        name="activityType"
        value={formData.activityType}
        onChange={handleInputChange}
      />
      <Select
      label="Provincia"
      value={formData.pharmacyProvince}
      onValueChange={ (value) =>{
        setFormData((prev) => ({ ...prev, pharmacyProvince: value })) // Update the province
      }}
      required
    >
      {provincesList.length === 0 ? (
        <SelectItem value="" disabled>
          No hay provincias disponibles
        </SelectItem>
      ) : (
        provincesList.map((province) => (
          <SelectItem key={province.provinciaId} value={province.provinciaId.toString()}>
            {province.nameProv}
          </SelectItem>
        ))
      )}
    </Select>

   <Select
  label="Municipio"
  value={formData.pharmacyMunicipality}
  onValueChange={(value) =>
    setFormData((prev) => ({ ...prev, pharmacyMunicipality: value }))
  }
  required
    >
      {municipios.map((municipio) => (
        <SelectItem key={municipio.municipioId} value={municipio.municipioId.toString()}>
          {municipio.name}
        </SelectItem>
      ))}
    </Select>

    </Tab>
  );

  const renderPharmacySelection = () => (
    <Tab title="Seleccionar Farmacia">
      <Select
        label="Farmacia"
        value={formData.selectedPharmacy.toString()} // Asegúrate de que sea una cadena
        onValueChange={(value) => {
          console.log("Nuevo valor seleccionado:", value);
          setFormData((prev) => ({ ...prev, selectedPharmacy: parseInt(value, 10) }));
        }}
        required
      >
        {userPharmacies.map((pharmacy) => (
          <SelectItem key={pharmacy.id} value={pharmacy.id.toString()}>
            {pharmacy.name}
          </SelectItem>
        ))}
      </Select>
    </Tab>
  );

  const renderTabsContent = () => {
    switch (operation) {
      case "Apertura":
        return (
          <>
            {renderOwnerSection()}
            {renderDirectorSection()}
            {renderEstablishmentSection()}
          </>
        );
      case "Renovación de Registro":
        return (
          <>
            {renderPharmacySelection()}
            {renderEstablishmentSection()}
          </>
        );
      case "Cambio de Director Técnico":
        return (
          <>
            {renderPharmacySelection()}
            {renderDirectorSection()}
          </>
        );
      case "Cambio de Nombre":
        return (
          <>
            {renderPharmacySelection()}
            <Tab title="Nuevo Nombre">
              <Input
                label="Nuevo Nombre"
                name="newPharmacyName"
                value={formData.newPharmacyName}
                onChange={handleInputChange}
                required
              />
            </Tab>
          </>
        );
      case "Cambio de Propietario":
        return (
          <>
            {renderPharmacySelection()}
            {renderOwnerSection()}
          </>
        );
      case "Cambio de Dirección":
        return (
          <>
            {renderPharmacySelection()}
            <Tab title="Nueva Dirección">
              <Input
                label="Nueva Dirección"
                name="pharmacyAddress"
                value={formData.pharmacyAddress}
                onChange={handleInputChange}
                required
              />
            </Tab>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>
          <h2>Solicitud de Registro</h2>
        </ModalHeader>
        <ModalBody>
          <Tabs className="mt-4">
            <Tab title="Seleccionar Operación">
              <Dropdown>
                <DropdownTrigger>
                  <Button className="border-[#4E5BA6]" variant="bordered">
                    {operation || "Selecciona la operación"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu onAction={(value) => setOperation(value.toString())}>
                  {operationsList.map((option) => (
                    <DropdownItem key={option}>{option}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Tab>
            {operation && renderTabsContent()}
          </Tabs>
          <Button
            type="submit"
            className="mt-4 bg-[#4E5BA6] text-white"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
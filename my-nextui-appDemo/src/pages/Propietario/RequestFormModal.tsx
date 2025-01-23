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

    // Fetch municipalities whenever the selected province changes
    const fetchMunicipalities = async () => {
      if (!formData.pharmacyProvince) return; // No province selected, skip fetch

      try {
        const response = await fetch(`http://localhost:5041/api/Filter/municipios/${parseInt(formData.pharmacyProvince)}`);
        if (!response.ok) throw new Error("Error fetching municipalities");
        const data = await response.json();
        setMunicipalitiesList(data);
        console.log("Municipalities fetched:", data);
      } catch (error) {
        console.error("Error fetching municipalities:", error);
        setMunicipalitiesList([]); // Clear municipalities if there's an error
      }
    };


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        value={formData.selectedPharmacy}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, selectedPharmacy: value }))
        }
        required
      >
        {userPharmacies.map((pharmacy) => (
          <SelectItem key={pharmacy.id} value={pharmacy.name}>
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
            onClick={() => console.log("Submitted form:", formData)}
          >
            Enviar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
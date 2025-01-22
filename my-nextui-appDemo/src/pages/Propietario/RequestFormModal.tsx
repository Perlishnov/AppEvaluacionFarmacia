import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Tabs, Tab, DropdownItem, DropdownTrigger, DropdownMenu, Select, SelectItem, Avatar } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/modal";

export default function RequestFormModal({
  isOpen,
  onClose,
  userPharmacies,
}: {
  isOpen: boolean;
  onClose: () => void;
  userPharmacies: string[];
}) {
  const [provincesList, setProvincesList] = useState<string[]>([]);
const [municipalitiesList, setMunicipalitiesList] = useState<string[]>([]);

useEffect(() => {
  const fetchProvinces = async () => {
    try {
      const res = await fetch("/api/Filter/provincias");
      if (!res.ok) throw new Error("Failed to fetch provinces");
      const data = await res.json();
      setProvincesList(data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchProvinces();
}, []);

  const [operation, setOperation] = useState<string | null>(null);
  const [formData, setFormData] = useState({
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
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleMunicipalitiesFetch = async (provinceId: string) => {
  try {
    const res = await fetch(`/api/Filter/municipios/${provinceId}`);
    if (!res.ok) throw new Error("Failed to fetch municipalities");
    const data = await res.json();
    setMunicipalitiesList(data);
  } catch (err) {
    console.error(err);
  }
};

  const renderOwnerSection = () => (
    <Tab title="Datos del Propietario" className="flex-col">
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
      <Input
        label="Nombre Actual"
        name="pharmacyName"
        value={formData.pharmacyName}
        onChange={handleInputChange}
      />
      <Input
        label="Dirección completa"
        name="pharmacyAddress"
        value={formData.pharmacyAddress}
        onChange={handleInputChange}
      />
      <Select
        label="Provincia"
        value={formData.pharmacyProvince}
        onValueChange={(value) => {
          setFormData((prev) => ({ ...prev, pharmacyProvince: value }));
          handleMunicipalitiesFetch(value);
        }}
        required
      >
        {provincesList.map((province) => (
          <SelectItem key={province} value={province}>
            {province}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Municipio"
        value={formData.pharmacyMunicipality}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, pharmacyMunicipality: value }))
        }
        required
      >
        {municipalitiesList.map((municipality) => (
          <SelectItem key={municipality} value={municipality}>
            {municipality}
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
          <SelectItem key={pharmacy} value={pharmacy}>
            {pharmacy}
          </SelectItem>
        ))}
      </Select>
    </Tab>
  );

  const renderTabsContent = () => {
    const pharmacySelection =
      operation && operation !== "Apertura" ? renderPharmacySelection() : null;

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
            {pharmacySelection}
            {renderEstablishmentSection()}
          </>
        );
      case "Cambio de Director Técnico":
        return (
          <>
            {pharmacySelection}
            {renderDirectorSection()}
          </>
        );
      case "Cambio de Nombre":
        return (
          <>
            {pharmacySelection}
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
            {pharmacySelection}
            {renderOwnerSection()}
          </>
        );
      case "Cambio de Dirección":
        return (
          <>
            {pharmacySelection}
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
      case "Cambio de Razón Social":
        return (
          <>
            {pharmacySelection}
            <Tab title="Tipo de Actividad">
              <Input
                label="Tipo de Actividad"
                name="activityType"
                value={formData.activityType}
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
    <Modal isOpen={isOpen} onClose={onClose}>
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
                  {[
                    "Apertura",
                    "Renovación de Registro",
                    "Cambio de Director Técnico",
                    "Cambio de Nombre",
                    "Cambio de Propietario",
                    "Cambio de Dirección",
                    "Cambio de Razón Social",
                  ].map((option) => (
                    <DropdownItem key={option}>{option}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Tab>
            {operation && renderTabsContent()}
          </Tabs>
          <Button type="submit" className="mt-4 bg-[#4E5BA6] text-white" color="primary">
            Enviar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
import React, { useEffect, useState } from "react";
import AdministradorLayout from "../../layouts/AdministradorLayout";

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@nextui-org/react";
import { Eye, Pencil, Trash } from "lucide-react";

/** Interfaz local para una Farmacia (mapeada del backend) */
interface Farmacia {
    drugStoreId: number;           // id
    documentDS?: string;
    nameDS: string;
    phoneDS?: string;
    address: string;
    shortName?: string;
    altitude?: number;
    longitude?: number;
    registrationDate?: string;
    drugStoreTypeName?: string;
    documentTypeName?: string;
    municipioName?: string;
    licenseName?: string;
    directorName?: string;
    ownerName?: string;
}

/**
 * Componente principal de Gestión de Farmacias,
 * sin la parte de "Agregar Farmacia".
 */
const PharmaciesManagementPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    // Listado de farmacias devueltas por GET /api/DrugStores
    const [farmacias, setFarmacias] = useState<Farmacia[]>([]);

    // Para abrir/cerrar modales
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Farmacia seleccionada (detalle o editar)
    const [selectedPharmacy, setSelectedPharmacy] = useState<Farmacia | null>(null);
    const [editData, setEditData] = useState<Farmacia | null>(null);

    // Efecto para cargar farmacias
    useEffect(() => {
        const fetchFarmacias = async () => {
            try {
                const token = localStorage.getItem("token");
                const resp = await fetch("http://localhost:5041/api/DrugStores", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                if (!resp.ok) {
                    throw new Error("Error al obtener farmacias");
                }
                const data = await resp.json();
                // data: Array de { drugStoreID, documentDS, nameDS, address, etc. }
                const mapped: Farmacia[] = data.map((item: any) => ({
                    drugStoreId: item.drugStoreID,
                    documentDS: item.documentDS,
                    nameDS: item.nameDS,
                    phoneDS: item.phoneDS,
                    address: item.address,
                    shortName: item.shortName,
                    altitude: item.altitude,
                    longitude: item.longitude,
                    registrationDate: item.registrationDate,
                    drugStoreTypeName: item.drugStoreTypeName,
                    documentTypeName: item.documentTypeName,
                    municipioName: item.municipioName,
                    licenseName: item.licenseName,
                    directorName: item.directorName,
                    ownerName: item.ownerName,
                }));
                setFarmacias(mapped);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFarmacias();
    }, []);

    // Filtrado simple en el front (por nameDS o drugStoreId)
    const filteredPharmacies = farmacias.filter((farm) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
            farm.nameDS.toLowerCase().includes(lowerSearch) ||
            String(farm.drugStoreId).toLowerCase().includes(lowerSearch)
        );
    });

    // Columnas de la tabla
    const columns = [
        { key: "drugStoreId", label: "ID" },
        { key: "nameDS", label: "Nombre" },
        { key: "address", label: "Dirección" },
        { key: "ownerName", label: "Propietario" },
        { key: "licenseName", label: "Licencia" },
        { key: "directorName", label: "Director Téc." },
        { key: "actions", label: "Acciones" },
    ];

    /** Ver detalle (Eye) */
    const handleOpenDetail = (farm: Farmacia) => {
        setSelectedPharmacy(farm);
        setIsDetailModalOpen(true);
    };

    /** Editar (Pencil) */
    const handleOpenEdit = (farm: Farmacia) => {
        setSelectedPharmacy(farm);
        setEditData({ ...farm });
        setIsEditModalOpen(true);
    };

    /** Eliminar (Trash) -> DELETE /api/DrugStores/{id} */
    const handleDeletePharmacy = async (farm: Farmacia) => {
        try {
            const token = localStorage.getItem("token");
            const resp = await fetch(`http://localhost:5041/api/DrugStores/${farm.drugStoreId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!resp.ok) {
                throw new Error(`Error al eliminar farmacia. Status: ${resp.status}`);
            }

            // Eliminamos del estado
            setFarmacias((prev) => prev.filter((f) => f.drugStoreId !== farm.drugStoreId));
            alert(`Farmacia "${farm.nameDS}" eliminada.`);
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al eliminar la farmacia.");
        }
    };

    /** Guardar cambios (PUT /api/DrugStores/{id}) */
    const handleSaveEdit = async () => {
        if (!editData) return;

        try {
            const token = localStorage.getItem("token");
            // Creas el payload que tu backend espera:
            // (Document, NameDs, Address, etc.)
            // Ojo: tu swagger indica que PUT /api/DrugStores/{id} espera un body 
            // "drugStoreId, documentDs, nameDs, phoneDs, address, shortName, etc."
            const payload = {
                drugStoreId: editData.drugStoreId,
                documentDs: editData.documentDS,
                nameDs: editData.nameDS,
                phoneDs: editData.phoneDS,
                address: editData.address,
                shortName: editData.shortName,
                altitude: editData.altitude || 0,
                longitude: editData.longitude || 0,
                registrationDate: editData.registrationDate || new Date().toISOString().split("T")[0],
                // Falta: drugStoreTypeId, documentTypeId, municipioId, licenseId, directorId, ownerId
                // Según tu backend. Si tu UI no maneja IDs, podrías dejarlos en 0 o como corresponda.
            };

            const resp = await fetch(`http://localhost:5041/api/DrugStores/${editData.drugStoreId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!resp.ok) {
                throw new Error(`Error al actualizar farmacia. Status: ${resp.status}`);
            }

            // Actualizamos estado
            setFarmacias((prev) =>
                prev.map((f) => (f.drugStoreId === editData.drugStoreId ? { ...editData } : f))
            );

            setIsEditModalOpen(false);
            alert(`Cambios guardados en la Farmacia "${editData.nameDS}".`);
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al actualizar la farmacia.");
        }
    };

    /** Renderizado de celdas */
    const renderCell = (farmacia: Farmacia, columnKey: string) => {
        switch (columnKey) {
            case "actions":
                return (
                    <div className="flex gap-2">
                        <Button
                            isIconOnly
                            variant="light"
                            aria-label="Ver detalles"
                            onPress={() => handleOpenDetail(farmacia)}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            isIconOnly
                            variant="light"
                            aria-label="Editar farmacia"
                            onPress={() => handleOpenEdit(farmacia)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            isIconOnly
                            variant="light"
                            color="danger"
                            aria-label="Eliminar farmacia"
                            onPress={() => handleDeletePharmacy(farmacia)}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                );
            default:
                // Si la propiedad no existe, retorna "—"
                const val = (farmacia as any)[columnKey];
                return val || "—";
        }
    };

    return (
        <AdministradorLayout>
            <div>
                <h1 className="text-3xl font-semibold mb-6">Gestión de Farmacias</h1>

                {/* Buscador */}
                <div className="flex justify-between items-center mb-4">
                    <Input
                        placeholder="Buscar farmacias..."
                        className="w-1/3"
                        value={searchTerm}
                        onValueChange={(val) => setSearchTerm(val)}
                    />
                    {/* Botón de Agregar eliminado */}
                </div>

                {/* Tabla */}
                <Table aria-label="Tabla de farmacias" css={{ height: "auto", minWidth: "100%" }}>
                    <TableHeader>
                        {columns.map((col) => (
                            <TableColumn key={col.key}>{col.label}</TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {filteredPharmacies.map((farmacia) => (
                            <TableRow key={farmacia.drugStoreId}>
                                {columns.map((col) => (
                                    <TableCell key={`${farmacia.drugStoreId}-${col.key}`}>
                                        {renderCell(farmacia, col.key)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* MODAL DETALLE */}
            <Modal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
            >
                <ModalContent>
                    <ModalHeader>
                        <h2>Detalles de la Farmacia</h2>
                    </ModalHeader>
                    <ModalBody>
                        {selectedPharmacy && (
                            <div className="space-y-2">
                                <p>
                                    <strong>ID:</strong> {selectedPharmacy.drugStoreId}
                                </p>
                                <p>
                                    <strong>Nombre:</strong> {selectedPharmacy.nameDS}
                                </p>
                                <p>
                                    <strong>Dirección:</strong> {selectedPharmacy.address}
                                </p>
                                <p>
                                    <strong>Propietario:</strong> {selectedPharmacy.ownerName || "—"}
                                </p>
                                <p>
                                    <strong>Licencia:</strong> {selectedPharmacy.licenseName || "—"}
                                </p>
                                <p>
                                    <strong>Director Técnico:</strong> {selectedPharmacy.directorName || "—"}
                                </p>
                                {/* etc... */}
                            </div>
                        )}
                        <div className="mt-4 flex justify-end">
                            <Button variant="bordered" onPress={() => setIsDetailModalOpen(false)}>
                                Cerrar
                            </Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* MODAL EDICIÓN */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            >
                <ModalContent>
                    <ModalHeader>
                        <h2>Editar Farmacia</h2>
                    </ModalHeader>
                    <ModalBody>
                        {editData && (
                            <div className="space-y-4">
                                <Input
                                    label="ID"
                                    value={String(editData.drugStoreId)}
                                    isReadOnly
                                />
                                <Input
                                    label="Nombre"
                                    value={editData.nameDS}
                                    onValueChange={(val) =>
                                        setEditData((prev) => prev && { ...prev, nameDS: val })
                                    }
                                />
                                <Input
                                    label="Dirección"
                                    value={editData.address}
                                    onValueChange={(val) =>
                                        setEditData((prev) => prev && { ...prev, address: val })
                                    }
                                />
                                <Input
                                    label="Propietario (solo display en /api/DrugStores)"
                                    value={editData.ownerName || ""}
                                    onValueChange={(val) =>
                                        setEditData((prev) => prev && { ...prev, ownerName: val })
                                    }
                                />
                                {/* Si quisieras actualizar phoneDS, shortName, etc. */}
                            </div>
                        )}
                        <div className="mt-4 flex justify-end gap-2">
                            <Button
                                className="bg-[#EF4444] text-white"
                                onPress={() => setIsEditModalOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className="bg-[#4E5BA6] text-white"
                                onPress={handleSaveEdit}
                            >
                                Guardar
                            </Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </AdministradorLayout>
    );
};

export default PharmaciesManagementPage;




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
import { Eye } from "lucide-react";

interface InspectionItem {
    inspectionId: number;
    pharmacyName: string;   // from drugStore.nameDs
    location: string;       // from drugStore.address
    ownerName: string;      // from drugStore.ownerName
    status: string;         // from item.statusInsp?.statusInsp
    submissionDate: string; // from item.modifiedDate
    inspectionDate: string; // from item.scheduledDate
    inspectorNames: string[]; // from userInspections => user => nameUser + lastNameUser
}

export default function InspectionHistoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [inspections, setInspections] = useState<InspectionItem[]>([]);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedInspection, setSelectedInspection] = useState<InspectionItem | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchAllInspections = async () => {
            try {
                // 1) Traer la lista básica
                const resp = await fetch("http://localhost:5041/api/Inspection", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                if (!resp.ok) {
                    throw new Error("Error al obtener la lista de inspecciones.");
                }
                const data = await resp.json();
                // data: [ { inspectionId, drugStoreId, statusInspId, ... } ]

                const finalList: InspectionItem[] = [];

                // 2) Por cada inspección, hacemos 2 fetch extra: 
                //    a) GET /api/Inspection/{id} => userInspections => inspector info
                //    b) GET /api/DrugStores/{drugStoreId} => nameDs, address, ownerName

                for (const insp of data) {
                    const inspectionId: number = insp.inspectionId;
                    const drugStoreId: number = insp.drugStoreId;
                    const statusText = insp.statusInsp?.statusInsp || "Pendiente";
                    const submissionDate = insp.modifiedDate?.split("T")[0] || "";
                    const inspectionDate = insp.scheduledDate?.split("T")[0] || "";

                    let pharmacyName = "(Desconocida)";
                    let location = "(Desconocido)";
                    let ownerName = "(Desconocido)";
                    let inspectorNames: string[] = [];

                    // a) fetch /api/Inspection/{id} para ver userInspections
                    //    (si tu Swagger indica que en la respuesta vendrá userInspections => [ { user { nameUser, lastNameUser } } ... ])
                    try {
                        const detailResp = await fetch(`http://localhost:5041/api/Inspection/${inspectionId}`, {
                            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
                        });
                        if (detailResp.ok) {
                            const detailData = await detailResp.json();
                            // detailData.userInspections => array de { user => { nameUser, lastNameUser } }
                            if (detailData.userInspections) {
                                inspectorNames = detailData.userInspections.map((ui: any) => {
                                    const u = ui.user;
                                    const fullName = (u.nameUser || "") + " " + (u.lastNameUser || "");
                                    return fullName.trim() || "(Desconocido)";
                                });
                            }
                        }
                    } catch (err) {
                        console.error("Error al obtener detail Inspection/", inspectionId, err);
                    }

                    // b) fetch /api/DrugStores/{drugStoreId}
                    if (drugStoreId) {
                        try {
                            const dsResp = await fetch(`http://localhost:5041/api/DrugStores/${drugStoreId}`, {
                                headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
                            });
                            if (dsResp.ok) {
                                const dsData = await dsResp.json();
                                // dsData => { nameDs, address, ownerName, ...}
                                pharmacyName = dsData.nameDs || "(Desconocida)";
                                location = dsData.address || "(Desconocido)";
                                // Si en tu backend devuelves dsData.ownerName, lo usas:
                                if (dsData.ownerName) {
                                    ownerName = dsData.ownerName;
                                }
                            }
                        } catch (err) {
                            console.error("Error fetch /api/DrugStores/", drugStoreId, err);
                        }
                    }

                    finalList.push({
                        inspectionId,
                        pharmacyName,
                        location,
                        ownerName,
                        status: statusText,
                        submissionDate,
                        inspectionDate,
                        inspectorNames,
                    });
                }

                setInspections(finalList);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAllInspections();
    }, []);

    // Filtro local
    const filteredInspections = inspections.filter((insp) => {
        const term = searchTerm.toLowerCase();
        return (
            insp.pharmacyName.toLowerCase().includes(term) ||
            String(insp.inspectionId).includes(term)
        );
    });

    // Columnas
    const columns = [
        { key: "pharmacyName", label: "Farmacia" },
        { key: "location", label: "Ubicación" },
        { key: "ownerName", label: "Propietario" },
        { key: "status", label: "Estado" },
        { key: "submissionDate", label: "F. Solicitud" },
        { key: "inspectionDate", label: "F. Inspección" },
        { key: "inspectorNames", label: "Inspectores" },
        { key: "actions", label: "Acciones" },
    ];

    /** Render celdas */
    const renderCell = (insp: InspectionItem, colKey: string) => {
        switch (colKey) {
            case "status":
                return (
                    <span
                        className={`capitalize text-xs font-semibold ${insp.status === "Aprobada"
                                ? "text-green-500"
                                : insp.status === "Pendiente"
                                    ? "text-yellow-500"
                                    : insp.status === "En Inspección"
                                        ? "text-blue-500"
                                        : "text-red-500"
                            }`}
                    >
                        {insp.status}
                    </span>
                );
            case "inspectorNames":
                return insp.inspectorNames.length
                    ? insp.inspectorNames.join(", ")
                    : "—";
            case "actions":
                return (
                    <Button
                        isIconOnly
                        variant="light"
                        onPress={() => {
                            setSelectedInspection(insp);
                            setIsDetailModalOpen(true);
                        }}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                );
            default:
                return (insp as any)[colKey] || "—";
        }
    };

    return (
        <AdministradorLayout>
            <div>
                <h1 className="text-3xl font-semibold mb-6">Historial de Inspecciones</h1>

                {/* Buscador */}
                <div className="flex justify-between items-center mb-4">
                    <Input
                        placeholder="Buscar inspecciones..."
                        className="w-1/3"
                        value={searchTerm}
                        onValueChange={(val) => setSearchTerm(val)}
                    />
                    {/* 
            Si quieres, aquí pondrías tu botón "Agendar Inspección"
            y todo el modal de crear/editar, etc. 
          */}
                </div>

                <Table aria-label="Inspections Table" css={{ height: "auto", minWidth: "100%" }}>
                    <TableHeader>
                        {columns.map((c) => (
                            <TableColumn key={c.key}>{c.label}</TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {filteredInspections.map((insp) => (
                            <TableRow key={insp.inspectionId}>
                                {columns.map((c) => (
                                    <TableCell key={`${insp.inspectionId}-${c.key}`}>
                                        {renderCell(insp, c.key)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Modal Detalle */}
            <Modal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
            >
                <ModalContent>
                    <ModalHeader>
                        <h2>Detalles de la Inspección</h2>
                    </ModalHeader>
                    <ModalBody>
                        {selectedInspection && (
                            <div className="space-y-2">
                                <p><strong>ID:</strong> {selectedInspection.inspectionId}</p>
                                <p><strong>Farmacia:</strong> {selectedInspection.pharmacyName}</p>
                                <p><strong>Ubicación:</strong> {selectedInspection.location}</p>
                                <p><strong>Propietario:</strong> {selectedInspection.ownerName}</p>
                                <p><strong>Estado:</strong> {selectedInspection.status}</p>
                                <p><strong>Fecha Solicitud:</strong> {selectedInspection.submissionDate}</p>
                                <p><strong>Fecha de Inspección:</strong> {selectedInspection.inspectionDate || "—"}</p>
                                <p>
                                    <strong>Inspectores:</strong>
                                    {selectedInspection.inspectorNames.join(", ") || "Ninguno"}
                                </p>
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
        </AdministradorLayout>
    );
}

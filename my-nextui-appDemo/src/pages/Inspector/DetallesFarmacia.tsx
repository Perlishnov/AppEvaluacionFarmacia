import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "@nextui-org/react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import  EvaluadorLayout  from "../../layouts/EvaluadorLayout";

interface Inspection {
  inspectionId: number;
  scheduledDate: string;
  drugStoreName: string;
  status: string;
  modifiedDate?: string;
  observations?: string;
}

const DetallesFarmacia = () => {
  const { farmaciaId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inspection, setInspection] = useState<Inspection | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [resultObservations, setResultObservations] = useState("");
  const [resultDescription, setResultDescription] = useState("");

  // Fetch inspection details
  useEffect(() => {
    const fetchInspectionDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5041/api/Inspection/${farmaciaId}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener los detalles de la inspección.");
        }

        const data: Inspection = await response.json();
        setInspection(data);
      } catch (err: any) {
        console.error(err);
        setError("No se pudieron cargar los detalles de la inspección.");
      } finally {
        setLoading(false);
      }
    };

    fetchInspectionDetails();
  }, [farmaciaId]);

  // Handle result submission
  const handleSubmitResults = async () => {
    try {
      const payload = {
        observations: resultObservations,
        description: resultDescription,
      };

      const response = await fetch(
        `http://localhost:5041/api/Inspection/Results/${inspection?.inspectionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar los resultados.");
      }

      alert("Resultados guardados correctamente.");
      setIsPopupOpen(false);
      setResultObservations("");
      setResultDescription("");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al guardar los resultados.");
    }
  };

  if (loading) {
    return <p>Cargando detalles...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!inspection) {
    return <p>No se encontraron detalles para esta inspección.</p>;
  }

  return (
    <EvaluadorLayout>
      <div className="p-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Detalles de la Inspección</h1>
          <div className="space-y-4">
            <p>
              <strong>Nombre de la Farmacia:</strong> {inspection.drugStoreName}
            </p>
            <p>
              <strong>Fecha Programada:</strong> {inspection.scheduledDate}
            </p>
            <p>
              <strong>Estado:</strong> {inspection.status}
            </p>
            {inspection.modifiedDate && (
              <p>
                <strong>Última Modificación:</strong> {inspection.modifiedDate}
              </p>
            )}
          </div>
        </Card>
        <div className="mt-4">
          <Button
            color="primary"
            onClick={() => setIsPopupOpen(true)}
            className="bg-[#4E5BA6] text-white"
          >
            Añadir Resultados
          </Button>
        </div>
        {/* Modal for Adding Results */}
        {isPopupOpen && (
          <Modal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
            <ModalHeader>
              <h2>Agregar Resultados</h2>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-2">
                    Descripción de Resultados
                  </label>
                  <textarea
                    className="w-full p-3 border rounded"
                    rows={4}
                    placeholder="Ingrese la descripción de los resultados..."
                    value={resultDescription}
                    onChange={(e) => setResultDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-2">
                    Observaciones
                  </label>
                  <textarea
                    className="w-full p-3 border rounded"
                    rows={4}
                    placeholder="Ingrese las observaciones..."
                    value={resultObservations}
                    onChange={(e) => setResultObservations(e.target.value)}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={() => setIsPopupOpen(false)}
                className="bg-red-500"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                onClick={handleSubmitResults}
                className="bg-[#4E5BA6]"
              >
                Guardar
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    </EvaluadorLayout>
  );
};

export default DetallesFarmacia;

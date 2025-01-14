import { Routes, Route } from "react-router-dom";

// Páginas principales
import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/NotFoundPage";
import DetallesFarmacia from "./pages/Inspector/DetallesFarmacia"; // Importar el componente
import InspectorCuenta from "./pages/Inspector/InspectorCuenta"; // Importar el componente

// Propietario
import PropietarioDashboard from "./pages/Propietario/dashboard";
import PropietarioMyPharmacies from "./pages/Propietario/MyPharmacies";

// Inspector
import DashboardInspector from "./pages/Inspector/dashboardIns";
import EvaluationsList from "./pages/Inspector/EvaluationsList";

function App() {
  return (
    <Routes>
      {/* Rutas principales */}
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />

      {/* Inspector */}
      <Route element={<DashboardInspector />} path="/inspector/dashboard" />
      <Route element={<EvaluationsList />} path="/inspector/evaluations" />
      <Route element={<DetallesFarmacia />} path="/inspector/farmacia/:farmaciaId" />
      <Route element={<InspectorCuenta />} path="/inspector/account" /> {/* Nueva ruta */}
      { /* Propietario */}
      <Route element={<PropietarioDashboard />} path="/propietario/dashboard" />
      <Route element={<PropietarioMyPharmacies />} path="/propietario/farmacias" />

      {/* Página 404 */}
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}

export default App;

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

// Admin
import AdminDashboardPage from "./pages/Admin/adminDashboard";
import InspectionHistoryPage from "./pages/Admin/inspectionHistory";
import PharmaciesManagementPage from "./pages/Admin/pharmaciesManagement";
import UserManagementPage from "./pages/Admin/userManagement";

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

      { /* Admin */}
      <Route element={<AdminDashboardPage />} path="/admin/dashboard" />
      <Route element={<InspectionHistoryPage />} path="/admin/" />
      <Route element={<PharmaciesManagementPage />} path="/propietario/farmacias" />
      <Route element={<PropietarioMyPharmacies />} path="/propietario/farmacias" />

      {/* Página 404 */}
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}

export default App;

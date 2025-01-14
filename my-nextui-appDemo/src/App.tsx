import { Routes, Route } from "react-router-dom";

// Páginas principales
import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/NotFoundPage";
import DetallesFarmacia from "./pages/Inspector/DetallesFarmacia"; // Importar el componente
import InspectorCuenta from "./pages/Inspector/InspectorCuenta"; // Importar el componente

// Inspector
import DashboardInspector from "./pages/Inspector/dashboardIns";
import EvaluationsList from "./pages/Inspector/EvaluationsList";

// Owner Pages
import PropietarioDashboard from "./pages/Propietario/dashboard";
import PropietarioMisFarmacias from "./pages/Propietario/MyPharmacies";

// Evaluator Pages
import EvaluatorDashboard from "./pages/evaluator/EvaluatorDashboard";
import EvaluationsList from "./pages/evaluator/EvaluationsList";
import EvaluationDetails from "./pages/evaluator/EvaluationDetails";
import AssignEvaluation from "./pages/evaluator/AssignEvaluation";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import UserDetails from "./pages/admin/UserDetails";
import ViewEvaluations from "./pages/admin/ViewEvaluations";

function App() {
  return (
    <Routes>
      {/* Rutas principales */}
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />

      <Route element={<RegisterPage />} path="/Register" />
      <Route element={<PropietarioDashboard />} path="/propietario/dashboard" />
      <Route element={<PropietarioMisFarmacias />} path="/propietario/farmacias" />


      {/* Inspector */}
      <Route element={<DashboardInspector />} path="/inspector/dashboard" />
      <Route element={<EvaluationsList />} path="/inspector/evaluations" />
      <Route element={<DetallesFarmacia />} path="/inspector/farmacia/:farmaciaId" />
      <Route element={<InspectorCuenta />} path="/inspector/account" /> {/* Nueva ruta */}

      {/* Página 404 */}
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}

export default App;

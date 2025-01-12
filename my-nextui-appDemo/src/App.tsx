import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

// Layouts
import PropietarioLayout from "./layouts/PropietarioLayout";
import EvaluadorLayout from "./layouts/EvaluadorLayout";
import AdministradorLayout from "./layouts/AdministradorLayout";

// Owner Pages
import PropietarioDashboard from "./pages/Propietario/dashboard";
import PropietarioMisFarmacias from "./pages/Propietario/MyPharmacies";
import MyRequests from "./pages/owner/MyRequests";
import RequestDetails from "./pages/owner/RequestDetails";

// Evaluator Pages
import EvaluatorDashboard from "./pages/evaluator/EvaluatorDashboard";
import EvaluationsList from "./pages/evaluator/EvaluationsList";
import EvaluationDetails from "./pages/evaluator/EvaluationDetails";
import AssignEvaluation from "./pages/evaluator/AssignEvaluation";

// Admin Pages
import AdminDashboard from "./pages/Administrador/adminDashboard";
import ManageUsers from "./pages/Administrador/userManagement";
import UserDetails from "./pages/admin/UserDetails";
import ViewEvaluations from "./pages/admin/ViewEvaluations";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal y login */}
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas del Propietario */}
        <Route element={<PropietarioLayout />}>
          <Route path="/propietario/dashboard" element={<PropietarioDashboard />} />
          <Route path="/propietario/farmacias" element={<PropietarioMisFarmacias />} />
        </Route>

        {/* Rutas del Evaluador */}
        <Route element={<EvaluadorLayout />}>
          <Route path="/evaluador/dashboard" element={<EvaluatorDashboard />} />
          <Route path="/evaluador/evaluaciones" element={<EvaluationsList />} />
          <Route path="/evaluador/evaluacion/:id" element={<EvaluationDetails />} />
        </Route>

        {/* Rutas del Administrador */}
        <Route element={<AdministradorLayout />}>
          <Route path="/administrador/adminDashboard" element={<AdminDashboard/>} />
          <Route path="/administrador/userManagement" element={<ManageUsers />} />
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
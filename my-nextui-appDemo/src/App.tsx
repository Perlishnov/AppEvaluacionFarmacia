import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";


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
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/Register" />
      <Route element={<PropietarioDashboard />} path="/propietario/dashboard" />
      <Route element={<PropietarioMisFarmacias />} path="/propietario/farmacias" />

    </Routes>
  );
}

export default App;

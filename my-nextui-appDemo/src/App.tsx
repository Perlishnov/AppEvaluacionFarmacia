import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

// Layouts
import OwnerLayout from "./layouts/OwnerLayout";
import EvaluatorLayout from "./layouts/EvaluatorLayout";
import AdminLayout from "./layouts/AdminLayout";

// Owner Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import RegisterFarmacia from "./pages/owner/RegisterFarmacia";
import MyRequests from "./pages/owner/MyRequests";
import RequestDetails from "./pages/owner/RequestDetails";

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

    </Routes>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

// Páginas principales
import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

// Propietario
import PropietarioDashboard from "./pages/Propietario/dashboard";
import PropietarioMyPharmacies from "./pages/Propietario/MyPharmacies";
import PropietarioMyAccount from "./pages/Propietario/MyAccount";

// Inspector
import DashboardInspector from "./pages/Inspector/dashboardIns";
import EvaluationsList from "./pages/Inspector/EvaluationsList";
import DetallesFarmacia from "./pages/Inspector/DetallesFarmacia";
import InspectorCuenta from "./pages/Inspector/InspectorCuenta";

// Admin
import AdminDashboardPage from "./pages/Admin/adminDashboard";
import InspectionHistoryPage from "./pages/Admin/inspectionHistory";
import PharmaciesManagementPage from "./pages/Admin/pharmaciesManagement";
import UserManagementPage from "./pages/Admin/userManagement";

/**
 * ProtectedRoute Component: Restricts access based on user role.
 * @param {ReactNode} children - The component to render if authorized.
 * @param {Array<string>} allowedRoles - The roles allowed to access this route.
 * @returns {ReactNode} - Renders the route or redirects to login.
 */
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // If there's no token, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  try {
    // Decode the JWT token to get the user's role
    const decodedToken: any = jwtDecode(token);

    // Check if the user's role matches the allowed roles
    if (!allowedRoles.includes(decodedToken.personType)) {
      // If unauthorized, redirect to a "Not Found" or "Unauthorized" page
      return <Navigate to="/login" replace />;
    }

    // Render the protected component if authorized
    return <>{children}</>;
  } catch (error) {
    console.error("Invalid token:", error);
    // Redirect to login if token is invalid
    return <Navigate to="/login" replace />;
  }
}

function App() {
  return (
    <Routes>
      {/* Rutas principales */}
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />

      {/* Inspector Routes */}
      <Route
        path="/inspector/dashboard"
        element={
          <ProtectedRoute allowedRoles={["2"]}>
            <DashboardInspector />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inspector/evaluations"
        element={
          <ProtectedRoute allowedRoles={["2"]}>
            <EvaluationsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inspector/farmacia/:farmaciaId"
        element={
          <ProtectedRoute allowedRoles={["2"]}>
            <DetallesFarmacia />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inspector/account"
        element={
          <ProtectedRoute allowedRoles={["2"]}>
            <InspectorCuenta />
          </ProtectedRoute>
        }
      />

      {/* Propietario Routes */}
      <Route
        path="/propietario/dashboard"
        element={
          <ProtectedRoute allowedRoles={["3"]}>
            <PropietarioDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/propietario/cuenta"
        element={
          <ProtectedRoute allowedRoles={["3"]}>
            <PropietarioMyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/propietario/farmacias"
        element={
          <ProtectedRoute allowedRoles={["3"]}>
            <PropietarioMyPharmacies />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["1"]}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/inspectionshistory"
        element={
          <ProtectedRoute allowedRoles={["1"]}>
            <InspectionHistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/pharmacies"
        element={
          <ProtectedRoute allowedRoles={["1"]}>
            <PharmaciesManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["1"]}>
            <UserManagementPage />
          </ProtectedRoute>
        }
      />

      {/* Página 404 */}
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}

export default App;

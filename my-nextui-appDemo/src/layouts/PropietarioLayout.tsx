import Layout from "./LayoutGenerico";
import { useNavigate } from "react-router-dom";

export default function PropietarioLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("token");

    // Redirect to the home page
    navigate("/");
  };

  const menuItems = [
    { title: "Inicio", path: "/propietario/dashboard" },
    { title: "Cuenta", path: "/propietario/cuenta" },
    { title: "Mis Farmacias", path: "/propietario/farmacias" },
    { title: "Cerrar Sesión", action: handleLogout }, // Add Logout
  ];

  return (
    <Layout role="Propietario" menuItems={menuItems}>
      {children}
    </Layout>
  );
}

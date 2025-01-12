import Layout from "./LayoutGenerico";

export default function AdministradorLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { title: "Dashboard", path: "/administrador/adminDashboard" },
    { title: "Gestionar Usuarios", path: "/administrador/userManagement" },
    { title: "Solicitudes", path: "/administrador/solicitudes" },
  ];

  return (
    <Layout role="Administrador" menuItems={menuItems}>
      {children}
    </Layout>
  );
}

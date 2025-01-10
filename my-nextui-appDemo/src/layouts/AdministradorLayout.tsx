import Layout from "./LayoutGenerico";

export default function AdministradorLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { title: "Gestionar Usuarios", path: "/administrador/gestionar-usuarios" },
    { title: "Mi Cuenta", path: "/administrador/mi-cuenta" },
  ];

  return (
    <Layout role="Administrador" menuItems={menuItems}>
      {children}
    </Layout>
  );
}

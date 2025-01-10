import Layout from "./LayoutGenerico";

export default function PropietarioLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { title: "Cuenta", path: "/propietario/cuenta" },
    { title: "Mis Farmacias", path: "/propietario/farmacias" },
  ];

  return (
    <Layout role="Propietario" menuItems={menuItems}>
      {children}
    </Layout>
  );
}

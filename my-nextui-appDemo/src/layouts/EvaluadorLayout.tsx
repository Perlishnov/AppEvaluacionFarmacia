import Layout from "./LayoutGenerico";

export default function EvaluadorLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { title: "Mis Evaluaciones", path: "/evaluador/mis-evaluaciones" },
    { title: "Asignar Evaluaciones", path: "/evaluador/asignar-evaluaciones" },
    { title: "Mi Cuenta", path: "/evaluador/mi-cuenta" },
  ];

  return (
    <Layout role="Evaluador" menuItems={menuItems}>
      {children}
    </Layout>
  );
}

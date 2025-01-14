import Layout from "./LayoutGenerico";

export default function AdministradorLayout({ children }: { children: React.ReactNode }) {
    const menuItems = [
        { title: "Dashboard", path: "/admin/dashboard" },
        { title: "Usuarios", path: "/admin/users" },
        { title: "Farmacias", path: "/admin/pharmacies" },
        { title: "Inspecciones", path: "/admin/inspectionshistory" },
    ];

    return (
        <Layout role="Administrador" menuItems={menuItems}>
            {children}
        </Layout>
    );
}
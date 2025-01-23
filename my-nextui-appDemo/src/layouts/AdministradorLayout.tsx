import Layout from "./LayoutGenerico";

export default function AdministradorLayout({ children }: { children: React.ReactNode }) {
    const menuItems = [
        { title: "Dashboard", path: "/admin/dashboard" },
        { title: "Usuarios", path: "/admin/users" },
        { title: "Farmacias", path: "/admin/pharmacies" },
        { title: "Inspecciones", path: "/admin/inspectionshistory" },
        { 
            title: "Cerrar sesión", 
            path: "/", 
            onClick: () => {
                // Eliminar el token del localStorage
                localStorage.removeItem("token");
                // Redirigir al usuario a la página principal
                window.location.href = "/";
            } 
        },
    ];

    return (
        <Layout role="Administrador" menuItems={menuItems}>
            {children}
        </Layout>
    );
}

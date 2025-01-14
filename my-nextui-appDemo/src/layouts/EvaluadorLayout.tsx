import React from "react";
import LayoutGenerico from "./LayoutGenerico";

export default function EvaluadorLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { title: "Dashboard", path: "/inspector/dashboard" },
    { title: "Mi Cuenta", path: "/inspector/account" },
  ];

  return <LayoutGenerico role="Inspector" menuItems={menuItems}>{children}</LayoutGenerico>;
}

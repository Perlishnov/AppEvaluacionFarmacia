import React from "react";

type MenuItem = {
  title: string;
  path: string;
};

type LayoutGenericoProps = {
  children: React.ReactNode;
  role: string;
  menuItems: MenuItem[];
};

export default function LayoutGenerico({ children, role, menuItems }: LayoutGenericoProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">{role}</h2>
        <nav>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}

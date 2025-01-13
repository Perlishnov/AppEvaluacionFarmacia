import React from "react";
import { Link } from "react-router-dom";

const LayoutGenerico = ({
  children,
  menuItems,
  role,
}: {
  children: React.ReactNode;
  menuItems: { title: string; path: string }[];
  role: string;
}) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">{role}</h2>
        <nav>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default LayoutGenerico;

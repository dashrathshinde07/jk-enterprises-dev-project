import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Tag,
  Users,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, to: "/" },
  { label: "Blogs", icon: <FileText size={18} />, to: "/blogs" },
  { label: "Products", icon: <ShoppingCart size={18} />, to: "/products" },
  { label: "Categories", icon: <Tag size={18} />, to: "/categories" },
  {
    label: "Parent Categories",
    icon: <Tag size={18} />,
    to: "/parentCategories",
  },

  { label: "Reviews", icon: <Users size={18} />, to: "/reviews" },
  // You can add more: Hero, PromoBanner, Footer, etc.
];

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2C498D] text-white flex-shrink-0 hidden md:block">
        <div className="p-4 font-bold text-lg border-b border-white/20">
          JK Admin
        </div>
        <nav className="mt-4 space-y-1 px-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-white/10 transition ${
                  isActive ? "bg-white/10 font-semibold" : ""
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white px-4 py-3 border-b shadow-sm flex justify-between items-center">
          <h1 className="text-xl font-semibold text-[#2C498D]">Admin Panel</h1>
          {/* Optional Logout or Profile dropdown */}
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#2C498D]">
            <span>Logout</span>
            <ChevronRight size={16} />
          </button>
        </header>

        {/* Page Content */}
        <main className="p-4 overflow-y-auto flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

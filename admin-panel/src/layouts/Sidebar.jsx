import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Star,
  Layers,
  Users,
  Image,
  Folder,
  UserCog,
} from "lucide-react";

const navItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  { path: "/blogs", label: "Blogs", icon: <FileText size={18} /> },
  {
    path: "/parent-entities",
    label: "Parent Entities",
    icon: <Layers size={18} />,
  },
  { path: "/categories", label: "Categories", icon: <Layers size={18} /> },
  { path: "/products", label: "Products", icon: <ShoppingCart size={18} /> },
  { path: "/reviews", label: "Reviews", icon: <Star size={18} /> },
  { path: "/footer", label: "Footer", icon: <Folder size={18} /> },
  { path: "/hero", label: "Hero Section", icon: <Image size={18} /> },
  { path: "/section-items", label: "Section Items", icon: <Image size={18} /> },
  { path: "/promo-banners", label: "Promo Banners", icon: <Image size={18} /> },
  {
    path: "/trending-products",
    label: "Trending Products",
    icon: <ShoppingCart size={18} />,
  },
  { path: "/why-choose-us", label: "Why Choose Us", icon: <Users size={18} /> },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#2C498D] text-white fixed top-0 left-0 shadow-lg flex flex-col">
      {/* Admin Header */}
      <div className="flex items-center gap-2 p-5 border-b border-blue-300">
        <UserCog size={22} className="text-white" />
        <div className="text-lg font-semibold tracking-wide">JK Admin</div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 
               font-medium hover:bg-blue-800 ${
                 isActive ? "bg-blue-900 border-l-4 border-white pl-5" : ""
               }`
            }
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Info (Optional) */}
      <div className="text-center text-xs text-blue-200 py-3 border-t border-blue-400">
        Developed by Dashon Solutions
      </div>
    </aside>
  );
};

export default Sidebar;

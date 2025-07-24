import React from "react";
import { motion } from "framer-motion";

// Valid icons
import { FiEdit, FiPackage, FiStar } from "react-icons/fi";
import {
  MdLocalOffer,
  MdCategory,
  MdDynamicFeed,
  MdImage,
  MdLabel,
} from "react-icons/md";
import { FaHandsHelping, FaSitemap } from "react-icons/fa";
import { RiLinksLine } from "react-icons/ri";

const features = [
  {
    title: "Blogs",
    desc: "Manage updates & articles",
    icon: <FiEdit size={22} />,
    color: "from-[#2C498D] to-[#416ab9]",
  },
  {
    title: "Products",
    desc: "Product listings & stock",
    icon: <FiPackage size={22} />,
    color: "from-green-600 to-emerald-500",
  },
  {
    title: "Reviews",
    desc: "Customer feedback",
    icon: <FiStar size={22} />,
    color: "from-yellow-500 to-amber-400",
  },
  {
    title: "Categories",
    desc: "Product categorization",
    icon: <MdCategory size={22} />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Hero Section",
    desc: "Homepage banners",
    icon: <MdImage size={22} />,
    color: "from-pink-500 to-rose-400",
  },
  {
    title: "Promo Banners",
    desc: "Promotional graphics",
    icon: <MdLocalOffer size={22} />,
    color: "from-red-500 to-orange-400",
  },
  {
    title: "Trending Products",
    desc: "Highlight top items",
    icon: <MdLabel size={22} />,
    color: "from-cyan-500 to-sky-400",
  },
  {
    title: "Why Choose Us",
    desc: "USPs & brand trust",
    icon: <FaHandsHelping size={22} />,
    color: "from-teal-500 to-green-400",
  },
  {
    title: "Footer Content",
    desc: "Links & contact info",
    icon: <RiLinksLine size={22} />,
    color: "from-gray-700 to-gray-900",
  },
  {
    title: "Parent Entities",
    desc: "Group related data",
    icon: <FaSitemap size={22} />,
    color: "from-orange-400 to-yellow-500",
  },
  {
    title: "Section Items",
    desc: "Dynamic section blocks",
    icon: <MdDynamicFeed size={22} />,
    color: "from-blue-500 to-indigo-600",
  },
];

const Dashboard = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-white to-slate-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col justify-between h-full">
        {/* Header */}
        <div className="text-center mb-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold text-[#2C498D]"
          >
            JK Enterprises – Admin Panel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-sm md:text-base mt-1"
          >
            All-in-one dashboard to manage content, products, and site sections.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 flex-grow">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`bg-gradient-to-tr ${f.color} text-white p-4 rounded-xl shadow hover:scale-105 transition-transform`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div>{f.icon}</div>
                <h2 className="text-sm font-semibold">{f.title}</h2>
              </div>
              <p className="text-xs opacity-90">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 border-t pt-3 mt-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-center">
          <p>
            <span className="text-[#2C498D] font-semibold">
              Admin Access for JK Enterprises
            </span>
          </p>
          <p>
            Developed by <strong>Dashon Solutions</strong>
          </p>
          <p>
            Support:{" "}
            <a
              href="mailto:clientdesk.team@gmail.com"
              className="text-[#2C498D] underline font-medium"
            >
              clientdesk.team@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

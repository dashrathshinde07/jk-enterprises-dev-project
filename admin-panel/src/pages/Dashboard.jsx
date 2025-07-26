import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    products: 0,
    reviews: 0,
    categories: 0,
    plugins: [],
  });

  // ✅ Fetch data with flexible parsing
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;

        const [blogsRes, productsRes, reviewsRes, categoriesRes] =
          await Promise.all([
            fetch(`${baseURL}/blogs`),
            fetch(`${baseURL}/products`),
            fetch(`${baseURL}/reviews`),
            fetch(`${baseURL}/categories`),
          ]);

        const blogs = await blogsRes.json();
        const products = await productsRes.json();
        const reviews = await reviewsRes.json();
        const categories = await categoriesRes.json();

        const blogsCount = Array.isArray(blogs)
          ? blogs.length
          : blogs?.data?.length || 0;
        const productsCount = Array.isArray(products)
          ? products.length
          : products?.data?.length || 0;
        const reviewsCount = Array.isArray(reviews)
          ? reviews.length
          : reviews?.data?.length || 0;
        const categoriesCount = Array.isArray(categories)
          ? categories.length
          : categories?.data?.length || 0;

        setStats({
          blogs: blogsCount,
          products: productsCount,
          reviews: reviewsCount,
          categories: categoriesCount,
          plugins: [
            { name: "Blogs", value: blogsCount },
            { name: "Products", value: productsCount },
            { name: "Reviews", value: reviewsCount },
            { name: "Categories", value: categoriesCount },
          ],
        });
      } catch (err) {
        console.error("❌ Dashboard stats fetch error:", err);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Blogs",
      count: stats.blogs,
      color: "from-[#2C498D] to-[#3e5fab]",
    },
    {
      label: "Products",
      count: stats.products,
      color: "from-green-500 to-emerald-400",
    },
    {
      label: "Reviews",
      count: stats.reviews,
      color: "from-yellow-500 to-amber-400",
    },
    {
      label: "Categories",
      count: stats.categories,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex justify-center items-center p-4">
      <div className="w-full max-w-6xl h-full bg-white rounded-3xl shadow-2xl flex flex-col p-6 md:p-10 border border-gray-200">
        {/* HEADER */}
        <motion.h1
          className="text-4xl font-extrabold text-[#2C498D] text-center mb-2 tracking-wide"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          JK Enterprises – Admin Dashboard
        </motion.h1>
        <motion.p
          className="text-gray-600 text-center mb-8 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Real-time insights for <strong>Weighing Scales</strong>,{" "}
          <strong>CCTV Solutions</strong> & <strong>Poultry Equipment</strong>.
        </motion.p>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {statCards.map((card, idx) => (
            <motion.div
              key={idx}
              className={`bg-gradient-to-tr ${card.color} text-white rounded-2xl p-5 shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className="text-3xl font-bold">{card.count}</span>
              <span className="text-sm mt-1">{card.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CHART SECTION */}
        <motion.div
          className="flex-1 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-inner p-6 mb-10 border border-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-center text-lg font-semibold text-[#2C498D] mb-6">
            Content Statistics Overview
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.plugins}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#374151" />
                <YAxis allowDecimals={false} stroke="#374151" />
                <Tooltip cursor={{ fill: "rgba(44,73,141,0.05)" }} />
                <Bar dataKey="value" fill="#2C498D" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* FOOTER */}
        <div className="text-xs text-gray-500 border-t pt-4 flex justify-center items-center gap-4">
          <span className="text-[#2C498D] font-semibold">
            Admin Access for JK Enterprises
          </span>
          <span>
            Developed by <strong>Dashon Solutions</strong>
          </span>
          <span>
            Support:{" "}
            <a
              href="mailto:clientdesk.team@gmail.com"
              className="text-[#2C498D] underline"
            >
              clientdesk.team@gmail.com
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "../layouts/MainLayout";

// Auth
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Login from "../pages/auth/Login";

// Pages
import Dashboard from "../pages/Dashboard";

// Modules
import BlogList from "../pages/Blog/BlogList";
import CategoryList from "../pages/Category/CategoryList";
import ProductList from "../pages/Product/ProductList";
import ReviewList from "../pages/Review/ReviewList";
import FooterList from "../pages/Footer/FooterList";
import HeroList from "../pages/Hero/HeroList";
import SectionItemList from "../pages/SectionItem/SectionItemList";
import PromoBannerList from "../pages/PromoBanner/PromoBannerList";
import TrendingProductList from "../pages/TrendingProduct/TrendingProductList";
import WhyChooseUsList from "../pages/WhyChooseUs/WhyChooseUsList";
import ParentEntityList from "../pages/ParentEntity/ParentEntityList";

// 404 Page (Optional)
const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen text-center text-red-600 text-xl">
    404 – Page Not Found
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="blogs"
          element={
            <ProtectedRoute>
              <BlogList />
            </ProtectedRoute>
          }
        />
        <Route
          path="categories"
          element={
            <ProtectedRoute>
              <CategoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="reviews"
          element={
            <ProtectedRoute>
              <ReviewList />
            </ProtectedRoute>
          }
        />
        <Route
          path="footer"
          element={
            <ProtectedRoute>
              <FooterList />
            </ProtectedRoute>
          }
        />
        <Route
          path="hero"
          element={
            <ProtectedRoute>
              <HeroList />
            </ProtectedRoute>
          }
        />
        <Route
          path="section-items"
          element={
            <ProtectedRoute>
              <SectionItemList />
            </ProtectedRoute>
          }
        />
        <Route
          path="promo-banners"
          element={
            <ProtectedRoute>
              <PromoBannerList />
            </ProtectedRoute>
          }
        />
        <Route
          path="trending-products"
          element={
            <ProtectedRoute>
              <TrendingProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="why-choose-us"
          element={
            <ProtectedRoute>
              <WhyChooseUsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="parent-entities"
          element={
            <ProtectedRoute>
              <ParentEntityList />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

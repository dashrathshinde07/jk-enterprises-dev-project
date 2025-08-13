import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../redux/slices/languageSlice";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX, FiGlobe } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.language);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("about"), path: "/about" },
    { name: t("divisions"), path: "/divisions" },
    { name: t("products"), path: "/products" },
    { name: t("farmers"), path: "/farmers" },
    { name: t("partners"), path: "/partners" },
    { name: t("gallery"), path: "/gallery" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = () => navigate("/contact");

  const changeLanguage = (langCode) => {
    dispatch(setLanguage(langCode));
    i18n.changeLanguage(langCode);
    setLangDropdown(false);
    localStorage.setItem("appLanguage", langCode);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/50 backdrop-blur-md shadow-md" : " bg-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[80px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src="/logo.png" alt="Logo" className="h-[80px]" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `uppercase font-medium transition duration-300 ${
                      isActive
                        ? "text-red-500 border-b-2 border-red-500"
                        : "text-white hover:text-red-500"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdown(!langDropdown)}
                  className="flex items-center gap-1 text-white hover:text-red-500 transition"
                >
                  <FiGlobe size={18} />
                  {language === "en" ? "English" : "मराठी"}
                </button>
                {langDropdown && (
                  <div className="absolute top-full mt-2 bg-white shadow-lg rounded w-28">
                    <button
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                      onClick={() => changeLanguage("en")}
                    >
                      English
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                      onClick={() => changeLanguage("mr")}
                    >
                      मराठी
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Button (Desktop) */}
            <div className="hidden md:block">
              <button
                onClick={handleContactClick}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                {t("contact")}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="text-white focus:outline-none"
              >
                <FiMenu size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <button onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        <div className="flex flex-col space-y-4 p-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `uppercase font-medium transition duration-300 ${
                  isActive
                    ? "text-red-600 border-l-4 pl-2 border-red-600"
                    : "text-gray-700 hover:text-red-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Language Toggle in Mobile */}
          <div>
            <p className="font-medium mb-1">{t("language")}</p>
            <div className="flex gap-2">
              <button
                onClick={() => changeLanguage("en")}
                className={`px-3 py-1 border rounded ${
                  language === "en" ? "bg-red-600 text-white" : "bg-white"
                }`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage("mr")}
                className={`px-3 py-1 border rounded ${
                  language === "mr" ? "bg-red-600 text-white" : "bg-white"
                }`}
              >
                मराठी
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              handleContactClick();
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            {t("contact")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

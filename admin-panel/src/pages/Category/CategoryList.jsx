import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  archiveCategory,
} from "../../api/categoryApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import CategoryForm from "./CategoryForm";
import CategoryEdit from "./CategoryEdit";
import { Plus, Edit, Archive } from "lucide-react";
import { toast } from "react-toastify";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");

  const [Categorytitle, SetCategorytitle] = useState('')

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      setCategories(res.data || res);
    } catch (err) {
      console.error("Error fetching categories", err);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [archivingCategoryId, setArchivingCategoryId] = useState(null);
  const [showConfirmArchive, setShowConfirmArchive] = useState(false);

  const handleArchive = (id, title) => {
    SetCategorytitle(title)
    setArchivingCategoryId(id);
    setShowConfirmArchive(true);
  };

  const confirmArchive = async () => {
    const toastId = toast.loading("Archiving category...");

    try {
      await archiveCategory(archivingCategoryId);

      toast.update(toastId, {
        render: "Category archived successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchData();
    } catch (error) {
      console.error("Error archiving category:", error);

      toast.update(toastId, {
        render: error?.response?.data?.message || "Failed to archive category.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setShowConfirmArchive(false);
      setArchivingCategoryId(null);
    }
  };

  const cancelArchive = () => {
    setShowConfirmArchive(false);
    setArchivingCategoryId(null);
  };

  // Confirmation Modal Component
  const ConfirmArchiveModal = () => {
    if (!showConfirmArchive) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-6 rounded-xl shadow-2xl text-center space-y-4 max-w-md w-full mx-4">
          <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <Archive size={32} className="text-yellow-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Archive Category</h3>
          <p className="text-slate-600">Are you sure you want to archive this <span className="text-sm font-bold text-slate-800">{Categorytitle}</span> category? You can restore it later if needed.</p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={confirmArchive}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Yes, Archive
            </button>
            <button
              onClick={cancelArchive}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen  p-6">
      {/* bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 */}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Categories
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Organize your content with categories</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Toggle - matching PromoBannerList structure */}
          <div className="flex bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
            <button
              onClick={() => setSelectedLang("en")}
              className={`px-5 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer ${selectedLang === "en"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "text-slate-600 hover:bg-white/60"
                }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLang("mr")}
              className={`px-5 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer ${selectedLang === "mr"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "text-slate-600 hover:bg-white/60"
                }`}
            >
              मराठी
            </button>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="bg-gradient-to-r from-blue-600 cursor-pointer to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.02]"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        /* Category Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category._id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:scale-[1.02]"
            >
              {/* Category Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={selectedLang === "en" ? category.englishTitle : category.marathiTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => setEditData(category)}
                    className="bg-white/90 backdrop-blur-sm p-2 cursor-pointer rounded-lg hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                    title="Edit category"
                  >
                    <Edit size={16} className="text-blue-600" />
                  </button>
                  <button

                    onClick={() => handleArchive(category._id, category?.englishTitle)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-lg cursor-pointer hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                    title="Archive category"
                  >
                    <Archive size={16} className="text-yellow-600" />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Title - adapting to language selection like PromoBannerList */}
                <h3 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
                  {selectedLang === "en" ? (category.englishTitle || 'Untitled Category') : (category.marathiTitle || category.englishTitle || 'Untitled Category')}
                </h3>

                {/* Secondary Title - showing the other language as italic subtitle */}
                {selectedLang === "en" && category.marathiTitle && (
                  <p className="text-slate-600 italic line-clamp-2 text-sm leading-relaxed">
                    "{category.marathiTitle}"
                  </p>
                )}
                {selectedLang === "mr" && category.englishTitle && category.marathiTitle && (
                  <p className="text-slate-600 italic line-clamp-2 text-sm leading-relaxed">
                    "{category.englishTitle}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && categories.length === 0 && (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Plus size={48} className="text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">No categories yet</h3>
          <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
            Start organizing your content by creating your first category.
          </p>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Create Your First Category
          </button>
        </div>
      )}

      {/* Modals */}
      <Modal title="Add Category" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <CategoryForm
          onSuccess={() => {
            setShowAdd(false);
            fetchData();
          }}
        />
      </Modal>

      <Modal title="Edit Category" isOpen={!!editData} onClose={() => setEditData(null)}>
        <CategoryEdit
          data={editData}
          onSuccess={() => {
            setEditData(null);
            fetchData();
          }}
        />
      </Modal>

      {/* Confirmation Archive Modal */}
      <ConfirmArchiveModal />
    </div>
  );
};

export default CategoryList;
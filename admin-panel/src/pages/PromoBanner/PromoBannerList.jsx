import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import {
  getAllPromoBanners,
  deletePromoBanner,
} from "../../api/promoBannerApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TableActions from "../../components/TableActions";
import PromoBannerForm from "./PromoBannerForm";
import PromoBannerEdit from "./PromoBannerEdit";
import { toast } from "react-toastify";

const PromoBannerList = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const [Bannertitle, SetBannertitle] = useState('')

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllPromoBanners();
      setBanners(res.data || res);
    } catch (err) {
      console.error("Error fetching promo banners", err);
      toast.error("Failed to fetch promo banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [deletingBannerId, setDeletingBannerId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = (id, title) => {
    SetBannertitle(title)
    setDeletingBannerId(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    const toastId = toast.loading("Deleting promo banner...");

    try {
      await deletePromoBanner(deletingBannerId);

      toast.update(toastId, {
        render: "Promo banner deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchData();
    } catch (error) {
      console.error("Error deleting banner:", error);

      toast.update(toastId, {
        render: error?.response?.data?.message || "Failed to delete promo banner.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setShowConfirmDelete(false);
      setDeletingBannerId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setDeletingBannerId(null);
  };

  // Confirmation Modal Component
  const ConfirmDeleteModal = () => {
    if (!showConfirmDelete) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-6 rounded-xl shadow-2xl text-center space-y-4 max-w-md w-full mx-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Trash2 size={32} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Delete Banner</h3>                  
          <p className="text-slate-600">Are you sure you want to delete <span className="text-sm font-bold text-slate-800">{Bannertitle}</span> this banner?</p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Yes, Delete
            </button>
            <button
              onClick={cancelDelete}
              className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6">
      {/* bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 */}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Promo Banners
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Manage your promotional content</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
            <button
              onClick={() => setSelectedLang("en")}
              className={`px-5 py-3 text-sm font-semibold cursor-pointer transition-all duration-300 ${selectedLang === "en"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "text-slate-600 hover:bg-white/60"
                }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLang("mr")}
              className={`px-5 py-3 text-sm font-semibold transition-all cursor-pointer duration-300 ${selectedLang === "mr"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "text-slate-600 hover:bg-white/60"
                }`}
            >
              मराठी
            </button>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.02]"
          >
            <Plus size={20} />
            Add Banner
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        /* Banner Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {banners.map((banner) => (
            <div
              key={banner._id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:scale-[1.02]"
            >
              {/* Banner Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={banner.imageUrl || banner.image}
                  alt={banner.title?.[selectedLang] || banner.title_en}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => setEditData(banner)}
                    className="bg-white/90 backdrop-blur-sm p-2 cursor-pointer rounded-lg hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                    title="Edit banner"
                  >
                    <Edit size={16} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(banner._id, banner?.title?.en)}
                    className="bg-white/90 backdrop-blur-sm p-2 cursor-pointer rounded-lg hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                    title="Delete banner"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
                  {banner.title?.[selectedLang] || banner[`title_${selectedLang}`] || 'Untitled Banner'}
                </h3>

                {/* Tagline */}
                {(banner.tagline?.[selectedLang] || banner[`tagline_${selectedLang}`]) && (
                  <p className="text-slate-600 italic line-clamp-2 text-sm leading-relaxed">
                    "{banner.tagline?.[selectedLang] || banner[`tagline_${selectedLang}`]}"
                  </p>
                )}

                {/* CTA Button */}
                {(banner.ctaText?.[selectedLang] || banner[`ctaText_${selectedLang}`]) && (
                  <div className="pt-2">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                      <span>{banner.ctaText?.[selectedLang] || banner[`ctaText_${selectedLang}`]}</span>
                      {banner.ctaLink && <ExternalLink size={14} />}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && banners.length === 0 && (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Plus size={48} className="text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">No banners yet</h3>
          <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
            Create your first promotional banner to get started with your marketing campaigns.
          </p>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Create Your First Banner
          </button>
        </div>
      )}

      {/* Modals */}
      <Modal title="Add Promo Banner" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <PromoBannerForm
          onSuccess={() => {
            setShowAdd(false);
            fetchData();
          }}
        />
      </Modal>

      <Modal title="Edit Promo Banner" isOpen={!!editData} onClose={() => setEditData(null)}>
        <PromoBannerEdit
          data={editData}
          onSuccess={() => {
            setEditData(null);
            fetchData();
          }}
        />
      </Modal>

      {/* Confirmation Delete Modal */}
      <ConfirmDeleteModal />
    </div>
  );
};

export default PromoBannerList;
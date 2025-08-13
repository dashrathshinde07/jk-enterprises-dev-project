import React, { useEffect, useState } from "react";
import {
  getTrendingProducts,
  deleteTrendingProduct,
} from "../../api/trendingProductApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TrendingProductForm from "./TrendingProductForm";
import TrendingProductEdit from "./TrendingProductEdit";
import {
  Trash2,
  Edit,
  Plus,
  Package,
  Star,
  ExternalLink
} from "lucide-react";
import { toast } from "react-toastify";

const TrendingProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  // const [error, setError] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");

  const [deletingProductId, setDeletingProductId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [TrendingTitle, SetTrendingTitle] = useState('')

  const fetchData = async () => {
    setLoading(true);
    // setError(null);
    try {
      const res = await getTrendingProducts();
      setProducts(res.data || res || []);
    } catch (err) {
      console.error("Error loading trending products", err);
      toast.error("Failed to fetch trending products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, title) => {
    SetTrendingTitle(title)
    setDeletingProductId(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    const toastId = toast.loading("Deleting trending product...");

    try {
      await deleteTrendingProduct(deletingProductId);

      toast.update(toastId, {
        render: "Trending product deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);

      toast.update(toastId, {
        render: error?.response?.data?.message || "Failed to delete trending product.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setShowConfirmDelete(false);
      setDeletingProductId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setDeletingProductId(null);
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
          <h3 className="text-xl font-bold text-slate-800">Delete Product</h3>
          <p className="text-slate-600">Are you sure you want to delete this <span className="text-sm font-bold text-slate-800">{TrendingTitle}</span> trending product?</p>
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen  p-6">
      {/* bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 */}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Trending Products
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Manage your trending product collection</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Toggle */}
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
            Add Product
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:scale-[1.02]"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product?.imageUrl}
                  alt={product?.title?.[selectedLang] || product?.title?.en || "Product"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Featured Badge */}
                {product?.isFeatured && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1">
                      <Star size={14} className="fill-current" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => setEditData(product)}
                    className="bg-white/90 backdrop-blur-sm p-2 cursor-pointer rounded-lg hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                    title="Edit product"
                  >
                    <Edit size={16} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id, product?.title?.en)}
                    className="bg-white/90 backdrop-blur-sm cursor-pointer p-2 rounded-lg hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                    title="Delete product"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
                  {product?.title?.[selectedLang] || product?.title?.en || 'Untitled Product'}
                </h3>

                {/* Description */}
                {(product?.description?.[selectedLang] || product?.description?.en) && (
                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                    {product?.description?.[selectedLang] || product?.description?.en}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Package size={48} className="text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">No products yet</h3>
          <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
            Create your first trending product to showcase your popular items.
          </p>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Create Your First Product
          </button>
        </div>
      )}

      {/* Modals */}
      <Modal title="Add Trending Product" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <TrendingProductForm
          onSuccess={() => {
            setShowAdd(false);
            fetchData();
          }}
        />
      </Modal>

      <Modal title="Edit Trending Product" isOpen={!!editData} onClose={() => setEditData(null)}>
        <TrendingProductEdit
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

export default TrendingProductList;
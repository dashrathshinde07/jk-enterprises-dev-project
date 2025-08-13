import React, { useEffect, useState } from "react";
import { Edit, Trash2, Archive, Plus } from "lucide-react";
import {
  getAllProducts,
  softDeleteProduct,
} from "../../api/productApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import ProductForm from "./ProductForm";
import ProductEdit from "./ProductEdit";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [producttitle, Setproducttile] = useState("")

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts();
      setProducts(res.data || res);
    } catch (err) {
      console.error("Failed to fetch products", err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = (id, title) => {
    console.log(title);
    Setproducttile(title)
    setDeletingProductId(id);
    setShowConfirmDelete(true);
  };

  const confirmSoftDelete = async () => {
    const toastId = toast.loading("Archiving product...");

    try {
      await softDeleteProduct(deletingProductId);
      toast.update(toastId, {
        render: "Product archived successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      fetchData();
    } catch (error) {
      console.error("Error archiving product:", error);
      toast.update(toastId, {
        render: error?.response?.data?.message || "Failed to archive product.",
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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 ">
        <div className="bg-white p-10 rounded-xl shadow-2xl text-center space-y-4 max-w-md w-full mx-4">
          <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Archive size={32} className="text-orange-600" />
          </div>  
          <h3 className="text-xl font-bold text-slate-800">Archive Product</h3>
          <p className="text-slate-600">Are you sure you want to archive this <span className="text-sm font-bold text-slate-800">{producttitle}</span> product?</p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={confirmSoftDelete}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Yes, Archive
            </button>
            <button
              onClick={cancelDelete}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
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
    // bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Products
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Manage your product inventory</p>
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
            type="button"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.02]"
          >
            <Plus size={20} />
            Add Productll
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
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]?.url}
                    alt={product.nameEn || product.title_en || "Product"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="text-center text-gray-400">
                      <div className="text-4xl mb-2">📦</div>
                      <p className="text-sm font-medium">No Image</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Stock Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-2 rounded-xl text-xs font-bold shadow-lg ${product.stock > 50
                    ? 'bg-green-500 text-white'
                    : product.stock > 10
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                    }`}>
                    Stock: {product.stock}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => setEditData(product)}
                    className="bg-white/90 cursor-pointer backdrop-blur-sm p-2 rounded-lg hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                    title="Edit product"
                  >
                    <Edit size={16} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleSoftDelete(product._id, product?.nameEn)}
                    className="bg-white/90 cursor-pointer backdrop-blur-sm p-2 rounded-lg hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                    title="Archive product"
                  >
                    <Archive size={16} className="text-orange-500" />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-blue-700 transition-colors duration-300">
                    {selectedLang === "en"
                      ? (product.nameEn || product.title_en || "Untitled Product")
                      : (product.nameMr || product.title_mr || product.nameEn || product.title_en || "Untitled Product")
                    }
                  </h3>
                  {selectedLang === "en" && (product.nameMr || product.title_mr) && (
                    <p className="text-sm text-slate-600 line-clamp-1 mt-1">
                      {product.nameMr || product.title_mr}
                    </p>
                  )}
                </div>

                {/* Price Section */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-green-600">
                      ₹{product.sellingPrice || product.price}
                    </span>
                    {product.mrp && product.mrp !== product.sellingPrice && (
                      <>
                        <span className="text-sm text-slate-500 line-through">
                          ₹{product.mrp}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                          {Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)}% off
                        </span>
                      </>
                    )}
                  </div>

                  {/* Brand and Category */}
                  <div className="flex justify-between items-center text-xs">
                    {product.brand && product.brand !== "searchableKeywords" && (
                      <span className="text-slate-600">
                        <span className="font-medium">Brand:</span> {product.brand}
                      </span>
                    )}
                    {product.category && (
                      <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-full font-semibold border border-blue-200">
                        {product.category.englishTitle || product.category.marathiTitle || "Category"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <span className="text-6xl">📦</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">No products yet</h3>
          <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
            Your product catalog is empty. Add your first product to start selling.
          </p>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Create Your First Product
          </button>
        </div>
      )}

      {/* Modals */}
      <Modal title="Add Product" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <ProductForm
          onSuccess={() => {
            setShowAdd(false);
            fetchData();
          }}
        />
      </Modal>

      <Modal title="Edit Product" isOpen={!!editData} onClose={() => setEditData(null)}>
        <ProductEdit
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

export default ProductList;
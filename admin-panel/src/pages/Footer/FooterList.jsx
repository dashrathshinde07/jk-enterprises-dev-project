import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Globe, MapPin, Phone, Mail } from "lucide-react";
import {
  getFooter,
  deleteFooterById,
} from "../../api/footerApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TableActions from "../../components/TableActions";
import FooterForm from "./FooterForm";
import FooterEdit from "./FooterEdit";
import { toast } from "react-toastify";

const FooterList = () => {
  const [footerData, setFooterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const [deletingFooterId, setDeletingFooterId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [footertitle, Setfootertitle] = useState('')

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getFooter();
      // Handle both array and single object responses
      const data = Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];
      setFooterData(data);
    } catch (err) {
      console.error("Failed to fetch footer data", err);
      toast.error("Failed to fetch footer data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, title) => {
    Setfootertitle(title)
    setDeletingFooterId(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    const toastId = toast.loading("Deleting footer entry...");

    try {
      await deleteFooterById(deletingFooterId);

      toast.update(toastId, {
        render: "Footer entry deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchData();
    } catch (error) {
      console.error("Error deleting footer entry:", error);

      toast.update(toastId, {
        render: error?.response?.data?.message || "Failed to delete footer entry.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setShowConfirmDelete(false);
      setDeletingFooterId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setDeletingFooterId(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Confirmation Modal Component
  const ConfirmDeleteModal = () => {
    if (!showConfirmDelete) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white p-6 rounded-xl shadow-2xl text-center space-y-4 max-w-md w-full mx-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Trash2 size={32} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Delete Footer Entry</h3>
          <p className="text-slate-600">Are you sure you want to delete this <span className="text-sm font-bold text-slate-800">{footertitle}</span> footer entry? This action cannot be undone.</p>
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6">
      {/* bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 */}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Footer Management
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Manage your website footer content</p>
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
            Add Footer
          </button>
        </div>
      </div>

      {/* Footer Cards Grid */}
      {footerData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {footerData.map((item) => (
            <div
              key={item._id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:scale-[1.01]"
            >
              {/* Header with Logo and Actions */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {item.logoUrl && (
                      <img
                        src={item.logoUrl}
                        alt="Footer Logo"
                        className="w-16 h-16 object-contain bg-white/10 rounded-lg p-2"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/64x64?text=Logo';
                        }}
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-bold">Footer Configuration</h3>
                      <p className="text-blue-100 text-sm">Website footer content</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditItem(item)}
                      className="bg-white/20 hover:bg-white/30 cursor-pointer p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Edit footer"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, item?.developedBy)}
                      className="bg-white/20 hover:bg-red-500/80 cursor-pointer p-2 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Delete footer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                {item.description && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Globe size={18} className="text-blue-600" />
                      Description
                    </div>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg">
                      {item.description[selectedLang] || item.description.en || "No description available"}
                    </p>
                  </div>
                )}

                {/* Contact Information */}
                {item.contact && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
                      Contact Information
                    </h4>

                    {/* Address */}
                    {item.contact.address && (
                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                        <MapPin size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-slate-700">Address</p>
                          <p className="text-slate-600">
                            {item.contact.address[selectedLang] || item.contact.address.en || "No address available"}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Phone */}
                    {item.contact.phone && (
                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                        <Phone size={18} className="text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-slate-700">Phone</p>
                          <p className="text-slate-600">
                            {item.contact.phone[selectedLang] || item.contact.phone.en || "No phone available"}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    {item.contact.email && (
                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                        <Mail size={18} className="text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-slate-700">Email</p>
                          <p className="text-slate-600">{item.contact.email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Social Links */}
                {item.socialLinks && Object.keys(item.socialLinks).length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-700 text-lg border-b border-slate-200 pb-2">
                      Social Links
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(item.socialLinks).map(([platform, url]) => (
                        <div key={platform} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <Globe size={16} className="text-blue-600" />
                          <span className="font-medium text-slate-700 capitalize">{platform}:</span>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 truncate flex-1"
                          >
                            {url}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Developer Info */}
                {item.developedBy && (
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-500 text-center">
                      Developed by: <span className="font-medium text-slate-700">{item.developedBy}</span>
                    </p>
                  </div>
                )}

                {/* Timestamps */}
                <div className="flex justify-between text-xs text-slate-400 pt-4 border-t border-slate-200">
                  <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                  <span>Updated: {new Date(item.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Globe size={48} className="text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">No footer configured</h3>
          <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
            Create your website footer to display important information and links to your visitors.
          </p>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Create Footer
          </button>
        </div>
      )}

      {/* Modals */}
      <Modal title="Add Footer" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <FooterForm onSuccess={() => {
          setShowAdd(false);
          fetchData();
        }} />
      </Modal>

      <Modal title="Edit Footer" isOpen={!!editItem} onClose={() => setEditItem(null)}>
        {editItem && (
          <FooterEdit
            data={editItem}
            onSuccess={() => {
              setEditItem(null);
              fetchData();
            }}
          />
        )}
      </Modal>

      {/* Confirmation Delete Modal */}
      <ConfirmDeleteModal />
    </div>
  );
};

export default FooterList;
import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Star, MessageCircle } from "lucide-react";
import {
  getAllReviews,
  deleteReview,
} from "../../api/reviewApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TableActions from "../../components/TableActions";
import ReviewForm from "./ReviewForm";
import ReviewEdit from "./ReviewEdit";
import { toast } from "react-toastify";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllReviews();
      setReviews(res.data || res);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [deletingReviewId, setDeletingReviewId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [titlereview, setReviewstitle] = useState("")

  const handleDelete = (id, title) => {
    setReviewstitle(title)
    setDeletingReviewId(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    const toastId = toast.loading("Deleting review...");

    try {
      await deleteReview(deletingReviewId);

      toast.update(toastId, {
        render: "Review deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchData();
    } catch (error) {
      console.error("Error deleting review:", error);

      toast.update(toastId, {
        render: error?.response?.data?.message || "Failed to delete review.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setShowConfirmDelete(false);
      setDeletingReviewId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setDeletingReviewId(null);
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
          <h3 className="text-xl font-bold text-slate-800">Delete Review</h3>
          <p className="text-slate-600">Are you sure you want to delete this <span className="text-sm font-bold text-slate-800">{titlereview}</span> review?</p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => confirmDelete()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => cancelDelete()}
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
    // bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Customer Reviews
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Manage customer testimonials and feedback</p>
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
            className="bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.02]"
          >
            <Plus size={20} />
            Add Review
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        /* Reviews Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:scale-[1.02]"
            >
              {/* Profile Image */}
              <div className="relative p-6 pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={review?.profileImage}
                      alt='Profile Image Not Found'
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    // onError={(e) => {
                    //   e.target.src = 'https://via.placeholder.com/80x80?text=Profile';
                    // }}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-indigo-500 p-1.5 rounded-full">
                      <MessageCircle size={12} className="text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-800 truncate group-hover:text-blue-700 transition-colors duration-300">
                      {review.reviewerName?.[selectedLang] || review[`reviewerName_${selectedLang}`] || 'Anonymous'}
                    </h3>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${i < (review.rating || 5)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                            }`}
                        />
                      ))}
                      <span className="text-sm text-slate-600 ml-1">
                        ({review.rating || 5})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={() => setEditData(review)}
                    className="bg-white/90 backdrop-blur-sm p-2 cursor-pointer rounded-lg hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                    title="Edit review"
                  >
                    <Edit size={16} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(review._id, review?.reviewText?.en)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-lg cursor-pointer hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                    title="Delete review"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="px-6 pb-6 space-y-4">
                {/* Review Text */}
                <div className="bg-slate-50 rounded-xl p-4 relative">
                  <div className="absolute -top-2 left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-slate-50"></div>
                  <p className="text-slate-700 text-sm leading-relaxed line-clamp-4">
                    "{review.reviewText?.[selectedLang] || review[`reviewText_${selectedLang}`] || 'Great service and experience!'}"
                  </p>
                </div>

                {/* Review Details */}
                <div className="space-y-2 text-xs text-slate-500">
                  {review.position && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Position:</span>
                      <span>{review.position?.[selectedLang] || review[`position_${selectedLang}`]}</span>
                    </div>
                  )}
                  {review.company && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Company:</span>
                      <span>{review.company?.[selectedLang] || review[`company_${selectedLang}`]}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && reviews.length === 0 && (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <MessageCircle size={48} className="text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-3">No reviews yet</h3>
          <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
            Add your first customer review to showcase testimonials and build trust with potential clients.
          </p>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Add Your First Review
          </button>
        </div>
      )}

      {/* Modals */}
      <Modal title="Add Review" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <ReviewForm
          onSuccess={() => {
            setShowAdd(false);
            fetchData();
          }}
        />
      </Modal>

      <Modal title="Edit Review" isOpen={!!editData} onClose={() => setEditData(null)}>
        <ReviewEdit
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

export default ReviewList;
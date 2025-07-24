import React, { useEffect, useState } from "react";
import {
  getAllReviews,
  deleteReview,
} from "../../api/reviewApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TableActions from "../../components/TableActions";
import ReviewForm from "./ReviewForm";
import ReviewEdit from "./ReviewEdit";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllReviews();
      setReviews(res.data || res);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this review?")) {
      await deleteReview(id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2C498D]">Reviews</h2>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[#2C498D] text-white px-4 py-2 rounded"
        >
          Add Review
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto border rounded bg-white shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#2C498D] text-white">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name (EN)</th>
                <th className="p-3">Name (MR)</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={review.profileImage}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3">{review.name_en}</td>
                  <td className="p-3">{review.name_mr}</td>
                  <td className="p-3">
                    <TableActions
                      onEdit={() => setEditData(review)}
                      onDelete={() => handleDelete(review._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal title="Add Review" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <ReviewForm onSuccess={() => {
          setShowAdd(false);
          fetchData();
        }} />
      </Modal>

      <Modal title="Edit Review" isOpen={!!editData} onClose={() => setEditData(null)}>
        <ReviewEdit data={editData} onSuccess={() => {
          setEditData(null);
          fetchData();
        }} />
      </Modal>
    </div>
  );
};

export default ReviewList;

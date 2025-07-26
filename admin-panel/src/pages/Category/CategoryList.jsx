import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  deleteCategory,
  archiveCategory,
} from "../../api/categoryApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import CategoryForm from "./CategoryForm";
import CategoryEdit from "./CategoryEdit";
import { FiPlus, FiEdit, FiTrash2, FiArchive } from "react-icons/fi";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      await deleteCategory(id);
      fetchData();
    }
  };

  const handleArchive = async (id) => {
    if (window.confirm("Archive this category?")) {
      await archiveCategory(id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#2C498D] tracking-wide">
          📁 Categories
        </h2>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#2C498D] hover:bg-[#1f3a6d] text-white px-4 py-2 rounded-lg transition"
        >
          <FiPlus size={18} /> Add Category
        </button>
      </div>

      {/* Loader */}
      {loading ? (
        <Loader />
      ) : categories.length === 0 ? (
        <p className="text-gray-600 text-center">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white border rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.englishTitle}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#2C498D] mb-1">
                  {cat.englishTitle}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{cat.marathiTitle}</p>

                <div className="flex gap-2 flex-wrap justify-between">
                  <button
                    onClick={() => setEditData(cat)}
                    className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 text-xs border border-gray-800 rounded hover:bg-blue-100"
                  >
                    <FiEdit size={14} /> Edit
                  </button>
                  {/* <button
                    onClick={() => handleDelete(cat._id)}
                    className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 text-xs border border-gray-800 rounded hover:bg-red-100"
                  >
                    <FiTrash2 size={14} /> Delete
                  </button> */}
                  <button
                    onClick={() => handleArchive(cat._id)}
                    className="flex items-center gap-1 text-yellow-700 bg-yellow-50 px-3 py-1 text-xs border border-gray-800 rounded hover:bg-yellow-100"
                  >
                    <FiArchive size={14} /> Archive
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal
        title="Add Category"
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        maxWidth="max-w-[50%]"
      >
        <CategoryForm
          onSuccess={() => {
            setShowAdd(false);
            fetchData();
          }}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Category"
        isOpen={!!editData}
        onClose={() => setEditData(null)}
      >
        <CategoryEdit
          data={editData}
          onSuccess={() => {
            setEditData(null);
            fetchData();
          }}
        />
      </Modal>
    </div>
  );
};

export default CategoryList;

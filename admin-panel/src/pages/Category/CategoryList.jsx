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
import TableActions from "../../components/TableActions";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      setCategories(res.data || res);
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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2C498D]">Categories</h2>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[#2C498D] text-white px-4 py-2 rounded"
        >
          Add Category
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
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={cat.image}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{cat.name_en}</td>
                  <td className="p-3">{cat.name_mr}</td>
                  <td className="p-3 flex gap-2">
                    <TableActions
                      onEdit={() => setEditData(cat)}
                      onDelete={() => handleDelete(cat._id)}
                    />
                    <button
                      onClick={() => handleArchive(cat._id)}
                      className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200"
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        title="Add Category"
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
      >
        <CategoryForm
          onSuccess={() => {
            setShowAdd(false);
            fetchData();
          }}
        />
      </Modal>

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

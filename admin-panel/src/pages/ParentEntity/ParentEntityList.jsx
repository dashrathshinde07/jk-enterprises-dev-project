import React, { useEffect, useState } from "react";
import {
  getAllParentEntities,
  deleteParentEntity,
} from "../../api/parentEntityApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TableActions from "../../components/TableActions";
import ParentEntityForm from "./ParentEntityForm";
import ParentEntityEdit from "./ParentEntityEdit";

const ParentEntityList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllParentEntities();
      setItems(res.data || res);
    } catch (err) {
      console.error("Failed to fetch parent entities:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await deleteParentEntity(id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2C498D]">Parent Entities</h2>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[#2C498D] text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto border rounded bg-white shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#2C498D] text-white">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">
                    <TableActions
                      onEdit={() => setEditData(item)}
                      onDelete={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal title="Add Parent Entity" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <ParentEntityForm onSuccess={() => {
          setShowAdd(false);
          fetchData();
        }} />
      </Modal>

      <Modal title="Edit Parent Entity" isOpen={!!editData} onClose={() => setEditData(null)}>
        <ParentEntityEdit data={editData} onSuccess={() => {
          setEditData(null);
          fetchData();
        }} />
      </Modal>
    </div>
  );
};

export default ParentEntityList;

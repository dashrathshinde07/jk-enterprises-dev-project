import React, { useEffect, useState } from "react";
import {
  getAllParentEntities,
  archiveParentEntity,
} from "../../api/parentEntityApi";
import Modal from "../../components/Modal";
import TableActions from "../../components/TableActions";
import ParentEntityForm from "./ParentEntityForm";
import ParentEntityEdit from "./ParentEntityEdit";
import { Edit } from "lucide-react";

const ParentEntityList = () => {
  const [parentEntities, setParentEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllParentEntities();
      setParentEntities(res.data || res);
    } catch (err) {
      console.error("Error loading parent entities", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2C498D]">
          Parent Categories
        </h2>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[#2C498D] text-white px-4 py-2 rounded"
        >
          Add Parent
        </button>
      </div>

      <div className="overflow-x-auto border rounded bg-white shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#2C498D] text-white">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parentEntities.map((entity) => (
              <tr key={entity._id} className="border-b">
                <td className="p-3">{entity.title}</td>
                <td className="p-3">{entity.slug}</td>
                <td className="p-3">{entity.status}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditData(entity);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <Modal
        title="Add Parent Category"
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
      >
        <ParentEntityForm
          onSuccess={() => {
            setShowAdd(false);
            fetchData();
          }}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Parent Category"
        isOpen={!!editData}
        onClose={() => setEditData(null)}
      >
        <ParentEntityEdit
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

export default ParentEntityList;

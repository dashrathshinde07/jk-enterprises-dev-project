import React, { useEffect, useState } from "react";
import {
  getAllSectionItems,
  deleteSectionItem,
} from "../../api/sectionItemApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TableActions from "../../components/TableActions";
import SectionItemForm from "./SectionItemForm";
import SectionItemEdit from "./SectionItemEdit";

const SectionItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllSectionItems();
      setItems(res.data || res);
    } catch (err) {
      console.error("Error loading section items", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await deleteSectionItem(id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2C498D]">Section Items</h2>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[#2C498D] text-white px-4 py-2 rounded"
        >
          Add Item
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
                <th className="p-3">Title (EN)</th>
                <th className="p-3">Title (MR)</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={item.image}
                      alt=""
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{item.title_en}</td>
                  <td className="p-3">{item.title_mr}</td>
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

      <Modal title="Add Section Item" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <SectionItemForm onSuccess={() => {
          setShowAdd(false);
          fetchData();
        }} />
      </Modal>

      <Modal title="Edit Section Item" isOpen={!!editData} onClose={() => setEditData(null)}>
        <SectionItemEdit data={editData} onSuccess={() => {
          setEditData(null);
          fetchData();
        }} />
      </Modal>
    </div>
  );
};

export default SectionItemList;

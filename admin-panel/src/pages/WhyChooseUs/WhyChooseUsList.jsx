import React, { useEffect, useState } from "react";
import { getAllWhyChooseUs, deleteWhyChooseUs } from "../../api/whyChooseUsApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TableActions from "../../components/TableActions";
import WhyChooseUsForm from "./WhyChooseUsForm";
import WhyChooseUsEdit from "./WhyChooseUsEdit";

const WhyChooseUsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllWhyChooseUs();
      setItems(res.data || res);
    } catch (err) {
      console.error("Failed to fetch WhyChooseUs items:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await deleteWhyChooseUs(id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2C498D]">Why Choose Us</h2>
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
                <th className="p-3">Icon</th>
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
                      src={item.icon}
                      alt=""
                      className="w-12 h-12 object-cover"
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

      <Modal
        title="Add Why Choose Us"
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
      >
        <WhyChooseUsForm
          onSuccess={() => {
            setShowAdd(false);
            fetchData();
          }}
        />
      </Modal>

      <Modal
        title="Edit Why Choose Us"
        isOpen={!!editData}
        onClose={() => setEditData(null)}
      >
        <WhyChooseUsEdit
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

export default WhyChooseUsList;

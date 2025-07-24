import React, { useEffect, useState } from "react";
import {
  getFooter,
  deleteFooterById,
} from "../../api/footerApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TableActions from "../../components/TableActions";
import FooterForm from "./FooterForm";
import FooterEdit from "./FooterEdit";

const FooterList = () => {
  const [footerData, setFooterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getFooter();
      setFooterData(res.data);
    } catch (err) {
      console.error("Failed to fetch footer data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this footer entry?")) {
      await deleteFooterById(id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#2C498D]">Footer Section</h2>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[#2C498D] text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          + Add Footer
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Logo</th>
              <th className="px-4 py-2 border">About (EN)</th>
              <th className="px-4 py-2 border">About (MR)</th>
              <th className="px-4 py-2 border">Address (EN)</th>
              <th className="px-4 py-2 border">Address (MR)</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {footerData.length > 0 ? (
              footerData.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2 border">
                    <img
                      src={item.logo?.url}
                      alt="logo"
                      className="w-16 h-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border">{item.about?.en}</td>
                  <td className="px-4 py-2 border">{item.about?.mr}</td>
                  <td className="px-4 py-2 border">{item.address?.en}</td>
                  <td className="px-4 py-2 border">{item.address?.mr}</td>
                  <td className="px-4 py-2 border">{item.phone}</td>
                  <td className="px-4 py-2 border">{item.email}</td>
                  <td className="px-4 py-2 border">
                    <TableActions
                      onEdit={() => setEditItem(item)}
                      onDelete={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-4 text-center border" colSpan="8">
                  No footer entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <FooterForm onSuccess={() => {
          setShowAdd(false);
          fetchData();
        }} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editItem} onClose={() => setEditItem(null)}>
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
    </div>
  );
};

export default FooterList;

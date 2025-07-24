import React, { useEffect, useState } from "react";
import {
  getAllPromoBanners,
  deletePromoBanner,
} from "../../api/promoBannerApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TableActions from "../../components/TableActions";
import PromoBannerForm from "./PromoBannerForm";
import PromoBannerEdit from "./PromoBannerEdit";

const PromoBannerList = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllPromoBanners();
      setBanners(res.data || res);
    } catch (err) {
      console.error("Error fetching promo banners", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      await deletePromoBanner(id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2C498D]">Promo Banners</h2>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[#2C498D] text-white px-4 py-2 rounded"
        >
          Add Banner
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
              {banners.map((banner) => (
                <tr key={banner._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={banner.image}
                      alt=""
                      className="w-24 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{banner.title_en}</td>
                  <td className="p-3">{banner.title_mr}</td>
                  <td className="p-3">
                    <TableActions
                      onEdit={() => setEditData(banner)}
                      onDelete={() => handleDelete(banner._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal title="Add Promo Banner" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <PromoBannerForm onSuccess={() => {
          setShowAdd(false);
          fetchData();
        }} />
      </Modal>

      <Modal title="Edit Promo Banner" isOpen={!!editData} onClose={() => setEditData(null)}>
        <PromoBannerEdit data={editData} onSuccess={() => {
          setEditData(null);
          fetchData();
        }} />
      </Modal>
    </div>
  );
};

export default PromoBannerList;

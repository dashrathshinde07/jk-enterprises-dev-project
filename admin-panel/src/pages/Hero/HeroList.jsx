import React, { useEffect, useState } from "react";
import {
  getAllHeroes,
  deleteHeroById,
} from "../../api/heroApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TableActions from "../../components/TableActions";
import HeroForm from "./HeroForm";
import HeroEdit from "./HeroEdit";

const HeroList = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchHeroes = async () => {
    setLoading(true);
    try {
      const res = await getAllHeroes();
      setHeroes(res.data || res);
    } catch (err) {
      console.error("Error fetching heroes", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this banner?")) {
      await deleteHeroById(id);
      fetchHeroes();
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2C498D]">Hero Banners</h2>
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
              {heroes.map((hero) => (
                <tr key={hero._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={hero.image}
                      alt=""
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{hero.title_en}</td>
                  <td className="p-3">{hero.title_mr}</td>
                  <td className="p-3">
                    <TableActions
                      onEdit={() => setEditData(hero)}
                      onDelete={() => handleDelete(hero._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal title="Add Banner" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <HeroForm onSuccess={() => {
          setShowAdd(false);
          fetchHeroes();
        }} />
      </Modal>

      <Modal title="Edit Banner" isOpen={!!editData} onClose={() => setEditData(null)}>
        <HeroEdit data={editData} onSuccess={() => {
          setEditData(null);
          fetchHeroes();
        }} />
      </Modal>
    </div>
  );
};

export default HeroList;

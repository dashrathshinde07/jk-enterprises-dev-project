import React, { useEffect, useState } from "react";
import {
  getTrendingProducts,
  deleteTrendingProduct,
} from "../../api/trendingProductApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import TableActions from "../../components/TableActions";
import TrendingProductForm from "./TrendingProductForm";
import TrendingProductEdit from "./TrendingProductEdit";

const TrendingProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getTrendingProducts();
      setProducts(res.data || res);
    } catch (err) {
      console.error("Error loading trending products", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteTrendingProduct(id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2C498D]">Trending Products</h2>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[#2C498D] text-white px-4 py-2 rounded"
        >
          Add Product
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
              {products.map((item) => (
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

      <Modal title="Add Trending Product" isOpen={showAdd} onClose={() => setShowAdd(false)}>
        <TrendingProductForm onSuccess={() => {
          setShowAdd(false);
          fetchData();
        }} />
      </Modal>

      <Modal title="Edit Trending Product" isOpen={!!editData} onClose={() => setEditData(null)}>
        <TrendingProductEdit data={editData} onSuccess={() => {
          setEditData(null);
          fetchData();
        }} />
      </Modal>
    </div>
  );
};

export default TrendingProductList;

import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  deleteProduct,
  softDeleteProduct,
} from "../../api/productApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import ProductForm from "./ProductForm";
import ProductEdit from "./ProductEdit";
import TableActions from "../../components/TableActions";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts();
      setProducts(res.data || res);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      fetchData();
    }
  };

  const handleSoftDelete = async (id) => {
    if (window.confirm("Archive this product?")) {
      await softDeleteProduct(id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2C498D]">Products</h2>
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
                <th className="p-3">Images</th>
                <th className="p-3">Title (EN)</th>
                <th className="p-3">Title (MR)</th>
                <th className="p-3">Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="p-3 flex gap-1">
                    {p.images?.slice(0, 2).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-12 h-12 object-cover rounded"
                      />
                    ))}
                  </td>
                  <td className="p-3">{p.title_en}</td>
                  <td className="p-3">{p.title_mr}</td>
                  <td className="p-3">{p.price}</td>
                  <td className="p-3 flex gap-2">
                    <TableActions
                      onEdit={() => setEditData(p)}
                      onDelete={() => handleDelete(p._id)}
                    />
                    <button
                      onClick={() => handleSoftDelete(p._id)}
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
        title="Add Product"
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
      >
        <ProductForm
          onSuccess={() => {
            setShowAdd(false);
            fetchData();
          }}
        />
      </Modal>

      <Modal
        title="Edit Product"
        isOpen={!!editData}
        onClose={() => setEditData(null)}
      >
        <ProductEdit
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

export default ProductList;

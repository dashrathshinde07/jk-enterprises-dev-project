import React, { useEffect, useState } from "react";
import { updateProduct } from "../../api/productApi";
import { getAllCategories } from "../../api/categoryApi";
import LanguageTabs from "../../components/LanguageTabs";

const ProductEdit = ({ data, onSuccess }) => {
  const [lang, setLang] = useState("en");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title_en: "",
    title_mr: "",
    description_en: "",
    description_mr: "",
    price: "",
    categoryId: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        title_en: data.title_en,
        title_mr: data.title_mr,
        description_en: data.description_en,
        description_mr: data.description_mr,
        price: data.price,
        categoryId: data.categoryId,
      });
    }
    setImages(data?.images || []);
    getAllCategories().then((res) => setCategories(res.data || res));
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(data._id, { ...form, images });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LanguageTabs lang={lang} setLang={setLang} />

      <input
        type="text"
        name={`title_${lang}`}
        placeholder="Title"
        value={form[`title_${lang}`]}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <textarea
        name={`description_${lang}`}
        placeholder="Description"
        rows={3}
        value={form[`description_${lang}`]}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name_en}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="block border rounded px-3 py-2"
      />

      <div className="text-right">
        <button
          type="submit"
          className="bg-[#2C498D] text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default ProductEdit;

import React, { useEffect, useState } from "react";
import { updateCategory } from "../../api/categoryApi";
import { getAllParentEntities } from "../../api/parentEntityApi";
import ImageUploader from "../../components/ImageUploader";
import LanguageTabs from "../../components/LanguageTabs";

const CategoryEdit = ({ data, onSuccess }) => {
  const [lang, setLang] = useState("en");
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    name_en: "",
    name_mr: "",
    parentEntity: "",
  });
  const [parents, setParents] = useState([]);

  useEffect(() => {
    if (data) {
      setForm({
        name_en: data.name_en,
        name_mr: data.name_mr,
        parentEntity: data.parentEntity || "",
      });
      setImage(data.image);
    }

    getAllParentEntities().then((res) => {
      setParents(res.data || res);
    });
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCategory(data._id, { ...form, image });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LanguageTabs lang={lang} setLang={setLang} />

      <div>
        <label className="block mb-1 text-sm font-medium">Name</label>
        <input
          type="text"
          name={`name_${lang}`}
          value={form[`name_${lang}`]}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Parent Entity</label>
        <select
          name="parentEntity"
          value={form.parentEntity}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select</option>
          {parents.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <ImageUploader image={image} setImage={setImage} />

      <div className="text-right">
        <button type="submit" className="bg-[#2C498D] text-white px-4 py-2 rounded">
          Update
        </button>
      </div>
    </form>
  );
};

export default CategoryEdit;

import React, { useState } from "react";
import { createTrendingProduct } from "../../api/trendingProductApi";
import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";

const TrendingProductForm = ({ onSuccess }) => {
  const [lang, setLang] = useState("en");
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    title_en: "",
    title_mr: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTrendingProduct({ ...form, image });
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

      <ImageUploader image={image} setImage={setImage} />

      <div className="text-right">
        <button type="submit" className="bg-[#2C498D] text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default TrendingProductForm;

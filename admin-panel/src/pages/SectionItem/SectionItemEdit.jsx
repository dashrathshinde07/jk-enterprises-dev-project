import React, { useState, useEffect } from "react";
import { updateSectionItem } from "../../api/sectionItemApi";
import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";

const SectionItemEdit = ({ data, onSuccess }) => {
  const [lang, setLang] = useState("en");
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    title_en: "",
    title_mr: "",
    subtitle_en: "",
    subtitle_mr: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        title_en: data.title_en || "",
        title_mr: data.title_mr || "",
        subtitle_en: data.subtitle_en || "",
        subtitle_mr: data.subtitle_mr || "",
      });
      setImage(data.image || null);
    }
  }, [data]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSectionItem(data._id, { ...form, image });
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
        name={`subtitle_${lang}`}
        placeholder="Subtitle"
        value={form[`subtitle_${lang}`]}
        onChange={handleChange}
        rows={2}
        className="w-full border px-3 py-2 rounded"
      />

      <ImageUploader image={image} setImage={setImage} />

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

export default SectionItemEdit;

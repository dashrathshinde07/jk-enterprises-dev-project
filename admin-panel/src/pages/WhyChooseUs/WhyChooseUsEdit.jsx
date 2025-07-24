import React, { useEffect, useState } from "react";
import { updateWhyChooseUs } from "../../api/whyChooseUsApi";
import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";

const WhyChooseUsEdit = ({ data, onSuccess }) => {
  const [lang, setLang] = useState("en");
  const [icon, setIcon] = useState(null);
  const [form, setForm] = useState({
    title_en: "",
    title_mr: "",
    description_en: "",
    description_mr: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        title_en: data.title_en,
        title_mr: data.title_mr,
        description_en: data.description_en,
        description_mr: data.description_mr,
      });
      setIcon(data.icon);
    }
  }, [data]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateWhyChooseUs(data._id, { ...form, icon });
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
        value={form[`description_${lang}`]}
        onChange={handleChange}
        rows={2}
        className="w-full border px-3 py-2 rounded"
      />

      <ImageUploader image={icon} setImage={setIcon} label="Update Icon" />

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

export default WhyChooseUsEdit;

import React, { useState } from "react";
import { createReview } from "../../api/reviewApi";
import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";

const ReviewForm = ({ onSuccess }) => {
  const [lang, setLang] = useState("en");
  const [profileImage, setProfileImage] = useState(null);
  const [form, setForm] = useState({
    name_en: "",
    name_mr: "",
    comment_en: "",
    comment_mr: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview({ ...form, profileImage });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LanguageTabs lang={lang} setLang={setLang} />

      <input
        type="text"
        name={`name_${lang}`}
        placeholder="Name"
        value={form[`name_${lang}`]}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <textarea
        name={`comment_${lang}`}
        placeholder="Comment"
        rows={3}
        value={form[`comment_${lang}`]}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <ImageUploader image={profileImage} setImage={setProfileImage} />

      <div className="text-right">
        <button type="submit" className="bg-[#2C498D] text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;

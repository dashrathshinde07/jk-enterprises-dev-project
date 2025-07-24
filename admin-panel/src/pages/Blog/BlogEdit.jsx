import React, { useState, useEffect } from "react";
import { updateBlog } from "../../api/blogApi";
import ImageUploader from "../../components/ImageUploader";
import LanguageTabs from "../../components/LanguageTabs";

const BlogEdit = ({ data, onSuccess }) => {
  const [lang, setLang] = useState("en");
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    title_en: "",
    title_mr: "",
    description_en: "",
    description_mr: "",
    category_en: "",
    category_mr: "",
    authorName: "",
    publishedDate: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        title_en: data.title_en || "",
        title_mr: data.title_mr || "",
        description_en: data.description_en || "",
        description_mr: data.description_mr || "",
        category_en: data.category_en || "",
        category_mr: data.category_mr || "",
        authorName: data.authorName || "",
        publishedDate: data.publishedDate?.substring(0, 10) || "",
      });
      setImage(data.image || null);
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBlog(data._id, { ...form, image });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LanguageTabs lang={lang} setLang={setLang} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name={`title_${lang}`}
            value={form[`title_${lang}`]}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            name={`category_${lang}`}
            value={form[`category_${lang}`]}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name={`description_${lang}`}
          value={form[`description_${lang}`]}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Author</label>
          <input
            type="text"
            name="authorName"
            value={form.authorName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Published Date</label>
          <input
            type="date"
            name="publishedDate"
            value={form.publishedDate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

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

export default BlogEdit;

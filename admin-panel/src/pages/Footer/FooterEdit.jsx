import React, { useState } from "react";
import { updateFooterById } from "../../api/footerApi";
import ImageUploader from "../../components/ImageUploader";
import LanguageTabs from "../../components/LanguageTabs";

const FooterEdit = ({ data, onSuccess }) => {
  const [form, setForm] = useState({
    title_en: data.title_en || "",
    title_mr: data.title_mr || "",
    description_en: data.description_en || "",
    description_mr: data.description_mr || "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file) => {
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFooterById(data._id, form);
      onSuccess();
    } catch (err) {
      console.error("Failed to update footer:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LanguageTabs
        tabs={[
          {
            label: "English",
            content: (
              <>
                <input
                  type="text"
                  name="title_en"
                  value={form.title_en}
                  onChange={handleChange}
                  placeholder="Title (EN)"
                  className="input"
                  required
                />
                <textarea
                  name="description_en"
                  value={form.description_en}
                  onChange={handleChange}
                  placeholder="Description (EN)"
                  className="textarea"
                />
              </>
            ),
          },
          {
            label: "Marathi",
            content: (
              <>
                <input
                  type="text"
                  name="title_mr"
                  value={form.title_mr}
                  onChange={handleChange}
                  placeholder="शीर्षक (MR)"
                  className="input"
                />
                <textarea
                  name="description_mr"
                  value={form.description_mr}
                  onChange={handleChange}
                  placeholder="वर्णन (MR)"
                  className="textarea"
                />
              </>
            ),
          },
        ]}
      />

      <ImageUploader
        onChange={handleImageChange}
        existingImage={data.image?.url}
      />

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary">
          Update Footer
        </button>
      </div>
    </form>
  );
};

export default FooterEdit;

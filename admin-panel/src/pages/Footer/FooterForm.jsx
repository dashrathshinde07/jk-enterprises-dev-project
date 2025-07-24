import React, { useState } from "react";
import { updateFooterById, createFooter } from "../../api/footerApi";
import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";

const FooterForm = ({ data, onSuccess }) => {
  const [lang, setLang] = useState("en");
  const [logo, setLogo] = useState(data?.logo || null);
  const [form, setForm] = useState({
    address_en: data?.address_en || "",
    address_mr: data?.address_mr || "",
    email: data?.email || "",
    phone: data?.phone || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form, logo };
    if (data?._id) {
      await updateFooterById(data._id, payload);
    } else {
      await createFooter(payload);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white border rounded p-6">
      <LanguageTabs lang={lang} setLang={setLang} />

      <div>
        <label className="block text-sm mb-1 font-medium">Address</label>
        <textarea
          name={`address_${lang}`}
          value={form[`address_${lang}`]}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <ImageUploader image={logo} setImage={setLogo} />

      <div className="text-right">
        <button type="submit" className="bg-[#2C498D] text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default FooterForm;

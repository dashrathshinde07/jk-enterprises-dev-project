import React, { useEffect, useState } from "react";
import { updateWhyChooseUs } from "../../api/whyChooseUsApi";
// import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

const WhyChooseUsEdit = ({ data, onSuccess }) => {
  // const [lang, setLang] = useState("en");
  const [icon, setIcon] = useState(null);
  const [form, setForm] = useState({
    title_en: "",
    title_mr: "",
    description_en: "",
    description_mr: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        title_en: data.title?.en || "",
        title_mr: data.title?.mr || "",
        description_en: data.description?.en || "",
        description_mr: data.description?.mr || "",
      });
      setIcon(data.icon);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate English title
    if (!form.title_en.trim()) {
      newErrors.title_en = "English title is required";
    } else if (form.title_en.trim().length < 3) {
      newErrors.title_en = "Title must be at least 3 characters long";
    }

    // Validate Marathi title
    if (!form.title_mr.trim()) {
      newErrors.title_mr = "Marathi title is required";
    } else if (form.title_mr.trim().length < 3) {
      newErrors.title_mr = "Title must be at least 3 characters long";
    }

    // Validate English description
    if (!form.description_en.trim()) {
      newErrors.description_en = "English description is required";
    } else if (form.description_en.trim().length < 10) {
      newErrors.description_en = "Description must be at least 10 characters long";
    } else if (form.description_en.trim().length > 500) {
      newErrors.description_en = "Description must not exceed 500 characters";
    }

    // Validate Marathi description
    if (!form.description_mr.trim()) {
      newErrors.description_mr = "Marathi description is required";
    } else if (form.description_mr.trim().length < 10) {
      newErrors.description_mr = "Description must be at least 10 characters long";
    } else if (form.description_mr.trim().length > 500) {
      newErrors.description_mr = "Description must not exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await updateWhyChooseUs(data._id, { ...form, icon });
      toast.success('✅ Why Choose Us updated successfully!');
      onSuccess();
    } catch (error) {
      console.error("Error updating why choose us:", error);

      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while updating the entry.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Language Tabs */}
        {/* <div className="flex justify-center">
          <LanguageTabs lang={lang} setLang={setLang} />
        </div> */}

        {/* Title Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Title</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title (English) *</label>
              <input
                type="text"
                name="title_en"
                value={form.title_en}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.title_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter title in english"
              />
              {errors.title_en && (
                <p className="text-red-500 text-sm mt-1">{errors.title_en}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title (मराठी) *</label>
              <input
                type="text"
                name="title_mr"
                value={form.title_mr}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.title_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत शीर्षक टाका"
              />
              {errors.title_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.title_mr}</p>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Description</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Description (English) *</label>
              <textarea
                name="description_en"
                value={form.description_en}
                onChange={handleChange}
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.description_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter description in english"
              />
              {errors.description_en && (
                <p className="text-red-500 text-sm mt-1">{errors.description_en}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description (मराठी) *</label>
              <textarea
                name="description_mr"
                value={form.description_mr}
                onChange={handleChange}
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.description_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत वर्णन टाका"
              />
              {errors.description_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.description_mr}</p>
              )}
            </div>
          </div>
        </div>

        <ImageUploader image={icon} setImage={setIcon} />

        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 w-full rounded text-white font-medium cursor-pointer ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2C498D] hover:bg-[#1e3a7a]'
              }`}
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WhyChooseUsEdit;
import React, { useState, useEffect } from "react";
import { updateSectionItem } from "../../api/sectionItemApi";
import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

const SectionItemEdit = ({ data, onSuccess }) => {
  // const [lang, setLang] = useState("en");
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    title_en: "",
    title_mr: "",
    subtitle_en: "",
    subtitle_mr: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("data", data);

  useEffect(() => {
    if (data) {
      setForm({
        title_en: data.title?.en || "",
        title_mr: data.title?.mr || "",
        subtitle_en: data.description?.en || data.subtitle?.en || "",
        subtitle_mr: data.description?.mr || data.subtitle?.mr || "",
      });
      setImage(data.image || data.imageUrl || null);
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

  // const validateForm = () => {
  //   const newErrors = {};

  //   // Title validation
  //   if (!form.title_en.trim()) {
  //     newErrors.title_en = "English title is required";
  //   } else if (form.title_en.trim().length < 3) {
  //     newErrors.title_en = "Title must be at least 3 characters long";
  //   }

  //   if (!form.title_mr.trim()) {
  //     newErrors.title_mr = "Marathi title is required";
  //   } else if (form.title_mr.trim().length < 3) {
  //     newErrors.title_mr = "Title must be at least 3 characters long";
  //   }

  //   // Subtitle validation
  //   if (!form.subtitle_en.trim()) {
  //     newErrors.subtitle_en = "English subtitle is required";
  //   } else if (form.subtitle_en.trim().length < 5) {
  //     newErrors.subtitle_en = "Subtitle must be at least 5 characters long";
  //   } else if (form.subtitle_en.trim().length > 300) {
  //     newErrors.subtitle_en = "Subtitle must not exceed 300 characters";
  //   }

  //   if (!form.subtitle_mr.trim()) {
  //     newErrors.subtitle_mr = "Marathi subtitle is required";
  //   } else if (form.subtitle_mr.trim().length < 5) {
  //     newErrors.subtitle_mr = "Subtitle must be at least 5 characters long";
  //   } else if (form.subtitle_mr.trim().length > 300) {
  //     newErrors.subtitle_mr = "Subtitle must not exceed 300 characters";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   toast.error("Please fix the validation errors", {
    //     autoClose: 3000,
    //   });
    //   return;
    // }

    setIsSubmitting(true);
    const toastId = toast.loading("Updating section item...");

    try {
      await updateSectionItem(data._id, { ...form, image });

      toast.update(toastId, {
        render: "✅ Section item updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      onSuccess();
    } catch (error) {
      console.error("Error updating section item:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";

      toast.update(toastId, {
        render: `❌ ${errorMessage}`,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Language Tabs Section */}
        {/* <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Language Selection</h3>
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
                className={`w-full border rounded px-3 py-2 ${errors.title_en ? 'border-red-500' : 'border-gray-300'}`}
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
                className={`w-full border rounded px-3 py-2 ${errors.title_mr ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="मराठीत शीर्षक टाका"
              />
              {errors.title_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.title_mr}</p>
              )}
            </div>
          </div>
        </div>

        {/* Subtitle Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Subtitle</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle (English) *</label>
              <textarea
                name="subtitle_en"
                value={form.subtitle_en}
                onChange={handleChange}
                rows={3}
                className={`w-full border rounded px-3 py-2 ${errors.subtitle_en ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter subtitle in english"
              />
              {errors.subtitle_en && (
                <p className="text-red-500 text-sm mt-1">{errors.subtitle_en}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {form.subtitle_en.length}/300 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subtitle (मराठी) *</label>
              <textarea
                name="subtitle_mr"
                value={form.subtitle_mr}
                onChange={handleChange}
                rows={3}
                className={`w-full border rounded px-3 py-2 ${errors.subtitle_mr ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="मराठीत उपशीर्षक टाका"
              />
              {errors.subtitle_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.subtitle_mr}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {form.subtitle_mr.length}/300 characters
              </p>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Section Image</h3>
          <ImageUploader image={image} setImage={setImage} />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 w-full rounded text-white font-medium transition-colors duration-200 ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2C498D] hover:bg-[#1e3a7a]'
              }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Section Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SectionItemEdit;
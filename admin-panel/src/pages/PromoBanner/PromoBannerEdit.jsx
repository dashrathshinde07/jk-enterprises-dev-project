import React, { useEffect, useState, useCallback, useMemo } from "react";
import { updatePromoBanner } from "../../api/promoBannerApi";
import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

// Custom hook for form handling
const useFormData = () => {
  const [formData, setFormData] = useState({
    title_en: "",
    title_mr: "",
    subtitle_en: "",
    subtitle_mr: "",
    tagline_en: "",
    tagline_mr: "",
    ctaText_en: "",
    ctaText_mr: "",
    ctaLink: "",
  });

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const resetForm = useCallback((data) => {
    setFormData(prevData => {
      const newData = {
        title_en: "",
        title_mr: "",
        subtitle_en: "",
        subtitle_mr: "",
        tagline_en: "",
        tagline_mr: "",
        ctaText_en: "",
        ctaText_mr: "",
        ctaLink: "",
        ...data
      };

      // Only update if data has actually changed
      const hasChanged = Object.keys(newData).some(key => newData[key] !== prevData[key]);
      return hasChanged ? newData : prevData;
    });
  }, []);

  return { formData, updateField, resetForm };
};

const PromoBannerEdit = ({ data, onSuccess }) => {
  // const [lang, setLang] = useState("en");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { formData, updateField, resetForm } = useFormData();

  // Memoize the data processing to prevent unnecessary updates
  const processedData = useMemo(() => {
    if (!data) return null;

    return {
      title_en: data.title_en || data.title?.en || "",
      title_mr: data.title_mr || data.title?.mr || "",
      subtitle_en: data.subtitle_en || data.subtitle?.en || "",
      subtitle_mr: data.subtitle_mr || data.subtitle?.mr || "",
      tagline_en: data.tagline_en || data.tagline?.en || "",
      tagline_mr: data.tagline_mr || data.tagline?.mr || "",
      ctaText_en: data.ctaText_en || data.ctaText?.en || "",
      ctaText_mr: data.ctaText_mr || data.ctaText?.mr || "",
      ctaLink: data.ctaLink || "",
    };
  }, [data]);

  useEffect(() => {
    if (processedData) {
      resetForm(processedData);
      setImage(data.image || data.imageUrl);
    }
  }, [processedData, resetForm, data]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    updateField(name, value);

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  }, [updateField, errors]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.title_en || formData.title_en.trim().length < 3) {
      newErrors.title_en = formData.title_en ? "Title must be at least 3 characters long" : "English title is required";
    }
    if (!formData.title_mr || formData.title_mr.trim().length < 3) {
      newErrors.title_mr = formData.title_mr ? "Title must be at least 3 characters long" : "Marathi title is required";
    }

    // URL validation
    if (formData.ctaLink && formData.ctaLink.trim()) {
      const urlPattern = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
      if (!urlPattern.test(formData.ctaLink.trim())) {
        newErrors.ctaLink = "Please enter a valid URL starting with http:// or https://";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating promo banner...");

    try {
      await updatePromoBanner(data._id, { ...formData, image });

      toast.update(toastId, {
        render: "Promo banner updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      onSuccess();
    } catch (error) {
      console.error("Error updating banner:", error);

      toast.update(toastId, {
        render: error?.response?.data?.message || "Failed to update promo banner.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit} className="space-y-6">
    
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Title</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title (English) *</label>
              <input
                type="text"
                name="title_en"
                value={formData.title_en || ""}
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
                value={formData.title_mr || ""}
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
              <label className="block text-sm font-medium mb-1">Subtitle (English)</label>
              <input
                type="text"
                name="subtitle_en"
                value={formData.subtitle_en || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="Enter subtitle in english"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subtitle (मराठी)</label>
              <input
                type="text"
                name="subtitle_mr"
                value={formData.subtitle_mr || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="मराठीत उपशीर्षक टाका"
              />
            </div>
          </div>
        </div>

        {/* Tagline Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Tagline</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tagline (English)</label>
              <textarea
                name="tagline_en"
                value={formData.tagline_en || ""}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="Enter tagline in english"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tagline (मराठी)</label>
              <textarea
                name="tagline_mr"
                value={formData.tagline_mr || ""}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="मराठीत टॅगलाइन टाका"
              />
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Call to Action</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">CTA Text (English)</label>
              <input
                type="text"
                name="ctaText_en"
                value={formData.ctaText_en || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="Enter CTA text in english"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CTA Text (मराठी)</label>
              <input
                type="text"
                name="ctaText_mr"
                value={formData.ctaText_mr || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="मराठीत CTA मजकूर टाका"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CTA Link</label>
            <input
              type="url"
              name="ctaLink"
              value={formData.ctaLink || ""}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${errors.ctaLink ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="https://example.com"
            />
            {errors.ctaLink && (
              <p className="text-red-500 text-sm mt-1">{errors.ctaLink}</p>
            )}
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Banner Image</h3>
          <ImageUploader image={image} setImage={setImage} />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 w-full rounded text-white font-medium cursor-pointer ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2C498D] hover:bg-[#1e3a7a]'
              }`}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromoBannerEdit;
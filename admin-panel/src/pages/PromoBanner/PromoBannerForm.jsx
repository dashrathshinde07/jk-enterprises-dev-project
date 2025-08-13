import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createPromoBanner } from "../../api/promoBannerApi";
import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

const PromoBannerForm = ({ onSuccess }) => {
  const [lang, setLang] = useState("en");
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title_en: "",
      title_mr: "",
      subtitle_en: "",
      subtitle_mr: "",
      tagline_en: "",
      tagline_mr: "",
      ctaText_en: "",
      ctaText_mr: "",
      ctaLink: "",
    }
  });

  const onSubmit = async (data) => {
    try {
      await createPromoBanner({ ...data, image });
      toast.success('✅ Promo banner created successfully!');
      reset();
      setImage(null);
      onSuccess();
    } catch (error) {
      console.error("Error creating promo banner:", error);

      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while creating the promo banner.');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Language Tabs Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Language Selection</h3>
          <LanguageTabs lang={lang} setLang={setLang} />
        </div>

        {/* Title Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Title</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title (English) *</label>
              <input
                type="text"
                {...register("title_en", {
                  required: "English title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.title_en ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter title in english"
              />
              {errors.title_en && (
                <p className="text-red-500 text-sm mt-1">{errors.title_en.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title (मराठी) *</label>
              <input
                type="text"
                {...register("title_mr", {
                  required: "Marathi title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.title_mr ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="मराठीत शीर्षक टाका"
              />
              {errors.title_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.title_mr.message}</p>
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
                {...register("subtitle_en")}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="Enter subtitle in english"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subtitle (मराठी)</label>
              <input
                type="text"
                {...register("subtitle_mr")}
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
                {...register("tagline_en")}
                rows={3}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="Enter tagline in english"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tagline (मराठी)</label>
              <textarea
                {...register("tagline_mr")}
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
                {...register("ctaText_en")}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="Enter CTA text in english"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CTA Text (मराठी)</label>
              <input
                type="text"
                {...register("ctaText_mr")}
                className="w-full border rounded px-3 py-2 border-gray-300"
                placeholder="मराठीत CTA मजकूर टाका"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CTA Link</label>
            <input
              type="url"
              {...register("ctaLink", {
                pattern: {
                  value: /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
                  message: "Please enter a valid URL starting with http:// or https://"
                }
              })}
              className={`w-full border rounded px-3 py-2 ${errors.ctaLink ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="https://example.com"
            />
            {errors.ctaLink && (
              <p className="text-red-500 text-sm mt-1">{errors.ctaLink.message}</p>
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
            disabled={isSubmitting}
            className={`px-6 py-2 w-full rounded text-white font-medium ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2C498D] hover:bg-[#1e3a7a]'
              }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromoBannerForm;
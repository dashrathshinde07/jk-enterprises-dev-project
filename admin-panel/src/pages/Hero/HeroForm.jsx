import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createHero } from "../../api/heroApi";
// import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

const HeroForm = ({ onSuccess }) => {
  // const [lang, setLang] = useState("");
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      headline_en: "",
      headline_mr: "",
      subHeadline_en: "",
      subHeadline_mr: "",
      buttonText_en: "",
      buttonText_mr: "",
      buttonLink: "",
    }
  });

  const onSubmit = async (data) => {
    try {
      await createHero({ ...data, image });
      toast.success('✅ Hero created successfully!');
      reset();
      setImage(null);
      onSuccess();
    } catch (error) {
      console.error("Error creating hero:", error);

      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while creating the hero.');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Language Tabs */}
        {/* <div className="flex justify-center">
          <LanguageTabs lang={lang} setLang={setLang} />
        </div> */}

        {/* Headline Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Headline</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Headline (English) *</label>
              <input
                type="text"
                {...register("headline_en", {
                  required: "English headline is required",
                  minLength: {
                    value: 3,
                    message: "Headline must be at least 3 characters long"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.headline_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter headline in english"
              />
              {errors.headline_en && (
                <p className="text-red-500 text-sm mt-1">{errors.headline_en.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Headline (मराठी) *</label>
              <input
                type="text"
                {...register("headline_mr", {
                  required: "Marathi headline is required",
                  minLength: {
                    value: 3,
                    message: "Headline must be at least 3 characters long"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.headline_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत हेडलाइन टाका"
              />
              {errors.headline_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.headline_mr.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sub Headline Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Sub Headline</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sub Headline (English) *</label>
              <textarea
                {...register("subHeadline_en", {
                  required: "English sub headline is required",
                  minLength: {
                    value: 10,
                    message: "Sub headline must be at least 10 characters long"
                  }
                })}
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.subHeadline_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter sub headline in english"
              />
              {errors.subHeadline_en && (
                <p className="text-red-500 text-sm mt-1">{errors.subHeadline_en.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sub Headline (मराठी) *</label>
              <textarea
                {...register("subHeadline_mr", {
                  required: "Marathi sub headline is required",
                  minLength: {
                    value: 10,
                    message: "Sub headline must be at least 10 characters long"
                  }
                })}
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.subHeadline_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत सब हेडलाइन टाका"
              />
              {errors.subHeadline_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.subHeadline_mr.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Button Text Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Button Text</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Button Text (English) *</label>
              <input
                type="text"
                {...register("buttonText_en", {
                  required: "English button text is required",
                  minLength: {
                    value: 2,
                    message: "Button text must be at least 2 characters long"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.buttonText_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter button text in english"
              />
              {errors.buttonText_en && (
                <p className="text-red-500 text-sm mt-1">{errors.buttonText_en.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Button Text (मराठी) *</label>
              <input
                type="text"
                {...register("buttonText_mr", {
                  required: "Marathi button text is required",
                  minLength: {
                    value: 2,
                    message: "Button text must be at least 2 characters long"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.buttonText_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत बटन टेक्स्ट टाका"
              />
              {errors.buttonText_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.buttonText_mr.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Button Link Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Button Link</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Button Link *</label>
            <input
              type="url"
              {...register("buttonLink", {
                required: "Button link is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Please enter a valid URL starting with http:// or https://"
                }
              })}
              className={`w-full border rounded px-3 py-2 ${errors.buttonLink ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="https://example.com"
            />
            {errors.buttonLink && (
              <p className="text-red-500 text-sm mt-1">{errors.buttonLink.message}</p>
            )}
          </div>
        </div>

        <ImageUploader image={image} setImage={setImage} />

        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 w-full rounded text-white font-medium cursor-pointer ${isSubmitting
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

export default HeroForm;
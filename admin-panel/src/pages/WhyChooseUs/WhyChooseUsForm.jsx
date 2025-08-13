import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createWhyChooseUs } from "../../api/whyChooseUsApi";
// import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

const WhyChooseUsForm = ({ onSuccess }) => {

  // const [lang, setLang] = useState("en");
  const [icon, setIcon] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title_en: "",
      title_mr: "",
      description_en: "",
      description_mr: "",
    }
  });

  const onSubmit = async (data) => {
    try {
      await createWhyChooseUs({ ...data, icon });
      toast.success('✅ Why Choose Us created successfully!');
      reset();
      setIcon(null);
      onSuccess();
    } catch (error) {
      console.error("Error creating why choose us:", error);

      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while creating the entry.');
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
                className={`w-full border rounded px-3 py-2 ${errors.title_en ? 'border-red-500' : 'border-gray-300'
                  }`}
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
                className={`w-full border rounded px-3 py-2 ${errors.title_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत शीर्षक टाका"
              />
              {errors.title_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.title_mr.message}</p>
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
                {...register("description_en", {
                  required: "English description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long"
                  },
                  maxLength: {
                    value: 500,
                    message: "Description must not exceed 500 characters"
                  }
                })}
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.description_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter description in english"
              />
              {errors.description_en && (
                <p className="text-red-500 text-sm mt-1">{errors.description_en.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description (मराठी) *</label>
              <textarea
                {...register("description_mr", {
                  required: "Marathi description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long"
                  },
                  maxLength: {
                    value: 500,
                    message: "Description must not exceed 500 characters"
                  }
                })}
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.description_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत वर्णन टाका"
              />
              {errors.description_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.description_mr.message}</p>
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
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WhyChooseUsForm;
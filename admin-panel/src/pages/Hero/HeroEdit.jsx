import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { updateHeroById } from "../../api/heroApi";
// import LanguageTabs from "../../components/LanguageTabs";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

const HeroEdit = ({ data, onSuccess }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      lang: "en",
      headline_en: "",
      headline_mr: "",
      subHeadline_en: "",
      subHeadline_mr: "",
      buttonText_en: "",
      buttonText_mr: "",
      buttonLink: "",
      image: null,

    }
  });

  // Watch current language
  // const currentLang = watch("lang");

  // Populate form when data changes
  useEffect(() => {
    if (data) {
      const formData = {
        lang: "en",
        headline_en: data.headline?.en || "",
        headline_mr: data.headline?.mr || "",
        subHeadline_en: data.subHeadline?.en || "",
        subHeadline_mr: data.subHeadline?.mr || "",
        buttonText_en: data.buttonText?.en || "",
        buttonText_mr: data.buttonText?.mr || "",
        buttonLink: data.buttonLink || "",
        image: data.backgroundImageUrl || null,
      };

      reset(formData);
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      const updateData = {
        headline: {
          en: formData.headline_en,
          mr: formData.headline_mr
        },
        subHeadline: {
          en: formData.subHeadline_en,
          mr: formData.subHeadline_mr
        },
        buttonText: {
          en: formData.buttonText_en,
          mr: formData.buttonText_mr
        },
        buttonLink: formData.buttonLink,
        backgroundImageUrl: formData.image,
        id: data._id,
      };

      await updateHeroById(updateData);
      toast.success('✅ Hero section updated successfully!');
      onSuccess();
    } catch (error) {
      console.error("Error updating hero:", error);

      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while updating the hero section.');
      }
    }
  }; 

  const handleImageChange = (newImage) => {
    setValue("image", newImage, { shouldDirty: true });
  };

  // Show loading state if data is not yet available
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Headlines Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Headlines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Headline (English) *
              </label>
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
              <label className="block text-sm font-medium mb-1">
                Headline (मराठी) *
              </label>
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
                placeholder="मराठीत शीर्षक टाका"
              />
              {errors.headline_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.headline_mr.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sub Headlines Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Sub Headlines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Sub Headline (English) *
              </label>
              <textarea
                {...register("subHeadline_en", {
                  required: "English sub headline is required",
                  minLength: {
                    value: 10,
                    message: "Sub headline must be at least 10 characters long"
                  },
                  maxLength: {
                    value: 200,
                    message: "Sub headline must not exceed 200 characters"
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
              <label className="block text-sm font-medium mb-1">
                Sub Headline (मराठी) *
              </label>
              <textarea
                {...register("subHeadline_mr", {
                  required: "Marathi sub headline is required",
                  minLength: {
                    value: 10,
                    message: "Sub headline must be at least 10 characters long"
                  },
                  maxLength: {
                    value: 200,
                    message: "Sub headline must not exceed 200 characters"
                  }
                })}
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.subHeadline_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत उप शीर्षक टाका"
              />
              {errors.subHeadline_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.subHeadline_mr.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Button Configuration Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Button Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Button Text (English) *
              </label>
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
              <label className="block text-sm font-medium mb-1">
                Button Text (मराठी) *
              </label>
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
                placeholder="मराठीत बटन मजकूर टाका"
              />
              {errors.buttonText_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.buttonText_mr.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Button Link *</label>
            <input
              type="url"
              {...register("buttonLink", {
                required: "Button link is required",
                pattern: {
                  value: /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i,
                  message: "Please enter a valid URL starting with http:// or https://",
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

        {/* Background Image Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Background Image</h3>

          {/* Current Image Preview */}
          {data.backgroundImageUrl && (
            <div>
              <label className="block text-sm font-medium mb-1">Current Background Image</label>
              <div className="border rounded p-4 border-gray-300">
                <img
                  src={data.backgroundImageUrl}
                  alt="Current hero background"
                  className="w-full h-32 object-cover rounded shadow-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Update Background Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded p-4">
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    image={field.value}
                    setImage={(newImage) => {
                      field.onChange(newImage);
                      handleImageChange(newImage);
                    }}
                  />
                )}
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Leave empty to keep current image
              </p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {/* <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Preview ({currentLang === "en" ? "English" : "मराठी"})
          </h3>
          <div className="bg-gray-50 rounded p-4">
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Headline:</span>
                <span className="ml-2 text-gray-600">
                  {watch(`headline_${currentLang}`) || "Not set"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Sub Headline:</span>
                <span className="ml-2 text-gray-600">
                  {watch(`subHeadline_${currentLang}`) || "Not set"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Button Text:</span>
                <span className="ml-2 text-gray-600">
                  {watch(`buttonText_${currentLang}`) || "Not set"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Button Link:</span>
                <span className="ml-2 text-gray-600 break-all">
                  {watch("buttonLink") || "Not set"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Background Image:</span>
                <span className="ml-2 text-gray-600">
                  {watch("image") ? "New image selected" : (data.backgroundImageUrl ? "Current image" : "No image")}
                </span>
              </div>
            </div>
          </div>
        </div> */}

        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 w-full rounded text-white font-medium cursor-pointer ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2C498D] hover:bg-[#1e3a7a]'
              }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Hero Section'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroEdit;
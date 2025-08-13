import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateTrendingProduct } from "../../api/trendingProductApi";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

const TrendingProductEdit = ({ data, onSuccess }) => {
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },    
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title_en: "",
      title_mr: "",
      category_en: "",
      category_mr: "",
      description_en: "",
      description_mr: "",
      buttonText_en: "",
      buttonText_mr: "",
      maxCapacity: "",
      isFeatured: false,
    }
  });

  // Watch values for character counters
  const watchedValues = watch();

  useEffect(() => {
    if (data) {
      // Set form values using setValue from react-hook-form
      setValue("title_en", data.title?.en || "");
      setValue("title_mr", data.title?.mr || "");
      setValue("category_en", data.category?.en || "");
      setValue("category_mr", data.category?.mr || "");
      setValue("description_en", data.description?.en || "");
      setValue("description_mr", data.description?.mr || "");
      setValue("buttonText_en", data.buttonText?.en || "");
      setValue("buttonText_mr", data.buttonText?.mr || "");
      setValue("maxCapacity", data.maxCapacity || "");
      setValue("isFeatured", data.isFeatured || false);

      // Set image
      setImage(data.imageUrl || data.image || null);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    try {
      // Transform flat form data back to nested structure for API
      const payload = {
        title: {
          en: formData.title_en,
          mr: formData.title_mr,
        },
        category: {
          en: formData.category_en,
          mr: formData.category_mr,
        },
        description: {
          en: formData.description_en,
          mr: formData.description_mr,
        },
        buttonText: {
          en: formData.buttonText_en,
          mr: formData.buttonText_mr,
        },
        maxCapacity: parseInt(formData.maxCapacity) || 0,
        isFeatured: formData.isFeatured,
        image: image,
      };

      await updateTrendingProduct(data?._id, payload);
      toast.success('✅ Trending product updated successfully!');
      onSuccess();
    } catch (error) {
      console.error("Error updating trending product:", error);

      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while updating the trending product.');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Title Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Title</h3>
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
                  },
                  maxLength: {
                    value: 100,
                    message: "Title must not exceed 100 characters"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.title_en ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter product title in english"
              />
              {errors.title_en && (
                <p className="text-red-500 text-sm mt-1">{errors.title_en.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {watchedValues.title_en?.length || 0}/100 characters
              </p>
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
                  },
                  maxLength: {
                    value: 100,
                    message: "Title must not exceed 100 characters"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.title_mr ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="मराठीत उत्पादनाचे शीर्षक टाका"
              />
              {errors.title_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.title_mr.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {watchedValues.title_mr?.length || 0}/100 characters
              </p>
            </div>
          </div>
        </div>

        {/* Category Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category (English) *</label>
              <input
                type="text"
                {...register("category_en", {
                  required: "English category is required",
                  minLength: {
                    value: 2,
                    message: "Category must be at least 2 characters long"
                  },
                  maxLength: {
                    value: 50,
                    message: "Category must not exceed 50 characters"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.category_en ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter category in english"
              />
              {errors.category_en && (
                <p className="text-red-500 text-sm mt-1">{errors.category_en.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {watchedValues.category_en?.length || 0}/50 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category (मराठी) *</label>
              <input
                type="text"
                {...register("category_mr", {
                  required: "Marathi category is required",
                  minLength: {
                    value: 2,
                    message: "Category must be at least 2 characters long"
                  },
                  maxLength: {
                    value: 50,
                    message: "Category must not exceed 50 characters"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.category_mr ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="मराठीत श्रेणी टाका"
              />
              {errors.category_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.category_mr.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {watchedValues.category_mr?.length || 0}/50 characters
              </p>
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
                    value: 20,
                    message: "Description must be at least 20 characters long"
                  },
                  maxLength: {
                    value: 800,
                    message: "Description must not exceed 800 characters"
                  }
                })}
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.description_en ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter detailed description in english"
              />
              {errors.description_en && (
                <p className="text-red-500 text-sm mt-1">{errors.description_en.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {watchedValues.description_en?.length || 0}/800 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description (मराठी) *</label>
              <textarea
                {...register("description_mr", {
                  required: "Marathi description is required",
                  minLength: {
                    value: 20,
                    message: "Description must be at least 20 characters long"
                  },
                  maxLength: {
                    value: 800,
                    message: "Description must not exceed 800 characters"
                  }
                })}
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.description_mr ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="मराठीत तपशीलवार वर्णन टाका"
              />
              {errors.description_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.description_mr.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {watchedValues.description_mr?.length || 0}/800 characters
              </p>
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
                  },
                  maxLength: {
                    value: 30,
                    message: "Button text must not exceed 30 characters"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.buttonText_en ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter button text in english"
              />
              {errors.buttonText_en && (
                <p className="text-red-500 text-sm mt-1">{errors.buttonText_en.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {watchedValues.buttonText_en?.length || 0}/30 characters
              </p>
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
                  },
                  maxLength: {
                    value: 30,
                    message: "Button text must not exceed 30 characters"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.buttonText_mr ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="मराठीत बटन मजकूर टाका"
              />
              {errors.buttonText_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.buttonText_mr.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {watchedValues.buttonText_mr?.length || 0}/30 characters
              </p>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Maximum Capacity *</label>
              <input
                type="number"
                min="1"
                {...register("maxCapacity", {
                  required: "Maximum capacity is required",
                  min: {
                    value: 1,
                    message: "Capacity must be at least 1"
                  },
                  max: {
                    value: 10000,
                    message: "Capacity cannot exceed 10,000"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.maxCapacity ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter maximum capacity"
              />
              {errors.maxCapacity && (
                <p className="text-red-500 text-sm mt-1">{errors.maxCapacity.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Featured Product</label>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  {...register("isFeatured")}
                  className="rounded border-gray-300 text-[#2C498D] focus:ring-[#2C498D] focus:ring-offset-0"
                />
                <span className="text-sm text-gray-700">Mark as featured product</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Image</h3>
          <ImageUploader image={image} setImage={setImage} />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 w-full rounded text-white font-medium transition-colors duration-200 cursor-pointer ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#2C498D] hover:bg-[#1e3a7a]'
              }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Trending Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrendingProductEdit;
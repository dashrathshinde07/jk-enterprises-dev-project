import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateReview } from "../../api/reviewApi";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

const ReviewEdit = ({ data, onSuccess }) => {
  const [profileImage, setProfileImage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: "",
      rating: 5,
      reviewDate: "",
      reviewText_en: "",
      reviewText_mr: "",
    }
  });

  // Watch all form values
  const watchedValues = watch();

  useEffect(() => {
    
    if (data) {
      // Prepare the form data with proper defaults
      const formData = {
        name: data.name || "",
        rating: data.rating || 5,
        reviewDate: data.reviewDate ? data.reviewDate.split('T')[0] : "",
        reviewText_en: data.reviewText?.en || "",
        reviewText_mr: data.reviewText?.mr || "",
      };

      // Reset form with new data to ensure all fields are properly initialized
      reset(formData);

      // Set profile image
      setProfileImage(data.profileImage || null);
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      // Prepare the complete data object to send to updateReview
      const updateData = {
        name: formData.name,
        rating: Number(formData.rating),
        reviewDate: new Date(formData.reviewDate).toISOString(),
        reviewText: {
          en: formData.reviewText_en,
          mr: formData.reviewText_mr
        },
        profileImage: profileImage
      };

      await updateReview(data._id, updateData);
      toast.success('✅ Review updated successfully!');
      onSuccess();
    } catch (error) {
      console.error("Error updating review:", error);

      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while updating the review.');
      }
    }
  };

  const renderStarRating = () => {
    const currentRating = watchedValues.rating || 5;

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star} className="cursor-pointer">
            <input
              type="radio"
              value={star}
              {...register("rating", {
                required: "Rating is required",
                valueAsNumber: true
              })}
              className="sr-only"
            />
            <svg
              className={`w-6 h-6 transition-colors duration-200 ${currentRating >= star
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
                }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </label>
        ))}
        <span className="text-sm text-gray-600 ml-2">
          ({currentRating} out of 5 stars)
        </span>
      </div>
    );
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

        {/* Reviewer Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Reviewer Information</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Reviewer Name *</label>
            <input
              type="text"
              {...register("name", {
                required: "Reviewer name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long"
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Name should only contain letters and spaces"
                }
              })}
              className={`w-full border rounded px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter reviewer name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
        </div>

        {/* Rating & Date Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Rating & Date</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Rating *</label>
              <div className="border rounded px-3 py-2 border-gray-300">
                {renderStarRating()}
              </div>
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Review Date *</label>
              <input
                type="date"
                {...register("reviewDate", {
                  required: "Review date is required"
                })}
                className={`w-full border rounded px-3 py-2 ${errors.reviewDate ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.reviewDate && (
                <p className="text-red-500 text-sm mt-1">{errors.reviewDate.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Review Content Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Review Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Review Text (English) *</label>
              <textarea
                {...register("reviewText_en", {
                  required: "English review text is required",
                  minLength: {
                    value: 10,
                    message: "Review must be at least 10 characters long"
                  },
                  maxLength: {
                    value: 1000,
                    message: "Review must not exceed 1000 characters"
                  }
                })}
                rows={6}
                className={`w-full border rounded px-3 py-2 ${errors.reviewText_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter review text in english"
              />
              {errors.reviewText_en && (
                <p className="text-red-500 text-sm mt-1">{errors.reviewText_en.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Review Text (मराठी) *</label>
              <textarea
                {...register("reviewText_mr", {
                  required: "Marathi review text is required",
                  minLength: {
                    value: 10,
                    message: "Review must be at least 10 characters long"
                  },
                  maxLength: {
                    value: 1000,
                    message: "Review must not exceed 1000 characters"
                  }
                })}
                rows={6}
                className={`w-full border rounded px-3 py-2 ${errors.reviewText_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत पुनरावलोकन मजकूर टाका"
              />
              {errors.reviewText_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.reviewText_mr.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Profile Image</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Reviewer Profile Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded p-4">
              <ImageUploader image={profileImage} setImage={setProfileImage} />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Upload a profile image for the reviewer (optional)
            </p>
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 w-full rounded text-white font-medium ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2C498D] hover:bg-[#1e3a7a]'
              }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewEdit;
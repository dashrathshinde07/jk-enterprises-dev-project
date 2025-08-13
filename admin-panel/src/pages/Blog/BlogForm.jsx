import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createBlog } from "../../api/blogApi";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

const BlogForm = ({ onSuccess }) => {
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
      description_en: "",
      description_mr: "",
      content_en: "",
      content_mr: "",
      category_en: "",
      category_mr: "",
      authorName: "",
    }
  });

  const onSubmit = async (data) => {
    try {
      await createBlog({ ...data, image });
      toast.success('✅ Blog created successfully!');
      reset();
      setImage(null);
      onSuccess();
    } catch (error) {
      console.error("Error creating blog:", error);

      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while creating the blog.');
      }
    }
  };

  // const getFieldError = (fieldName) => {
  //   return errors[fieldName]?.message;
  // };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

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
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.category_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter category in english"
              />
              {errors.category_en && (
                <p className="text-red-500 text-sm mt-1">{errors.category_en.message}</p>
              )}
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
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.category_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत श्रेणी टाका"
              />
              {errors.category_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.category_mr.message}</p>
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

        {/* Content Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Content (English) *</label>
              <textarea
                {...register("content_en", {
                  required: "English content is required",
                  minLength: {
                    value: 50,
                    message: "Content must be at least 50 characters long"
                  }
                })}
                rows={8}
                className={`w-full border rounded px-3 py-2 ${errors.content_en ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter full content in english"
              />
              {errors.content_en && (
                <p className="text-red-500 text-sm mt-1">{errors.content_en.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Content (मराठी) *</label>
              <textarea
                {...register("content_mr", {
                  required: "Marathi content is required",
                  minLength: {
                    value: 50,
                    message: "Content must be at least 50 characters long"
                  }
                })}
                rows={8}
                className={`w-full border rounded px-3 py-2 ${errors.content_mr ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत संपूर्ण मजकूर टाका"
              />
              {errors.content_mr && (
                <p className="text-red-500 text-sm mt-1">{errors.content_mr.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Author Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Author Details</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Author Name *</label>
            <input
              type="text"
              {...register("authorName", {
                required: "Author name is required",
                minLength: {
                  value: 2,
                  message: "Author name must be at least 2 characters long"
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Author name should only contain letters and spaces"
                }
              })}
              className={`w-full border rounded px-3 py-2 ${errors.authorName ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter author name"
            />
            {errors.authorName && (
              <p className="text-red-500 text-sm mt-1">{errors.authorName.message}</p>
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

export default BlogForm;
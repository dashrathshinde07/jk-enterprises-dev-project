import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllParentEntities } from "../../api/parentEntityApi";
import { createCategory } from "../../api/categoryApi";
import { toast } from "react-toastify";

const CategoryForm = ({ onSuccess }) => {
  const [parentEntities, setParentEntities] = useState([]);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      englishTitle: "",
      marathiTitle: "",
      enDescription: "",
      mrDescription: "",
      status: "active",
      isFeatured: false,
      order: "",
      parentEntity: "",
      slug: "",
    },
  });

  const englishTitle = watch("englishTitle");

  // Generate slug whenever English title changes
  useEffect(() => {
    if (englishTitle) {
      const slug = generateSlug(englishTitle);
      setValue("slug", slug);
    }
  }, [englishTitle, setValue]);

  // Fetch parent entities
  useEffect(() => {
    getAllParentEntities()
      .then((res) => setParentEntities(res.data))
      .catch(() => toast.error("Failed to load parent categories"));
  }, []);

  const generateSlug = (text) => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return (
      text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") +
      "-" +
      random
    );
  };
  const onSubmit = async (data) => {
    if (!image) {
      toast.error("❌ Please upload an image");
      return;
    }

    try {

      await createCategory({ ...data, image });

      toast.success("✅ Category created successfully!");
      reset();
      setImage(null);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating category:", error);

      // Axios-style error response check
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error('❌ Something went wrong while creating the category.');
      }
    }
  };

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
                {...register("englishTitle", {
                  required: "English title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.englishTitle ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter title in english"
              />
              {errors.englishTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.englishTitle.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title (मराठी) *</label>
              <input
                type="text"
                {...register("marathiTitle", {
                  required: "Marathi title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.marathiTitle ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत शीर्षक टाका"
              />
              {errors.marathiTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.marathiTitle.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Slug & Order Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                type="text"
                {...register("slug")}
                readOnly
                className="w-full bg-gray-100 text-gray-600 border border-gray-300 rounded px-3 py-2 cursor-not-allowed"
                placeholder="Auto-generated slug"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Order *</label>
              <input
                type="number"
                {...register("order", {
                  required: "Order is required",
                  min: {
                    value: 1,
                    message: "Order must be at least 1"
                  }
                })}
                className={`w-full border rounded px-3 py-2 ${errors.order ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter display order"
              />
              {errors.order && (
                <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Parent & Status Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Category Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium mb-1">Parent Category *</label>
              <select
                {...register("parentEntity", {
                  required: "Please select a parent category",
                })}
                className={`w-full border text-black rounded px-3 py-2 ${errors.parentEntity ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="">Select parent category</option>
                {parentEntities.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.title}
                  </option>
                ))}
              </select>
              {errors.parentEntity && (
                <p className="text-red-500 text-sm mt-1">{errors.parentEntity.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status *</label>
              <select
                {...register("status", { required: "Status is required" })}
                className={`w-full border rounded px-3 py-2 ${errors.status ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
              )}
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isFeatured")}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">Featured Category</label>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Description</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Description (English) *</label>
              <textarea
                {...register("enDescription", {
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
                className={`w-full border rounded px-3 py-2 ${errors.enDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter description in english"
              />
              {errors.enDescription && (
                <p className="text-red-500 text-sm mt-1">{errors.enDescription.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description (मराठी) *</label>
              <textarea
                {...register("mrDescription", {
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
                className={`w-full border rounded px-3 py-2 ${errors.mrDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="मराठीत वर्णन टाका"
              />
              {errors.mrDescription && (
                <p className="text-red-500 text-sm mt-1">{errors.mrDescription.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Image Upload</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Category Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {image && (
              <p className="text-green-600 text-sm mt-1">✅ Image selected: {image.name}</p>
            )}
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 w-full rounded text-white font-medium cursor-pointer ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2C498D] hover:bg-[#1e3a7a]'
              }`}
          >
            {isSubmitting ? 'Creating Category...' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
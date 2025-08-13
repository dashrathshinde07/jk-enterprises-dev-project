import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateCategory } from "../../api/categoryApi";
import { getAllParentEntities } from "../../api/parentEntityApi";
import { toast } from "react-toastify";

const CategoryEdit = ({ data, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [parentEntities, setParentEntities] = useState([]);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const englishTitle = watch("englishTitle");

  // Slug generator
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

  // Set default values when data changes
  useEffect(() => {
    if (data) {
      reset({
        englishTitle: data.englishTitle || "",
        marathiTitle: data.marathiTitle || "",
        slug: data.slug || "",
        enDescription: data.enDescription || "",
        mrDescription: data.mrDescription || "",
        status: data.status || "active",
        isFeatured: !!data.isFeatured,
        order: data.order || "",
        parentEntity: data.parentEntity || "",
      });
    }
  }, [data, reset]);

  // Auto-generate slug from English title
  useEffect(() => {
    if (englishTitle?.trim()) {
      setValue("slug", generateSlug(englishTitle));
    }
  }, [englishTitle, setValue]);

  // Fetch parent categories
  useEffect(() => {
    getAllParentEntities()
      .then((res) => setParentEntities(res.data))
      .catch(() => toast.error("Failed to load parent categories"));
  }, []);

  const onSubmit = async (formDataObj) => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(formDataObj).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append("image", image);
      }

      await updateCategory(data._id, formData);
      toast.success("Category updated successfully!");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow-md max-h-[75vh] overflow-y-auto p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Title
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* English Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Title (English) *
              </label>
              <input
                type="text"
                {...register("englishTitle", {
                  required: "English title is required",
                  minLength: { value: 3, message: "Must be at least 3 chars" },
                })}
                placeholder="Enter your title"
                className={`w-full border rounded px-3 py-2 ${errors.englishTitle ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.englishTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.englishTitle.message}
                </p>
              )}
            </div>

            {/* Marathi Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Title (मराठी) *
              </label>
              <input
                type="text"
                {...register("marathiTitle", {
                  required: "Marathi title is required",
                  minLength: { value: 3, message: "Must be at least 3 chars" },
                })}
                placeholder="मराठीत शीर्षक टाका"
                className={`w-full border rounded px-3 py-2 ${errors.marathiTitle ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.marathiTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.marathiTitle.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slug */}
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                type="text"
                {...register("slug")}
                placeholder="Enter your slug"
                readOnly
                className="w-full bg-gray-100 text-gray-600 border border-gray-300 rounded px-3 py-2 cursor-not-allowed"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium mb-1">Order *</label>
              <input
                type="number"
                {...register("order", {
                  required: "Order is required",
                  min: { value: 1, message: "Must be at least 1" },
                })}
                placeholder="Enter your order"
                className={`w-full border rounded px-3 py-2 ${errors.order ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.order && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.order.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Category Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Category Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Parent */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Parent Category *
              </label>
              <select
                {...register("parentEntity", {
                  required: "Please select a parent category",
                })}
                placeholder='Enter your parent category'                
                className={`w-full border text-black rounded px-3 py-2 ${errors.parentEntity ? "border-red-500" : "border-gray-300"
                  }`}
              >
                {/* <option value="">Select parent category</option> */}
                {parentEntities.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.englishTitle || p.title}
                  </option>
                ))}
              </select>
              {errors.parentEntity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parentEntity.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Status *</label>
              <select
                {...register("status", { required: "Status is required" })}
                className={`w-full border rounded px-3 py-2 ${errors.status ? "border-red-500" : "border-gray-300"
                  }`}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isFeatured")}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Featured Category
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Description
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* English */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description (English) *
              </label>
              <textarea
                {...register("enDescription", {
                  required: "English description is required",
                  minLength: { value: 10, message: "At least 10 chars" },
                  maxLength: { value: 500, message: "Max 500 chars" },
                })}
                rows={4}
                placeholder="Enter your en description"
                className={`w-full border rounded px-3 py-2 ${errors.enDescription ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.enDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.enDescription.message}
                </p>
              )}
            </div>

            {/* Marathi */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description (मराठी) *
              </label>
              <textarea
                {...register("mrDescription", {
                  required: "Marathi description is required",
                  minLength: { value: 10, message: "At least 10 chars" },
                  maxLength: { value: 500, message: "Max 500 chars" },
                })}
                placeholder="मराठीत वर्णन टाका"
                rows={4}
                className={`w-full border rounded px-3 py-2 ${errors.mrDescription ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.mrDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mrDescription.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Image Upload
          </h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {image ? (
            <p className="text-green-600 text-sm mt-1">
              ✅ Image selected: {image.name}
            </p>
          ) : data.image ? (
            <img
              src={data.image}
              alt="Current"
              className="w-16 h-16 mt-2 object-cover rounded border"
            />
          ) : null}
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className={`px-6 py-2 w-full rounded text-white font-medium cursor-pointer ${isSubmitting || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2C498D] hover:bg-[#1e3a7a]"
              }`}
          >
            {isSubmitting || loading
              ? "Updating Category..."
              : "Update Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryEdit;

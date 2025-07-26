import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateCategory } from "../../api/categoryApi";
import { getAllParentEntities } from "../../api/parentEntityApi";
import { toast } from "react-toastify";

const CategoryEdit = ({ data, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [parentEntities, setParentEntities] = useState([]);
  const [image, setImage] = useState(null);
  console.log("data-----", data);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const englishTitle = watch("englishTitle");

  // Set form default values when data changes
  useEffect(() => {
    if (data) {
      reset({
        englishTitle: data.englishTitle || "",
        marathiTitle: data.marathiTitle || "",
        slug: data.slug || "",
        enDescription: data.enDescription || "",
        mrDescription: data.mrDescription || "",
        status: data.status || "active",
        isFeatured: data.isFeatured || false,
        order: data.order || "",
        parentEntity: data.parentEntity || "", // 👈 Extract the _id from object
      });
    }
  }, [data, reset]);

  // Update slug on title change
  useEffect(() => {
    if (englishTitle) {
      const slug = generateSlug(englishTitle);
      setValue("slug", slug);
    }
  }, [englishTitle, setValue]);

  useEffect(() => {
    getAllParentEntities()
      .then((res) => setParentEntities(res.data))
      .catch(() => toast.error("Failed to load parent categories"));
  }, []);
  useEffect(() => {
    setValue("parentEntity", data?.parentEntity);
  }, [parentEntities]);

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

  const onSubmit = async (formDataObj) => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (const key in formDataObj) {
        formData.append(key, formDataObj[key]);
      }

      if (image) {
        formData.append("image", image); // Optional
      }

      await updateCategory(data._id, formData);
      toast.success("Category updated successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto bg-white p-4 rounded-xl shadow-md space-y-4 max-h-[90vh] overflow-y-auto"
    >
      <h2 className="text-lg font-semibold">Edit Category</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* English Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            English Title *
          </label>
          <input
            type="text"
            {...register("englishTitle", {
              required: "English Title is required",
            })}
            className="w-full border rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.englishTitle && (
            <p className="text-red-500 text-xs">
              {errors.englishTitle.message}
            </p>
          )}
        </div>

        {/* Marathi Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Marathi Title *
          </label>
          <input
            type="text"
            {...register("marathiTitle", {
              required: "Marathi Title is required",
            })}
            className="w-full border rounded-md px-2 py-1.5 text-sm"
          />
          {errors.marathiTitle && (
            <p className="text-red-500 text-xs">
              {errors.marathiTitle.message}
            </p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            {...register("slug")}
            readOnly
            className="w-full bg-gray-100 text-gray-600 border rounded-md px-2 py-1.5 text-sm cursor-not-allowed"
          />
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm font-medium mb-1">Order *</label>
          <input
            type="number"
            {...register("order", { required: "Order is required" })}
            className="w-full border rounded-md px-2 py-1.5 text-sm"
          />
          {errors.order && (
            <p className="text-red-500 text-xs">{errors.order.message}</p>
          )}
        </div>

        {/* Parent Entity */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Parent Category *
          </label>
          <select
            {...register("parentEntity", {
              required: "Please select a parent category",
            })}
            className="w-full border rounded-md px-2 py-1.5 text-sm"
          >
            <option value="">Select</option>
            {parentEntities.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
          {errors.parentEntity && (
            <p className="text-red-500 text-xs">
              {errors.parentEntity.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status *</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full border rounded-md px-2 py-1.5 text-sm"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs">{errors.status.message}</p>
          )}
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2 mt-5">
          <input
            type="checkbox"
            {...register("isFeatured")}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">Is Featured</label>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload New Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border rounded-md px-2 py-1.5 text-sm"
          />
          {data.image && (
            <img
              src={data.image}
              alt="Current"
              className="w-16 h-16 mt-2 object-cover rounded border"
            />
          )}
        </div>

        {/* English Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            English Description *
          </label>
          <textarea
            {...register("enDescription", {
              required: "English description is required",
            })}
            className="w-full border rounded-md px-2 py-1.5 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.enDescription && (
            <p className="text-red-500 text-xs">
              {errors.enDescription.message}
            </p>
          )}
        </div>

        {/* Marathi Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Marathi Description *
          </label>
          <textarea
            {...register("mrDescription", {
              required: "Marathi description is required",
            })}
            className="w-full border rounded-md px-2 py-1.5 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.mrDescription && (
            <p className="text-red-500 text-xs">
              {errors.mrDescription.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-sm rounded-md text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : "Update Category"}
        </button>
      </div>
    </form>
  );
};

export default CategoryEdit;

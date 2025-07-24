import React, { useState, useEffect } from "react";
import { updateParentEntity } from "../../api/parentEntityApi";

// Utility to generate slug
const generateSlug = (text) => {
  const baseSlug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  const uniqueSuffix = Date.now().toString().slice(-4); // e.g., '3587'
  return `${baseSlug}-${uniqueSuffix}`;
};

const ParentEntityEdit = ({ data, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: data.title || "",
    marathiTitle: data.marathiTitle || "",
    slug: data.slug || "",
    description: data.description || "",
    status: data.status || "active",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData.title && !data.slug) {
      const newSlug = generateSlug(formData.title);
      setFormData((prev) => ({ ...prev, slug: newSlug }));
    }
  }, [formData.title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Regenerate slug only if the title changes
    if (name === "title") {
      const newSlug = generateSlug(value);
      setFormData((prev) => ({ ...prev, slug: newSlug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateParentEntity(data._id, formData);
      onSuccess();
    } catch (error) {
      console.error("Failed to update parent entity", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title (English)"
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="marathiTitle"
        value={formData.marathiTitle}
        onChange={handleChange}
        placeholder="Title (Marathi)"
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        placeholder="Slug"
        required
        readOnly
        className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border px-3 py-2 rounded"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#2C498D] text-white px-4 py-2 rounded"
      >
        {loading ? "Updating..." : "Update Parent"}
      </button>
    </form>
  );
};

export default ParentEntityEdit;

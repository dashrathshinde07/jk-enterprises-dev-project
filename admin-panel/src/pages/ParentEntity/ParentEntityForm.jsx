import React, { useState } from "react";
import { createParentEntity } from "../../api/parentEntityApi";

// Utility to generate unique slug from title
const generateSlug = (title) => {
  const baseSlug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const uniqueSuffix = Math.random().toString(36).substring(2, 7);
  return `${baseSlug}-${uniqueSuffix}`;
};

const ParentEntityForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    marathiTitle: "", // ✅ corrected key name
    slug: "",
    description: "",
    status: "active",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      const slug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createParentEntity(formData); // just sending JSON
      onSuccess(); // Close modal and refresh
    } catch (err) {
      console.error("Failed to create parent entity", err);
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
        placeholder="Slug (auto-generated)"
        disabled
        className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-600"
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
        {loading ? "Creating..." : "Create Parent"}
      </button>
    </form>
  );
};

export default ParentEntityForm;

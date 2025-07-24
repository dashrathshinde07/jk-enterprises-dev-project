import React, { useEffect, useState } from "react";
import { updateParentEntity } from "../../api/parentEntityApi";

const ParentEntityEdit = ({ data, onSuccess }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    await updateParentEntity(data._id, { title });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <div className="text-right">
        <button type="submit" className="bg-[#2C498D] text-white px-4 py-2 rounded">
          Update
        </button>
      </div>
    </form>
  );
};

export default ParentEntityEdit;

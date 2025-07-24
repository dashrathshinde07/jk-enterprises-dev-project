import React, { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "../../api/blogApi";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import BlogForm from "./BlogForm";
import BlogEdit from "./BlogEdit";
import TableActions from "../../components/TableActions";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editBlogData, setEditBlogData] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      setBlogs(res.data || res);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(id);
      fetchBlogs();
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "/no-image.png";
    if (image.startsWith("http")) return image;
    return `https://res.cloudinary.com/<your-cloud-name>/image/upload/${image}`;
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2C498D]">Manage Blogs</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#2C498D] hover:bg-[#203c73] text-white px-5 py-2 rounded transition"
        >
          + Add Blog
        </button>
      </div>

      {/* Blog Table */}
      {loading ? (
        <Loader />
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No blogs found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#2C498D] text-white text-sm">
              <tr>
                <th className="p-3 font-medium">Image</th>
                <th className="p-3 font-medium">Title (EN)</th>
                <th className="p-3 font-medium">Author</th>
                <th className="p-3 font-medium">Published Date</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={getImageUrl(blog.image)}
                      onError={(e) => (e.target.src = "/no-image.png")}
                      alt="Blog"
                      className="w-16 h-16 object-cover rounded border"
                    />
                  </td>
                  <td className="p-3">{blog.title_en || "—"}</td>
                  <td className="p-3">{blog.authorName || "—"}</td>
                  <td className="p-3">
                    {blog.publishedDate
                      ? new Date(blog.publishedDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3">
                    <TableActions
                      onEdit={() => setEditBlogData(blog)}
                      onDelete={() => handleDelete(blog._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      <Modal
        title="Add Blog"
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      >
        <BlogForm
          onSuccess={() => {
            setShowAddModal(false);
            fetchBlogs();
          }}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Blog"
        isOpen={!!editBlogData}
        onClose={() => setEditBlogData(null)}
      >
        <BlogEdit
          data={editBlogData}
          onSuccess={() => {
            setEditBlogData(null);
            fetchBlogs();
          }}
        />
      </Modal>
    </div>
  );
};

export default BlogList;

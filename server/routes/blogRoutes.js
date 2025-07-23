const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // multer middleware for handling image uploads
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// @route   POST /api/blogs
// @desc    Create a new blog post
router.post("/", upload.single("image"), createBlog);

// @route   GET /api/blogs
// @desc    Get all blog posts
router.get("/", getAllBlogs);

// @route   GET /api/blogs/:id
// @desc    Get a blog post by ID
router.get("/:id", getBlogById);

// @route   PUT /api/blogs/:id
// @desc    Update a blog post
router.put("/:id", upload.single("image"), updateBlog);

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog post
router.delete("/:id", deleteBlog);

module.exports = router;

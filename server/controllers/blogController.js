// controllers/blogController.js
const Blog = require("../models/Blog");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

// CREATE
exports.createBlog = async (req, res) => {
  try {
    const {
      title_en,
      title_mr,
      description_en,
      description_mr,
      content_en,
      content_mr,
      category_en,
      category_mr,
      authorName,
    } = req.body;

    console.log(req.body);

    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const image = await uploadImageToCloudinary(req.file.path, "blogs");

    const blog = new Blog({
      title: { en: title_en, mr: title_mr },
      slug: slugify(title_en),
      description: { en: description_en, mr: description_mr },
      content: { en: content_en, mr: content_mr },
      category: { en: category_en, mr: category_mr },
      imageUrl: image.url,
      imagePublicId: image.public_id,
      author: {
        name: authorName,
        // optionally add author image here
      },
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    const {
      title_en,
      title_mr,
      description_en,
      description_mr,
      content_en,
      content_mr,
      category_en,
      category_mr,
      authorName,
    } = req.body;

    if (req.file) {
      if (blog.imagePublicId) {
        await deleteImageFromCloudinary(blog.imagePublicId);
      }
      const newImage = await uploadImageToCloudinary(req.file.path, "blogs");
      blog.imageUrl = newImage.url;
      blog.imagePublicId = newImage.public_id;
    }

    blog.title = {
      en: title_en || blog.title.en,
      mr: title_mr || blog.title.mr,
    };
    blog.slug = slugify(title_en || blog.title.en);
    blog.description = {
      en: description_en || blog.description.en,
      mr: description_mr || blog.description.mr,
    };
    blog.content = {
      en: content_en || blog.content.en,
      mr: content_mr || blog.content.mr,
    };
    blog.category = {
      en: category_en || blog.category.en,
      mr: category_mr || blog.category.mr,
    };
    blog.author.name = authorName || blog.author.name;

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    if (blog.imagePublicId) {
      await deleteImageFromCloudinary(blog.imagePublicId);
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

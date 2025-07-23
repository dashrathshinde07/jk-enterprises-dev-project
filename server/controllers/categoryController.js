const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");

// CREATE category
exports.createCategory = async (req, res) => {
  try {
    const {
      englishTitle,
      marathiTitle,
      enDescription,
      mrDescription,
      slug,
      status,
      isFeatured,
      order,
      createdBy,
      parentEntity, // 👈 Add this
    } = req.body;

    let imageData = {};
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageData.image = result.secure_url;
      imageData.imagePublicId = result.public_id;
    }

    const newCategory = new Category({
      englishTitle,
      marathiTitle,
      enDescription,
      mrDescription,
      slug,
      status,
      isFeatured,
      order,
      createdBy,
      parentEntity, // 👈 Assign it

      ...imageData,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
};

// UPDATE category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    const {
      englishTitle,
      marathiTitle,
      enDescription,
      mrDescription,
      slug,
      status,
      isFeatured,
      order,
    } = req.body;

    const updatedData = {
      englishTitle: englishTitle ?? category.englishTitle,
      marathiTitle: marathiTitle ?? category.marathiTitle,
      enDescription: enDescription ?? category.enDescription,
      mrDescription: mrDescription ?? category.mrDescription,
      slug: slug ?? category.slug,
      status: status ?? category.status,
      isFeatured: isFeatured ?? category.isFeatured,
      order: order ?? category.order,
    };

    // Replace image if new image provided
    if (req.file) {
      if (category.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(category.imagePublicId);
        } catch (err) {
          console.warn("Failed to delete old image:", err);
        }
      }

      const result = await cloudinary.uploader.upload(req.file.path);
      updatedData.image = result.secure_url;
      updatedData.imagePublicId = result.public_id;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.json(updatedCategory);
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

// SOFT DELETE category (archive it)
exports.archiveCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.archive = true;
    await category.save();
    res.json({ message: "Category archived (soft deleted)" });
  } catch (error) {
    console.error("Archive Category Error:", error);
    res.status(500).json({ message: "Failed to archive category" });
  }
};
// GET all categories (not archived)
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ archive: false }).sort({
      createdAt: -1,
    });
    res.json(categories);
  } catch (error) {
    console.error("Get All Categories Error:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};
exports.getByParentEntity = async (req, res) => {
  try {
    const categories = await Category.find({
      parentEntity: req.params.parentId,
      archive: false,
    }).sort({ createdAt: -1 });

    res.json(categories);
  } catch (error) {
    console.error("Fetch by parent entity error:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

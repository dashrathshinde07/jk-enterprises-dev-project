const SectionItem = require("../models/SectionItem");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

// ✅ CREATE section item
const createSectionItem = async (req, res) => {
  try {
    const { title_en, title_mr, description_en, description_mr } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const filePath = req.file.path;
    const imageData = await uploadImageToCloudinary(filePath);

    const newItem = await SectionItem.create({
      title: { en: title_en, mr: title_mr },
      description: { en: description_en, mr: description_mr },
      imageUrl: imageData.url,
      imagePublicId: imageData.public_id,
    });

    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ message: "Failed to create section item" });
  }
};

// ✅ GET all section items
const getAllSectionItems = async (req, res) => {
  try {
    const items = await SectionItem.find();
    res.status(200).json(items);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch section items" });
  }
};

// ✅ GET by ID
const getSectionItemById = async (req, res) => {
  try {
    const item = await SectionItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(item);
  } catch (err) {
    console.error("Fetch by ID Error:", err);
    res.status(500).json({ message: "Failed to fetch item" });
  }
};

// ✅ UPDATE item + delete old image
const updateSectionItem = async (req, res) => {
  try {
    const { title_en, title_mr, description_en, description_mr } = req.body;

    const item = await SectionItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // ✅ If new image uploaded, delete old and update
    if (req.file) {
      if (item.imagePublicId) {
        try {
          await deleteImageFromCloudinary(item.imagePublicId);
        } catch (error) {
          console.warn(
            "⚠️ Could not delete old Cloudinary image:",
            error.message
          );
        }
      }

      const newImageData = await uploadImageToCloudinary(req.file.path);
      item.imageUrl = newImageData.url;
      item.imagePublicId = newImageData.public_id;
    }

    // ✅ Update bilingual fields
    item.title = {
      en: title_en || item.title.en,
      mr: title_mr || item.title.mr,
    };

    item.description = {
      en: description_en || item.description.en,
      mr: description_mr || item.description.mr,
    };

    await item.save();
    res.status(200).json(item);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Failed to update item" });
  }
};

// ✅ DELETE item + Cloudinary image
const deleteSectionItem = async (req, res) => {
  try {
    const item = await SectionItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // ✅ Delete image from Cloudinary
    if (item.imagePublicId) {
      try {
        await deleteImageFromCloudinary(item.imagePublicId);
      } catch (error) {
        console.warn("⚠️ Failed to delete Cloudinary image:", error.message);
      }
    }

    await item.deleteOne();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Failed to delete item" });
  }
};

module.exports = {
  createSectionItem,
  getAllSectionItems,
  getSectionItemById,
  updateSectionItem,
  deleteSectionItem,
};

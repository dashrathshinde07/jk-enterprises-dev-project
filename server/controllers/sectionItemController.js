const SectionItem = require("../models/SectionItem");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

// CREATE a new section item
const createSectionItem = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const filePath = req.file.path;
    const imageData = await uploadImageToCloudinary(filePath);

    const newItem = await SectionItem.create({
      title,
      description,
      imageUrl: imageData.url,
      imagePublicId: imageData.public_id,
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ all section items
const getAllSectionItems = async (req, res) => {
  try {
    const items = await SectionItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ single item by ID
const getSectionItemById = async (req, res) => {
  try {
    const item = await SectionItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE a section item
const updateSectionItem = async (req, res) => {
  try {
    const { title, description } = req.body;
    const item = await SectionItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Update image if new file is provided
    if (req.file) {
      await deleteImageFromCloudinary(item.imagePublicId); // delete old image
      const newImageData = await uploadImageToCloudinary(req.file.path); // upload new image
      item.imageUrl = newImageData.url;
      item.imagePublicId = newImageData.public_id;
    }

    item.title = title || item.title;
    item.description = description || item.description;

    await item.save();
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a section item
const deleteSectionItem = async (req, res) => {
  try {
    const item = await SectionItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await deleteImageFromCloudinary(item.imagePublicId); // delete image from cloudinary
    await item.deleteOne(); // remove item from DB

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSectionItem,
  getAllSectionItems,
  getSectionItemById,
  updateSectionItem,
  deleteSectionItem,
};

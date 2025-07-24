const ProductDescription = require("../models/ProductDescription");
const cloudinary = require("../config/cloudinary");

// ⬆️ Create or Add Product Description
exports.createProductDescription = async (req, res) => {
  try {
    const { productId, blocks } = req.body;

    const description = await ProductDescription.create({
      productId,
      blocks,
    });

    res.status(201).json(description);
  } catch (error) {
    console.error("Create Description Error:", error);
    res.status(500).json({ message: "Failed to create description" });
  }
};

// 🔄 Update Product Description (reorder/edit)
exports.updateProductDescription = async (req, res) => {
  try {
    const { id } = req.params; // ID of the ProductDescription document
    const { blocks } = req.body;

    const updated = await ProductDescription.findByIdAndUpdate(
      id,
      { blocks },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error("Update Description Error:", error);
    res.status(500).json({ message: "Failed to update description" });
  }
};

// 📥 Upload Images for Description
exports.uploadDescriptionImages = async (req, res) => {
  try {
    const urls = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "product_description",
      });
      urls.push(result.secure_url);
    }

    res.json({ images: urls });
  } catch (error) {
    console.error("Image Upload Error:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
};

// 🔍 Get Product Description by Product ID
exports.getDescriptionByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const desc = await ProductDescription.findOne({ productId });

    if (!desc) return res.status(404).json({ message: "Not found" });

    res.json(desc);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Error getting description" });
  }
};

// ❌ Delete Description
exports.deleteProductDescription = async (req, res) => {
  try {
    const { id } = req.params;

    await ProductDescription.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

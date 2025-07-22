// controllers/productDescriptionController.js
const ProductDescription = require("../models/ProductDescription");
const cloudinary = require("../config/cloudinary");

// Helper to handle uploading image blocks to Cloudinary
const uploadImages = async (blocks) => {
  const uploadedBlocks = await Promise.all(
    blocks.map(async (block) => {
      if (block.type === "image" || block.type === "imageText") {
        if (block.image && typeof block.image !== "string") {
          const result = await cloudinary.uploader.upload(block.image, {
            folder: "product-descriptions",
          });
          block.image = result.secure_url;
        }
      }
      return block;
    })
  );
  return uploadedBlocks;
};

// Create or update product description
exports.createOrUpdateProductDescription = async (req, res) => {
  try {
    const { productId } = req.params;
    let { blocks } = req.body;

    // Handle Cloudinary upload
    blocks = await uploadImages(blocks);

    const existing = await ProductDescription.findOne({ product: productId });

    let description;
    if (existing) {
      existing.blocks = blocks;
      description = await existing.save();
    } else {
      description = await ProductDescription.create({
        product: productId,
        blocks,
      });
    }

    res.status(200).json({ success: true, data: description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get product description
exports.getProductDescription = async (req, res) => {
  try {
    const { productId } = req.params;
    const description = await ProductDescription.findOne({
      product: productId,
    });

    if (!description) {
      return res
        .status(404)
        .json({ success: false, message: "Description not found" });
    }

    res.status(200).json({ success: true, data: description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete product description
exports.deleteProductDescription = async (req, res) => {
  try {
    const { productId } = req.params;
    await ProductDescription.findOneAndDelete({ product: productId });
    res.status(200).json({ success: true, message: "Description deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

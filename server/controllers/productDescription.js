const ProductDescription = require("../models/ProductDescription");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Helper to upload a local file to Cloudinary
const uploadToCloudinary = async (localPath) => {
  const result = await cloudinary.uploader.upload(localPath, {
    folder: "product-descriptions",
  });
  fs.unlinkSync(localPath);
  return result.secure_url;
};

// Create or Update Product Description with file upload
exports.createOrUpdateProductDescription = async (req, res) => {
  try {
    const { productId } = req.body;
    let blocks = JSON.parse(req.body.blocks || "[]");
    const files = req.files || [];

    let fileIndex = 0;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      if (
        (block.type === "image" || block.type === "imageText") &&
        files[fileIndex]
      ) {
        const localPath = files[fileIndex].path;
        const uploadedUrl = await uploadToCloudinary(localPath);
        block.image = uploadedUrl;
        fileIndex++;
      }
    }

    const updated = await ProductDescription.findOneAndUpdate(
      { product: productId },
      { product: productId, blocks },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

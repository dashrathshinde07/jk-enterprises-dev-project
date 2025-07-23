const ProductDescription = require("../models/ProductDescription");
const cloudinary = require("../config/cloudinary");

// Upload image blocks to Cloudinary
const uploadImages = async (blocks) => {
  const updatedBlocks = await Promise.all(
    blocks.map(async (block) => {
      if (
        (block.type === "image" || block.type === "imageText") &&
        block.image &&
        !block.image.startsWith("http")
      ) {
        const upload = await cloudinary.uploader.upload(block.image, {
          folder: "product-descriptions",
        });
        block.image = upload.secure_url;
      }
      return block;
    })
  );
  return updatedBlocks;
};

exports.createOrUpdateProductDescription = async (req, res) => {
  try {
    const { productId } = req.params;
    let { blocks } = req.body;

    if (!blocks || !Array.isArray(blocks)) {
      return res
        .status(400)
        .json({ success: false, message: "Blocks array is required" });
    }

    // blocks = await uploadImages(blocks);

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

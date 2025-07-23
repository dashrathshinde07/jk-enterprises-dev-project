const ProductDescription = require("../models/ProductDescription");
const Product = require("../models/Product");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

// Helper to get uploaded file by fieldname
const getImageFileByField = (files, fieldname) => {
  return files.find((file) => file.fieldname === fieldname);
};

// Create or update product description
const createOrUpdateProductDescription = async (req, res) => {
  try {
    const { productId } = req.params;
    const { blocks } = req.body;

    if (!blocks) {
      return res.status(400).json({ message: "Blocks are required" });
    }

    const parsedBlocks = JSON.parse(blocks);
    const uploadedFiles = req.files || [];

    const updatedBlocks = await Promise.all(
      parsedBlocks.map(async (block, index) => {
        if (block.type === "image" || block.type === "imageText") {
          const fieldName = `image_${index}`;
          const file = getImageFileByField(uploadedFiles, fieldName);
          if (file) {
            const uploaded = await uploadImageToCloudinary(
              file.path,
              "product-description"
            );
            block.image = uploaded.url;
            block.publicId = uploaded.public_id;
          }
        }
        return block;
      })
    );

    // Upsert logic
    let productDescription = await ProductDescription.findOneAndUpdate(
      { product: productId },
      { blocks: updatedBlocks },
      { upsert: true, new: true }
    );

    // Ensure Product document has reference to description
    await Product.findByIdAndUpdate(productId, {
      productDescription: productDescription._id,
    });

    res.status(200).json({
      message: "Product description saved successfully",
      data: productDescription,
    });
  } catch (err) {
    console.error("Error creating/updating description:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get description
const getProductDescriptionByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const description = await ProductDescription.findOne({
      product: productId,
    });
    if (!description)
      return res.status(404).json({ message: "Description not found" });
    res.status(200).json(description);
  } catch (err) {
    console.error("Error fetching description:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete specific block
const deleteProductDescriptionBlock = async (req, res) => {
  try {
    const { productId, blockId } = req.params;
    const productDescription = await ProductDescription.findOne({
      product: productId,
    });
    if (!productDescription)
      return res.status(404).json({ message: "Description not found" });

    const block = productDescription.blocks.id(blockId);
    if (!block) return res.status(404).json({ message: "Block not found" });

    if (block.publicId) await deleteImageFromCloudinary(block.publicId);

    block.remove();
    await productDescription.save();

    res.status(200).json({ message: "Block deleted successfully" });
  } catch (err) {
    console.error("Error deleting block:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrUpdateProductDescription,
  getProductDescriptionByProductId,
  deleteProductDescriptionBlock,
};

const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createOrUpdateProductDescription,
  getProductDescriptionByProductId,
  deleteProductDescriptionBlock,
} = require("../controllers/productDescription");

// Create or Update Description (supports file upload)
router.post(
  "/product-description/:productId",
  upload.array("images", 10), // expecting 'images' field
  createOrUpdateProductDescription
);

// Get description by product ID
router.get("/:productId", getProductDescriptionByProductId);

// Delete a specific block from the product description
router.delete("/:productId/block/:blockId", deleteProductDescriptionBlock);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createOrUpdateProductDescription,
  getProductDescription,
  deleteProductDescription,
} = require("../controllers/productDescription");
const upload = require("../middleware/upload");

// Create or Update Product Description
router.post(
  "/product-description/:productId",
  upload.array("images"),
  createOrUpdateProductDescription
);

// Get Product Description by Product ID
router.get("/product-description/:productId", getProductDescription);

// Delete Product Description
router.delete("/product-description/:productId", deleteProductDescription);

module.exports = router;

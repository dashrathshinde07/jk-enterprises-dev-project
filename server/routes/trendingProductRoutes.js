const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // Multer middleware

const {
  createTrendingProduct,
  getTrendingProducts,
  getTrendingProductById,
  updateTrendingProduct,
  deleteTrendingProduct,
} = require("../controllers/trendingProductController");

// @route   POST /api/trending-products
// @desc    Create a trending product
router.post("/", upload.single("image"), createTrendingProduct);

// @route   GET /api/trending-products
// @desc    Get all trending products
router.get("/", getTrendingProducts);

// @route   GET /api/trending-products/:id
// @desc    Get single trending product by ID
router.get("/:id", getTrendingProductById);

// @route   PUT /api/trending-products/:id
// @desc    Update a trending product
router.put("/:id", upload.single("image"), updateTrendingProduct);

// @route   DELETE /api/trending-products/:id
// @desc    Delete a trending product
router.delete("/:id", deleteTrendingProduct);

module.exports = router;

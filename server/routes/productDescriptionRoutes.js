const express = require("express");
const router = express.Router();
const {
  createOrUpdateProductDescription,
  getProductDescription,
  deleteProductDescription,
} = require("../controllers/productDescription");
const upload = require("../middleware/upload");

router.post(
  "/product-description",
  upload.array("images", 10), // 'images' key from Postman or frontend
  createOrUpdateProductDescription
);
router.delete("/description/:productId", deleteProductDescription);

module.exports = router;

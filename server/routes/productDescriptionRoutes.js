const express = require("express");
const router = express.Router();
const {
  createProductDescription,
  updateProductDescription,
  uploadDescriptionImages,
  getDescriptionByProduct,
  deleteProductDescription,
} = require("../controllers/productDescription");
const upload = require("../middleware/upload");

router.post("/", createProductDescription);
router.put("/:id", updateProductDescription);
router.post("/upload-images", upload.array("images"), uploadDescriptionImages);
router.get("/:productId", getDescriptionByProduct);
router.delete("/:id", deleteProductDescription);

module.exports = router;

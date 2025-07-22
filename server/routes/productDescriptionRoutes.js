const express = require("express");
const router = express.Router();
const {
  createOrUpdateProductDescription,
  getProductDescription,
  deleteProductDescription,
} = require("../controllers/productDescription");

router.post("/description/:productId", createOrUpdateProductDescription);
router.get("/description/:productId", getProductDescription);
router.delete("/description/:productId", deleteProductDescription);

module.exports = router;

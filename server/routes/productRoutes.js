const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.softDeleteProduct);
router.get("/:id", productController.getProductById);

module.exports = router;

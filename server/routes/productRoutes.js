const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/upload");

router.post("/", upload.array("images"), productController.createProduct);
router.put("/:id", upload.array("images"), productController.updateProduct);
router.patch("/archive/:id", productController.softDeleteProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/filter", productController.filterProducts);

module.exports = router;

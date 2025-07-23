const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const upload = require("../middleware/upload");

router.post("/", upload.single("image"), categoryController.createCategory);
router.put("/:id", upload.single("image"), categoryController.updateCategory);
router.patch("/:id/archive", categoryController.archiveCategory);
router.get("/", categoryController.getAllCategories);
router.get("/by-parent/:parentId", categoryController.getByParentEntity);

module.exports = router;

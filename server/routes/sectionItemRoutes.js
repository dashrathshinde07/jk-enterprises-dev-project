const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // temporary disk storage

const {
  createSectionItem,
  getAllSectionItems,
  getSectionItemById,
  updateSectionItem,
  deleteSectionItem,
} = require("../controllers/sectionItemController");

router.post("/", upload.single("image"), createSectionItem);
router.get("/", getAllSectionItems);
router.get("/:id", getSectionItemById);
router.put("/:id", upload.single("image"), updateSectionItem);
router.delete("/:id", deleteSectionItem);

module.exports = router;

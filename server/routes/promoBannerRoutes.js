const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  createPromoBanner,
  getAllPromoBanners,
  getPromoBannerById,
  updatePromoBanner,
  deletePromoBanner,
} = require("../controllers/promoBannerController");

router.post("/", upload.single("image"), createPromoBanner);
router.get("/", getAllPromoBanners);
router.get("/:id", getPromoBannerById);
router.put("/:id", upload.single("image"), updatePromoBanner);
router.delete("/:id", deletePromoBanner);

module.exports = router;

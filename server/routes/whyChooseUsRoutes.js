const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // Multer middleware for Cloudinary
const {
  createWhyChooseUs,
  getAllWhyChooseUs,
  updateWhyChooseUs,
  deleteWhyChooseUs,
} = require("../controllers/whyChooseUs");

// @route   POST /api/why-choose-us
// @desc    Create new WhyChooseUs item
router.post("/", upload.single("icon"), createWhyChooseUs);

// @route   GET /api/why-choose-us
// @desc    Get all WhyChooseUs items
router.get("/", getAllWhyChooseUs);

// @route   PUT /api/why-choose-us/:id
// @desc    Update WhyChooseUs item (also replaces Cloudinary image)
router.put("/:id", upload.single("icon"), updateWhyChooseUs);

// @route   DELETE /api/why-choose-us/:id
// @desc    Delete WhyChooseUs item and its image from Cloudinary
router.delete("/:id", deleteWhyChooseUs);

module.exports = router;

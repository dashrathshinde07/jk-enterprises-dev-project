const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // multer middleware

const {
  createWhyChooseUs,
  getAllWhyChooseUs,
  getWhyChooseUsById,
  updateWhyChooseUs,
  deleteWhyChooseUs,
} = require("../controllers/whyChooseUs");

// @route   POST /api/why-choose-us
// @desc    Create new WhyChooseUs item
router.post("/", upload.single("icon"), createWhyChooseUs);

// @route   GET /api/why-choose-us
// @desc    Get all WhyChooseUs items
router.get("/", getAllWhyChooseUs);

// @route   GET /api/why-choose-us/:id
// @desc    Get single WhyChooseUs item
router.get("/:id", getWhyChooseUsById);

// @route   PUT /api/why-choose-us/:id
// @desc    Update WhyChooseUs item (text + optional image)
router.put("/:id", upload.single("icon"), updateWhyChooseUs);

// @route   DELETE /api/why-choose-us/:id
// @desc    Delete WhyChooseUs item and Cloudinary image
router.delete("/:id", deleteWhyChooseUs);

module.exports = router;

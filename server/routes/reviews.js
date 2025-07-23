const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createReview,
  getAllReviews,
  getReviewById,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", upload.single("profileImage"), createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.delete("/:id", deleteReview);

module.exports = router;

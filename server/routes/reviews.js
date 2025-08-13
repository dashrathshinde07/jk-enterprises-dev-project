// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/upload");

// const {
//   createReview,
//   getAllReviews,
//   getReviewById,
//   deleteReview,
// } = require("../controllers/reviewController");

// router.post("/", upload.single("profileImage"), createReview);
// router.get("/", getAllReviews);
// router.get("/:id", getReviewById);
// router.delete("/:id", deleteReview);

// module.exports = router;


const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById, // ✅ Import update controller
  deleteReview,
} = require("../controllers/reviewController");

// ✅ Create a new review
router.post("/", upload.single("profileImage"), createReview);

// ✅ Get all reviews
router.get("/", getAllReviews);

// ✅ Get a review by ID
router.get("/:id", getReviewById);

// ✅ Update a review by ID
router.put("/:id", upload.single("profileImage"), updateReviewById);

// ✅ Delete a review by ID
router.delete("/:id", deleteReview);

module.exports = router;
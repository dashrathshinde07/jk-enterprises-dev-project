const Review = require("../models/Review");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

// ✅ CREATE a new review
exports.createReview = async (req, res) => {
  try {
    const { name, rating, reviewDate, reviewText_en, reviewText_mr } = req.body;

    let imageUrl = null;
    let cloudinaryId = null;

    if (req.file) {
      const result = await uploadImageToCloudinary(req.file.path, "reviews");
      imageUrl = result.secure_url;
      cloudinaryId = result.public_id;
    }

    const newReview = await Review.create({
      name,
      rating,
      reviewDate,
      reviewText: { en: reviewText_en, mr: reviewText_mr },
      profileImage: imageUrl,
      cloudinaryId,
    });

    res.status(201).json(newReview);
  } catch (err) {
    console.error("Create Review Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET all reviews (latest first)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ reviewDate: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Get All Reviews Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    res.status(200).json(review);
  } catch (err) {
    console.error("Get Review By ID Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE review (also deletes Cloudinary image)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.cloudinaryId) {
      await deleteImageFromCloudinary(review.cloudinaryId);
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Delete Review Error:", err);
    res.status(500).json({ message: err.message });
  }
};

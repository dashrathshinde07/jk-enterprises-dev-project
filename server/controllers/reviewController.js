const Review = require("../models/Review");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

// ✅ CREATE a new review
exports.createReview = async (req, res) => {
  try {
    const { name, rating, reviewDate, reviewText_en, reviewText_mr } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { url, public_id } = await uploadImageToCloudinary(req.file.path);

    const newReview = await Review.create({
      name,
      rating,
      reviewDate,
      reviewText: { en: reviewText_en, mr: reviewText_mr },
      profileImage: url,
      cloudinaryId: public_id,
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

// ✅ UPDATE review by ID
exports.updateReviewById = async (req, res) => {
  try {
    const { name, rating, reviewDate, reviewText_en, reviewText_mr } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });


    if (req.file) {
      await deleteImageFromCloudinary(review.cloudinaryId);
      const { url, public_id } = await uploadImageToCloudinary(req.file.path);
      review.profileImage = url;
      review.cloudinaryId = public_id;
    }

    review.name = name || review.name;
    review.rating = rating || review.rating;
    review.reviewDate = reviewDate || review.reviewDate;
    review.reviewText = {
      en: reviewText_en || review.reviewText.en,
      mr: reviewText_mr || review.reviewText.mr,
    };

    const updatedReview = await review.save();
    res.status(200).json(updatedReview);
  } catch (err) {
    console.error("Update Review Error:", err);
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
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profileImage: { type: String }, // optional image URL
    cloudinaryId: { type: String }, // 🔁 needed to delete image later
    rating: { type: Number, required: true },
    reviewDate: { type: Date, required: true },
    reviewText: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);

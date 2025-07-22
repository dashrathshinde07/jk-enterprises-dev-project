const mongoose = require("mongoose");

const productRatingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional if you want to relate to a User model
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductRating", productRatingSchema);

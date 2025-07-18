const mongoose = require("mongoose");

const trendingProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: "View Details",
    },
    maxCapacity: {
      type: String, // e.g., "300kg"
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TrendingProduct", trendingProductSchema);

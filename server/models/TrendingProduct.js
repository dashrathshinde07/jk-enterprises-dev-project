const mongoose = require("mongoose");

const trendingProductSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    category: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
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
      en: { type: String, default: "View Details" },
      mr: { type: String, default: "तपशील पाहा" },
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

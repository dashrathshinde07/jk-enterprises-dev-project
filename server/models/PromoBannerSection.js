const mongoose = require("mongoose");

const promoBannerSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    subtitle: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    tagline: {
      en: { type: String },
      mr: { type: String },
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
      required: true,
    },
    ctaText: {
      en: { type: String, default: null },
      mr: { type: String, default: null },
    },
    ctaLink: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PromoBanner", promoBannerSchema);

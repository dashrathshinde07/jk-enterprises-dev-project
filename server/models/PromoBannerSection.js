const mongoose = require("mongoose");

const promoBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: false,
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
      type: String,
      default: null, // optional call to action
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

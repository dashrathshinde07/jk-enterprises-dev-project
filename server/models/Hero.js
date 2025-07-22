const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    headline: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    subHeadline: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    buttonText: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    buttonLink: { type: String, required: true },
    backgroundImageUrl: String,
    backgroundImagePublicId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);

const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    headline: String,
    subHeadline: String,
    buttonText: String,
    buttonLink: String,
    backgroundImageUrl: String,
    backgroundImagePublicId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);

// models/ProductDescription.js

const mongoose = require("mongoose");

const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "image", "bullet", "video", "imageText"],
    required: true,
  },
  enText: { type: String },
  mrText: { type: String },
  image: { type: String }, // Cloudinary URL
  points: [
    {
      en: { type: String },
      mr: { type: String },
    },
  ],
  videoUrl: { type: String },
});

const productDescriptionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },
    blocks: [contentBlockSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductDescription", productDescriptionSchema);

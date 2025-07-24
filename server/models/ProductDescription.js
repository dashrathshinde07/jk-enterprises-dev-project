const mongoose = require("mongoose");

const productDescriptionBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "bulletPoints", "images", "youtubeVideo"],
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    text: {
      en: { type: String },
      mr: { type: String },
    },
    bulletPoints: [
      {
        en: String,
        mr: String,
      },
    ],
    images: [String], // Cloudinary URLs
    youtubeUrl: String,
  },
  { _id: false }
);

const productDescriptionSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    blocks: [productDescriptionBlockSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductDescription", productDescriptionSchema);

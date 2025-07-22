const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nameEn: { type: String, required: true },
    nameMr: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productDescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDescription",
    },
    tags: [String],
    searchableKeywords: [String],
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    sku: String,
    mrp: Number,
    sellingPrice: { type: Number, required: true },
    brand: String,
    stock: Number,
    warranty: String,
    dimensions: String,
    logisticsInfo: String,
    ratings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductRating",
    },
    url: String,
    archive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

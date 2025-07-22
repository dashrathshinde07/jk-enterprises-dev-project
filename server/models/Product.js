const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name_en: {
      type: String,
      required: true,
      trim: true,
    },
    name_mr: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
    mrp: {
      type: Number,
      default: 0,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
    },
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    tags: [String],
    searchKeywords: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDescription",
    },
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductRating",
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    warranty: {
      type: String, // e.g., "6 months", "1 year"
    },
    dimensions: {
      height: Number,
      width: Number,
      depth: Number,
      unit: {
        type: String,
        default: "cm",
      },
    },
    weight: {
      value: Number,
      unit: {
        type: String,
        default: "kg",
      },
    },
    logisticsInfo: {
      deliveryTime: String,
      shippingCharge: Number,
      returnPolicy: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    englishTitle: {
      type: String,
      required: true,
      trim: true,
    },
    marathiTitle: {
      type: String,
      required: true,
      trim: true,
    },
    enDescription: {
      type: String,
      required: true,
    },
    mrDescription: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String, // Can also be ObjectId
    },
    archive: {
      type: Boolean,
      default: false, // Soft delete flag
    },
    parentEntity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParentEntity",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);

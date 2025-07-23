const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    content: {
      en: { type: String },
      mr: { type: String },
    },
    category: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
      required: true,
    },
    author: {
      name: { type: String, required: true },
      profileImageUrl: { type: String },
      profileImagePublicId: { type: String },
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);

const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "image", "video", "bullet", "imageText"],
    required: true,
  },
  text: String,
  image: String, // Cloudinary URL
  videoUrl: String,
  bullets: [String],
  enText: String,
  mrText: String,
});

const ProductDescriptionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },
    blocks: [BlockSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductDescription", ProductDescriptionSchema);

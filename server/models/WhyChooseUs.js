const mongoose = require("mongoose");

const whyChooseUsSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    iconUrl: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WhyChooseUs", whyChooseUsSchema);

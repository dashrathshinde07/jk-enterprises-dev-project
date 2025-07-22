const mongoose = require("mongoose");

const sectionItemSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    mr: { type: String, required: true },
  },
  description: {
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
});

module.exports = mongoose.model("SectionItem", sectionItemSchema);

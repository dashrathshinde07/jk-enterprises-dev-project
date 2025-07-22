// models/Footer.js
const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema(
  {
    logoUrl: { type: String, required: true },
    logoPublicId: { type: String, required: true },
    description: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    links: [
      {
        label: {
          en: { type: String, required: true },
          mr: { type: String, required: true },
        },
        url: { type: String, required: true },
      },
    ],
    contact: {
      phone: {
        en: { type: String, required: true },
        mr: { type: String, required: true },
      },
      address: {
        en: { type: String, required: true },
        mr: { type: String, required: true },
      },
    },
    socialLinks: {
      facebook: String,
      instagram: String,
      linkedin: String,
    },
    developedBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Footer", footerSchema);

const mongoose = require('mongoose');

const productDescriptionSchema = new mongoose.Schema(
  {
    shortDescription: { type: String, required: true },
    longDescription: { type: String },
    productUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ProductDescription', productDescriptionSchema);

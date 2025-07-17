const PromoBanner = require("../models/PromoBannerSection");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

// Create Promo Banner
const createPromoBanner = async (req, res) => {
  try {
    const { title, subtitle, tagline, ctaText, ctaLink } = req.body;
    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const filePath = req.file.path;
    const imageData = await uploadImageToCloudinary(filePath, "promo-banners");

    const newBanner = await PromoBanner.create({
      title,
      subtitle,
      tagline,
      ctaText,
      ctaLink,
      imageUrl: imageData.url,
      imagePublicId: imageData.public_id,
    });

    res.status(201).json(newBanner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Promo Banners
const getAllPromoBanners = async (req, res) => {
  try {
    const banners = await PromoBanner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Promo Banner by ID
const getPromoBannerById = async (req, res) => {
  try {
    const banner = await PromoBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Promo Banner
const updatePromoBanner = async (req, res) => {
  try {
    const { title, subtitle, tagline, ctaText, ctaLink } = req.body;
    const banner = await PromoBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    if (req.file) {
      // Delete old image from Cloudinary
      await deleteImageFromCloudinary(banner.imagePublicId);
      // Upload new image
      const newImageData = await uploadImageToCloudinary(
        req.file.path,
        "promo-banners"
      );
      banner.imageUrl = newImageData.url;
      banner.imagePublicId = newImageData.public_id;
    }

    // Update text fields
    banner.title = title || banner.title;
    banner.subtitle = subtitle || banner.subtitle;
    banner.tagline = tagline || banner.tagline;
    banner.ctaText = ctaText || banner.ctaText;
    banner.ctaLink = ctaLink || banner.ctaLink;

    await banner.save();
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Promo Banner
const deletePromoBanner = async (req, res) => {
  try {
    const banner = await PromoBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    await deleteImageFromCloudinary(banner.imagePublicId);
    await banner.deleteOne();

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPromoBanner,
  getAllPromoBanners,
  getPromoBannerById,
  updatePromoBanner,
  deletePromoBanner,
};

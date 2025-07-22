const PromoBanner = require("../models/PromoBannerSection");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

// CREATE Promo Banner
const createPromoBanner = async (req, res) => {
  try {
    const {
      title_en,
      title_mr,
      subtitle_en,
      subtitle_mr,
      tagline_en,
      tagline_mr,
      ctaText_en,
      ctaText_mr,
      ctaLink,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageData = await uploadImageToCloudinary(
      req.file.path,
      "promo-banners"
    );

    const newBanner = await PromoBanner.create({
      title: { en: title_en, mr: title_mr },
      subtitle: { en: subtitle_en, mr: subtitle_mr },
      tagline: { en: tagline_en || "", mr: tagline_mr || "" },
      ctaText: { en: ctaText_en || "", mr: ctaText_mr || "" },
      ctaLink,
      imageUrl: imageData.url,
      imagePublicId: imageData.public_id,
    });

    res.status(201).json(newBanner);
  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET all Promo Banners
const getAllPromoBanners = async (req, res) => {
  try {
    const banners = await PromoBanner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET single Promo Banner
const getPromoBannerById = async (req, res) => {
  try {
    const banner = await PromoBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE Promo Banner (with image cleanup)
const updatePromoBanner = async (req, res) => {
  try {
    const {
      title_en,
      title_mr,
      subtitle_en,
      subtitle_mr,
      tagline_en,
      tagline_mr,
      ctaText_en,
      ctaText_mr,
      ctaLink,
    } = req.body;

    const banner = await PromoBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    // Handle image replacement
    if (req.file) {
      if (banner.imagePublicId) {
        try {
          await deleteImageFromCloudinary(banner.imagePublicId);
        } catch (err) {
          console.warn(
            "Failed to delete old image from Cloudinary",
            err.message
          );
        }
      }

      const newImageData = await uploadImageToCloudinary(
        req.file.path,
        "promo-banners"
      );
      banner.imageUrl = newImageData.url;
      banner.imagePublicId = newImageData.public_id;
    }

    // Update text fields
    banner.title = {
      en: title_en || banner.title.en,
      mr: title_mr || banner.title.mr,
    };
    banner.subtitle = {
      en: subtitle_en || banner.subtitle.en,
      mr: subtitle_mr || banner.subtitle.mr,
    };
    banner.tagline = {
      en: tagline_en || banner.tagline.en,
      mr: tagline_mr || banner.tagline.mr,
    };
    banner.ctaText = {
      en: ctaText_en || banner.ctaText.en,
      mr: ctaText_mr || banner.ctaText.mr,
    };
    banner.ctaLink = ctaLink || banner.ctaLink;

    await banner.save();
    res.status(200).json(banner);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE Promo Banner + Cloudinary image
const deletePromoBanner = async (req, res) => {
  try {
    const banner = await PromoBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    if (banner.imagePublicId) {
      try {
        await deleteImageFromCloudinary(banner.imagePublicId);
      } catch (err) {
        console.warn("Cloudinary image delete failed:", err.message);
      }
    }

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

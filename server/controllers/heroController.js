const Hero = require("../models/Hero");
const cloudinary = require("../config/cloudinary");

// GET all hero sections
exports.getAllHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ createdAt: -1 });
    res.json(heroes);
  } catch (error) {
    console.error("Get All Heroes Error:", error);
    res.status(500).json({ message: "Failed to fetch hero sections" });
  }
};

// GET single hero by ID
exports.getHeroById = async (req, res) => {
  try {
    const { id } = req.params;
    const hero = await Hero.findById(id);
    if (!hero) return res.status(404).json({ message: "Hero not found" });
    res.json(hero);
  } catch (error) {
    console.error("Get Hero By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch hero section" });
  }
};

// CREATE new hero section
exports.createHero = async (req, res) => {
  try {
    const {
      headline_en,
      headline_mr,
      subHeadline_en,
      subHeadline_mr,
      buttonText_en,
      buttonText_mr,
      buttonLink,
    } = req.body;

    const imageData = {};
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageData.backgroundImageUrl = result.secure_url;
      imageData.backgroundImagePublicId = result.public_id;
    }

    const newHero = new Hero({
      headline: { en: headline_en, mr: headline_mr },
      subHeadline: { en: subHeadline_en, mr: subHeadline_mr },
      buttonText: { en: buttonText_en, mr: buttonText_mr },
      buttonLink,
      ...imageData,
    });

    await newHero.save();
    res.status(201).json(newHero);
  } catch (error) {
    console.error("Create Hero Error:", error);
    res.status(500).json({ message: "Failed to create hero section" });
  }
};

// UPDATE hero by ID (with optional fields)
exports.updateHeroById = async (req, res) => {
  try {
    const { id } = req.params;
    const hero = await Hero.findById(id);
    if (!hero) return res.status(404).json({ message: "Hero not found" });

    const {
      headline_en,
      headline_mr,
      subHeadline_en,
      subHeadline_mr,
      buttonText_en,
      buttonText_mr,
      buttonLink,
    } = req.body;

    const updatedData = {};

    if (headline_en || headline_mr) {
      updatedData.headline = {
        en: headline_en ?? hero.headline.en,
        mr: headline_mr ?? hero.headline.mr,
      };
    }

    if (subHeadline_en || subHeadline_mr) {
      updatedData.subHeadline = {
        en: subHeadline_en ?? hero.subHeadline.en,
        mr: subHeadline_mr ?? hero.subHeadline.mr,
      };
    }

    if (buttonText_en || buttonText_mr) {
      updatedData.buttonText = {
        en: buttonText_en ?? hero.buttonText.en,
        mr: buttonText_mr ?? hero.buttonText.mr,
      };
    }

    if (buttonLink) updatedData.buttonLink = buttonLink;

    // Handle image replacement
    if (req.file) {
      if (hero.backgroundImagePublicId) {
        try {
          await cloudinary.uploader.destroy(hero.backgroundImagePublicId);
        } catch (err) {
          console.warn("Failed to delete old image:", err);
        }
      }

      const result = await cloudinary.uploader.upload(req.file.path);
      updatedData.backgroundImageUrl = result.secure_url;
      updatedData.backgroundImagePublicId = result.public_id;
    }

    const updatedHero = await Hero.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.json(updatedHero);
  } catch (error) {
    console.error("Update Hero By ID Error:", error);
    res.status(500).json({ message: "Failed to update hero section" });
  }
};

// DELETE hero by ID
exports.deleteHeroById = async (req, res) => {
  try {
    const { id } = req.params;

    const hero = await Hero.findById(id);
    if (!hero) return res.status(404).json({ message: "Hero not found" });

    if (hero.backgroundImagePublicId) {
      try {
        await cloudinary.uploader.destroy(hero.backgroundImagePublicId);
      } catch (err) {
        console.warn("Failed to delete Cloudinary image:", err);
      }
    }

    await Hero.findByIdAndDelete(id);
    res.json({ message: "Hero section deleted successfully" });
  } catch (error) {
    console.error("Delete Hero By ID Error:", error);
    res.status(500).json({ message: "Failed to delete hero section" });
  }
};

const Hero = require("../models/Hero");
const cloudinary = require("../config/cloudinary");

// @desc GET hero section
exports.getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: "Failed to get hero section" });
  }
};

// @desc CREATE hero section (only once ideally)
exports.createHero = async (req, res) => {
  try {
    const { headline, subHeadline, buttonText, buttonLink } = req.body;

    const imageData = {};
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageData.backgroundImageUrl = result.secure_url;
      imageData.backgroundImagePublicId = result.public_id;
    }

    const newHero = new Hero({
      headline,
      subHeadline,
      buttonText,
      buttonLink,
      ...imageData,
    });

    await newHero.save();
    res.status(201).json(newHero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create hero section" });
  }
};

// @desc UPDATE hero section (text or image)
exports.updateHero = async (req, res) => {
  try {
    const { headline, subHeadline, buttonText, buttonLink } = req.body;

    const hero = await Hero.findOne();
    let imageData = {};

    if (req.file) {
      // Delete old image from Cloudinary
      if (hero?.backgroundImagePublicId) {
        await cloudinary.uploader.destroy(hero.backgroundImagePublicId);
      }

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      imageData.backgroundImageUrl = result.secure_url;
      imageData.backgroundImagePublicId = result.public_id;
    }

    const updatedHero = await Hero.findOneAndUpdate(
      {},
      {
        headline,
        subHeadline,
        buttonText,
        buttonLink,
        ...imageData,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json(updatedHero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update hero section" });
  }
};

// @desc DELETE hero section + image
exports.deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) return res.status(404).json({ message: "Hero not found" });

    // Delete image from Cloudinary
    if (hero.backgroundImagePublicId) {
      await cloudinary.uploader.destroy(hero.backgroundImagePublicId);
    }

    // Delete the document from DB
    await Hero.deleteOne({ _id: hero._id });

    res.json({ message: "Hero section deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete hero section" });
  }
};

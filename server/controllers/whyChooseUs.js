const WhyChooseUs = require("../models/WhyChooseUs");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

// ✅ Create a new entry
exports.createWhyChooseUs = async (req, res) => {
  try {
    const {
      title_en,
      title_mr,
      description_en,
      description_mr,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { url, public_id } = await uploadImageToCloudinary(
      req.file.path,
      "whyChooseUs"
    );

    const newEntry = await WhyChooseUs.create({
      title: { en: title_en, mr: title_mr },
      description: { en: description_en, mr: description_mr },
      iconUrl: url,
      cloudinaryId: public_id,
    });

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ message: "Failed to create entry" });
  }
};

// ✅ Get all entries
exports.getAllWhyChooseUs = async (req, res) => {
  try {
    const data = await WhyChooseUs.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

// ✅ Get single entry by ID
exports.getWhyChooseUsById = async (req, res) => {
  try {
    const entry = await WhyChooseUs.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    res.status(200).json(entry);
  } catch (error) {
    console.error("Get by ID Error:", error);
    res.status(500).json({ message: "Failed to get entry" });
  }
};

// ✅ Update entry (optional image + language support)
exports.updateWhyChooseUs = async (req, res) => {
  try {
    const {
      title_en,
      title_mr,
      description_en,
      description_mr,
    } = req.body;

    const entry = await WhyChooseUs.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    let iconUrl = entry.iconUrl;
    let cloudinaryId = entry.cloudinaryId;

    // Replace image if uploaded
    if (req.file) {
      if (cloudinaryId) {
        try {
          await deleteImageFromCloudinary(cloudinaryId);
        } catch (err) {
          console.warn("Cloudinary delete warning:", err.message);
        }
      }

      const newImage = await uploadImageToCloudinary(req.file.path, "whyChooseUs");
      iconUrl = newImage.url;
      cloudinaryId = newImage.public_id;
    }

    entry.title = {
      en: title_en || entry.title.en,
      mr: title_mr || entry.title.mr,
    };

    entry.description = {
      en: description_en || entry.description.en,
      mr: description_mr || entry.description.mr,
    };

    entry.iconUrl = iconUrl;
    entry.cloudinaryId = cloudinaryId;

    await entry.save();

    res.status(200).json(entry);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update entry" });
  }
};

// ✅ Delete entry and its Cloudinary image
exports.deleteWhyChooseUs = async (req, res) => {
  try {
    const entry = await WhyChooseUs.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    if (entry.cloudinaryId) {
      try {
        await deleteImageFromCloudinary(entry.cloudinaryId);
      } catch (err) {
        console.warn("Cloudinary delete warning:", err.message);
      }
    }

    await entry.deleteOne();
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete entry" });
  }
};

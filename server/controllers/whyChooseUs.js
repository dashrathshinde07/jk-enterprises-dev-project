const WhyChooseUs = require("../models/WhyChooseUs");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

// Create a new entry
exports.createWhyChooseUs = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const { url, public_id } = await uploadImageToCloudinary(
      req.file.path,
      "whyChooseUs"
    );

    const newEntry = await WhyChooseUs.create({
      title: req.body.title,
      description: req.body.description,
      iconUrl: url,
      cloudinaryId: public_id,
    });

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error while creating WhyChooseUs entry:", error);
    res
      .status(500)
      .json({ message: "Failed to create entry", error: error.message });
  }
};

// Get all entries
exports.getAllWhyChooseUs = async (req, res) => {
  try {
    const data = await WhyChooseUs.find().sort({ createdAt: -1 }); // optional: latest first
    res.status(200).json(data);
  } catch (error) {
    console.error("Error while fetching WhyChooseUs entries:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch data", error: error.message });
  }
};

// Update entry (image upload is optional)
exports.updateWhyChooseUs = async (req, res) => {
  try {
    const entry = await WhyChooseUs.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    let url = entry.iconUrl;
    let public_id = entry.cloudinaryId;

    if (req.file) {
      // Delete old image
      await deleteImageFromCloudinary(public_id);

      // Upload new image
      const result = await uploadImageToCloudinary(
        req.file.path,
        "whyChooseUs"
      );
      url = result.url;
      public_id = result.public_id;
    }

    const updated = await WhyChooseUs.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title || entry.title,
        description: req.body.description || entry.description,
        iconUrl: url,
        cloudinaryId: public_id,
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error while updating WhyChooseUs entry:", error);
    res
      .status(500)
      .json({ message: "Failed to update entry", error: error.message });
  }
};

// Delete entry and its image
exports.deleteWhyChooseUs = async (req, res) => {
  try {
    const entry = await WhyChooseUs.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    // Delete image from Cloudinary
    await deleteImageFromCloudinary(entry.cloudinaryId);

    // Delete from DB
    await entry.deleteOne();

    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error while deleting WhyChooseUs entry:", error);
    res
      .status(500)
      .json({ message: "Failed to delete entry", error: error.message });
  }
};

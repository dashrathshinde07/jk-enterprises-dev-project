// controllers/footerController.js
const Footer = require("../models/Footer");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

exports.createFooter = async (req, res) => {
  try {


    const {
      description_en,
      description_mr,
      links,
      phone_en,
      phone_mr,
      address_en,
      address_mr,
      facebook,
      instagram,
      linkedin,
      developedBy,
    } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Logo image required" });

    const { url, public_id } = await uploadImageToCloudinary(
      req.file.path,
      "footer"
    );

    const parsedLinks = JSON.parse(links);
    const formattedLinks = parsedLinks.map((link) => ({
      label: { en: link.label_en, mr: link.label_mr },
      url: link.url,
    }));

    const newFooter = await Footer.create({
      logoUrl: url,
      logoPublicId: public_id,
      description: { en: description_en, mr: description_mr },
      links: formattedLinks,
      contact: {
        phone: { en: phone_en, mr: phone_mr },
        address: { en: address_en, mr: address_mr },
      },
      socialLinks: { facebook, instagram, linkedin },
      developedBy,
    });

    res.status(201).json(newFooter);

  } catch (error) {
    console.error("Create Footer Error:", error);
    res.status(500).json({ message: "Failed to create footer" });
  }
};

exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.find();
    res.status(200).json(footer);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch footer" });
  }
};

exports.getFooterById = async (req, res) => {
  try {
    const footer = await Footer.findById(req.params.id);
    if (!footer) return res.status(404).json({ message: "Footer not found" });
    res.status(200).json(footer);
  } catch (error) {
    res.status(500).json({ message: "Failed to get footer by ID" });
  }
};

exports.updateFooterById = async (req, res) => {
  try {
    const {
      description_en,
      description_mr,
      links,
      phone_en,
      phone_mr,
      address_en,
      address_mr,
      facebook,
      instagram,
      linkedin,
      developedBy,
    } = req.body;

    const footer = await Footer.findById(req.params.id);
    if (!footer) return res.status(404).json({ message: "Footer not found" });

    if (req.file) {
      await deleteImageFromCloudinary(footer.logoPublicId);
      const { url, public_id } = await uploadImageToCloudinary(
        req.file.path,
        "footer"
      );
      footer.logoUrl = url;
      footer.logoPublicId = public_id;
    }

    if (links) {
      const parsedLinks = JSON.parse(links);
      footer.links = parsedLinks.map((link) => ({
        label: { en: link.label_en, mr: link.label_mr },
        url: link.url,
      }));
    }

    footer.description = {
      en: description_en || footer.description.en,
      mr: description_mr || footer.description.mr,
    };

    footer.contact = {
      phone: {
        en: phone_en || footer.contact.phone.en,
        mr: phone_mr || footer.contact.phone.mr,
      },
      address: {
        en: address_en || footer.contact.address.en,
        mr: address_mr || footer.contact.address.mr,
      },
    };

    footer.socialLinks = {
      facebook: facebook || footer.socialLinks.facebook,
      instagram: instagram || footer.socialLinks.instagram,
      linkedin: linkedin || footer.socialLinks.linkedin,
    };

    footer.developedBy = developedBy || footer.developedBy;

    await footer.save();
    res.status(200).json(footer);
  } catch (error) {
    console.error("Update Footer by ID Error:", error);
    res.status(500).json({ message: "Failed to update footer by ID" });
  }
};

exports.deleteFooterById = async (req, res) => {
  try {
    const footer = await Footer.findById(req.params.id);
    if (!footer) return res.status(404).json({ message: "Footer not found" });

    await deleteImageFromCloudinary(footer.logoPublicId);
    await footer.deleteOne();

    res.status(200).json({ message: "Footer deleted successfully" });
  } catch (error) {
    console.error("Delete Footer by ID Error:", error);
    res.status(500).json({ message: "Failed to delete footer by ID" });
  }
};

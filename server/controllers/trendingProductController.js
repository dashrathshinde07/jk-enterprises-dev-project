const TrendingProduct = require("../models/TrendingProduct");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

// ✅ CREATE
exports.createTrendingProduct = async (req, res) => {
  try {
    const {
      title_en,
      title_mr,
      category_en,
      category_mr,
      description_en,
      description_mr,
      buttonText_en,
      buttonText_mr,
      maxCapacity,
      isFeatured,
    } = req.body;

    console.log("Rani", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { url, public_id } = await uploadImageToCloudinary(req.file.path);

    const product = new TrendingProduct({
      title: { en: title_en, mr: title_mr },
      category: { en: category_en, mr: category_mr },
      description: { en: description_en, mr: description_mr },
      buttonText: {
        en: buttonText_en || "View Details",
        mr: buttonText_mr || "तपशील पाहा",
      },
      imageUrl: url,
      cloudinaryId: public_id,
      maxCapacity,
      isFeatured: isFeatured ?? true,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// ✅ READ - Get All
exports.getTrendingProducts = async (req, res) => {
  try {
    const products = await TrendingProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// ✅ READ - Get Single Product by ID
exports.getTrendingProductById = async (req, res) => {
  try {
    const product = await TrendingProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// ✅ UPDATE
exports.updateTrendingProduct = async (req, res) => {
  try {

    const id = req.params.id;
    const product = await TrendingProduct.findById(id.toString());

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle image replacement
    if (req.file) {
      await deleteImageFromCloudinary(product.cloudinaryId);
      const { url, public_id } = await uploadImageToCloudinary(req.file.path);
      product.imageUrl = url;
      product.cloudinaryId = public_id;
    }

    product.title = {
      en: req.body.title_en || product.title.en,
      mr: req.body.title_mr || product.title.mr,
    };

    product.category = {
      en: req.body.category_en || product.category.en,
      mr: req.body.category_mr || product.category.mr,
    };

    product.description = {
      en: req.body.description_en || product.description.en,
      mr: req.body.description_mr || product.description.mr,
    };

    product.buttonText = {
      en: req.body.buttonText_en || product.buttonText.en,
      mr: req.body.buttonText_mr || product.buttonText.mr,
    };

    product.maxCapacity = req.body.maxCapacity || product.maxCapacity;
    product.isFeatured = req.body.isFeatured ?? product.isFeatured;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// ✅ DELETE
exports.deleteTrendingProduct = async (req, res) => {
  try {
    const product = await TrendingProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await deleteImageFromCloudinary(product.cloudinaryId);
    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

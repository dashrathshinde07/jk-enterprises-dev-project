const TrendingProduct = require("../models/TrendingProduct");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinaryOperations");

// CREATE
exports.createTrendingProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const { url, public_id } = await uploadImageToCloudinary(req.file.path);

    const product = new TrendingProduct({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      imageUrl: url,
      cloudinaryId: public_id,
      buttonText: req.body.buttonText || "View Details",
      maxCapacity: req.body.maxCapacity,
      isFeatured: req.body.isFeatured ?? true,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// READ - Get All
exports.getTrendingProducts = async (req, res) => {
  try {
    const products = await TrendingProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// UPDATE
exports.updateTrendingProduct = async (req, res) => {
  try {
    const product = await TrendingProduct.findById(req.params.id);
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

    product.title = req.body.title || product.title;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.buttonText = req.body.buttonText || product.buttonText;
    product.maxCapacity = req.body.maxCapacity || product.maxCapacity;
    product.isFeatured = req.body.isFeatured ?? product.isFeatured;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// DELETE
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

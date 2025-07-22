const Product = require("../models/Product");

// CREATE Product
exports.createProduct = async (req, res) => {
  try {
    const {
      name_en,
      name_mr,
      sku,
      mrp,
      sellingPrice,
      brand,
      category,
      tags,
      searchKeywords,
      images,
      slug,
    } = req.body;

    if (
      !name_en ||
      !name_mr ||
      !images ||
      !sellingPrice ||
      !category ||
      !slug
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.create({
      name_en,
      name_mr,
      sku,
      mrp,
      sellingPrice,
      brand,
      category,
      tags,
      searchKeywords,
      images,
      slug,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE Product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// SOFT DELETE Product
exports.softDeleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndUpdate(
      productId,
      { isArchived: true },
      { new: true }
    );

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product soft deleted", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET Product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId)
      .populate("category")
      .populate("description")
      .populate("ratings");

    if (!product || product.isArchived) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

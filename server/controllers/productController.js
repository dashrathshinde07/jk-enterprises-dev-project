const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    const {
      nameEn,
      nameMr,
      slug,
      category,
      productDescription,
      tags,
      searchableKeywords,
      sku,
      mrp,
      sellingPrice,
      brand,
      stock,
      warranty,
      dimensions,
      logisticsInfo,
      url,
    } = req.body;

    const imageFiles = req.files || [];
    const imageUploadResults = await Promise.all(
      imageFiles.map((file) =>
        cloudinary.uploader.upload(file.path).then((result) => ({
          url: result.secure_url,
          publicId: result.public_id,
        }))
      )
    );

    const newProduct = new Product({
      nameEn,
      nameMr,
      slug,
      category,
      productDescription,
      tags: tags?.split(","),
      searchableKeywords: searchableKeywords?.split(","),
      sku,
      mrp,
      sellingPrice,
      brand,
      stock,
      warranty,
      dimensions,
      logisticsInfo,
      url,
      images: imageUploadResults,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const {
      nameEn,
      nameMr,
      slug,
      category,
      productDescription,
      tags,
      searchableKeywords,
      sku,
      mrp,
      sellingPrice,
      brand,
      stock,
      warranty,
      dimensions,
      logisticsInfo,
      url,
    } = req.body;

    // Delete old images if new ones are uploaded
    if (req.files?.length) {
      for (const img of product.images) {
        if (img.publicId) await cloudinary.uploader.destroy(img.publicId);
      }
    }

    const uploadedImages = req.files?.length
      ? await Promise.all(
          req.files.map((file) =>
            cloudinary.uploader.upload(file.path).then((result) => ({
              url: result.secure_url,
              publicId: result.public_id,
            }))
          )
        )
      : product.images;

    const updatedData = {
      nameEn: nameEn ?? product.nameEn,
      nameMr: nameMr ?? product.nameMr,
      slug: slug ?? product.slug,
      category: category ?? product.category,
      productDescription: productDescription ?? product.productDescription,
      tags: tags ? tags.split(",") : product.tags,
      searchableKeywords: searchableKeywords
        ? searchableKeywords.split(",")
        : product.searchableKeywords,
      sku: sku ?? product.sku,
      mrp: mrp ?? product.mrp,
      sellingPrice: sellingPrice ?? product.sellingPrice,
      brand: brand ?? product.brand,
      stock: stock ?? product.stock,
      warranty: warranty ?? product.warranty,
      dimensions: dimensions ?? product.dimensions,
      logisticsInfo: logisticsInfo ?? product.logisticsInfo,
      url: url ?? product.url,
      images: uploadedImages,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

exports.softDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.archive = true;
    await product.save();
    res.json({ message: "Product soft deleted" });
  } catch (error) {
    console.error("Soft Delete Product Error:", error);
    res.status(500).json({ message: "Failed to archive product" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ archive: false })
      .populate("category")
      .populate("productDescription")
      .populate("ratings")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("category")
      .populate("productDescription")
      .populate("ratings");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};
// controllers/productController.js

exports.filterProducts = async (req, res) => {
  try {
    const { minPrice, maxPrice, search } = req.query;

    let filter = {
      archive: false,
    };

    if (minPrice || maxPrice) {
      filter.sellingPrice = {};
      if (minPrice) filter.sellingPrice.$gte = Number(minPrice);
      if (maxPrice) filter.sellingPrice.$lte = Number(maxPrice);
    }

    if (search) {
      const regex = new RegExp(search, "i"); // case-insensitive
      filter.$or = [
        { englishName: regex },
        { marathiName: regex },
        { brand: regex },
        { tags: regex },
        { searchableKeywords: regex },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Filter Products Error:", error);
    res.status(500).json({ message: "Failed to filter products" });
  }
};

// controllers/productDescriptionController.js

// controllers/productDescriptionController.js

const ProductDescription = require("../models/ProductDescription");

exports.createProductDescription = async (req, res) => {
  try {
    const { productId, blocks } = req.body;

    if (!productId || !Array.isArray(blocks)) {
      return res
        .status(400)
        .json({ error: "productId and blocks are required." });
    }

    const existing = await ProductDescription.findOne({ productId });

    if (existing) {
      return res
        .status(400)
        .json({ error: "Description already exists for this product." });
    }

    const description = await ProductDescription.create({ productId, blocks });

    res
      .status(201)
      .json({
        message: "Product description created successfully.",
        description,
      });
  } catch (error) {
    console.error("Error creating product description:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateProductDescription = async (req, res) => {
  try {
    const { productId, blocks } = req.body;

    if (!productId || !Array.isArray(blocks)) {
      return res
        .status(400)
        .json({ error: "productId and blocks are required." });
    }

    const existing = await ProductDescription.findOne({ productId });

    if (!existing) {
      return res.status(404).json({ error: "Product description not found." });
    }

    existing.blocks = blocks;
    await existing.save();

    res
      .status(200)
      .json({
        message: "Product description updated successfully.",
        description: existing,
      });
  } catch (error) {
    console.error("Error updating product description:", error);
    res.status(500).json({ error: "Server error" });
  }
};

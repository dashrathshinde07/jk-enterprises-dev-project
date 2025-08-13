const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

exports.createProduct = async (req, res) => {
  try {

    const {
      nameEn,
      nameMr,
      slug,
      category,
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
      weightCapacity,
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
      // productDescription,
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
      weightCapacity,
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
    const product = await Product.findById(id.toString());
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
      weightCapacity,
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
      weightCapacity: weightCapacity ?? product.weightCapacity,
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
    const {
      minPrice,
      maxPrice,
      search,
      weightCapacity,
      page = 1,
      pageSize = 10,
    } = req.query;

    const filter = {
      archive: false,
    };

    // 💰 Price range filter
    if (minPrice || maxPrice) {
      filter.sellingPrice = {};
      if (minPrice) filter.sellingPrice.$gte = Number(minPrice);
      if (maxPrice) filter.sellingPrice.$lte = Number(maxPrice);
    }

    // ⚖️ Weight Capacity filter
    if (weightCapacity) {
      filter.weightCapacity = Number(weightCapacity);
    }

    // 🔍 Search filter
    if (search) {
      const regex = new RegExp(search, "i"); // case-insensitive
      filter.$or = [
        { nameEn: regex },
        { nameMr: regex },
        { brand: regex },
        { tags: regex },
        { searchableKeywords: regex },
        { slug: regex },
      ];
    }

    // 🔢 Pagination logic
    const skip = (Number(page) - 1) * Number(pageSize);

    // 📦 Fetch total for frontend
    const total = await Product.countDocuments(filter);

    // 📥 Fetch paginated results
    const products = await Product.find(filter)
      .populate("category")
      .populate("productDescription")
      .populate("ratings")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(pageSize));

    res.json({
      total,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(total / pageSize),
      products,
    });
  } catch (error) {
    console.error("Filter Products Error:", error);
    res.status(500).json({ message: "Failed to filter products" });
  }
};

// Get all products under a specific category ID
exports.getProductsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({
      category: categoryId,
      archive: false,
    })
      .populate("category")
      .populate("productDescription")
      .populate("ratings")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("Get Products By Category ID Error:", error);
    res.status(500).json({ message: "Failed to fetch products by category" });
  }
};

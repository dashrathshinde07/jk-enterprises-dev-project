const express = require("express");
const cors = require("cors");
const heroRoutes = require("./routes/heroRoutes");
const sectionItemRoutes = require("./routes/sectionItemRoutes");
const promoBannerRoutes = require("./routes/promoBannerRoutes");
const whyChooseUsRoutes = require("./routes/whyChooseUsRoutes");
const trendingProductRoutes = require("./routes/trendingProductRoutes");
const footer = require("./routes/footer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/hero", heroRoutes); // ✅ Hero route mapping
app.use("/api/section-item", sectionItemRoutes);

app.use("/api/promo-banner/homepage", promoBannerRoutes);

app.use("/api/why-choose-us", whyChooseUsRoutes);

app.use("/api/trending-products", trendingProductRoutes);

app.use("/api/footer/", footer);

// Default route
app.get("/", (req, res) => {
  res.send("JK Enterprises API is running...");
});

module.exports = app;

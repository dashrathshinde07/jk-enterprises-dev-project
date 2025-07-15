const express = require("express");
const cors = require("cors");
// const productRoutes = require("./routes/productRoutes");
// const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/products", productRoutes);
// app.use("/api/contact", contactRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("JK Enterprises API is running...");
});

module.exports = app;

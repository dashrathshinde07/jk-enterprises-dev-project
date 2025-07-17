const express = require("express");
const cors = require("cors");
const heroRoutes = require("./routes/heroRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/hero", heroRoutes); // ✅ Hero route mapping

// Default route
app.get("/", (req, res) => {
  res.send("JK Enterprises API is running...");
});

module.exports = app;

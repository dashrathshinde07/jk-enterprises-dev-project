// routes/heroRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getHero,
  createHero,
  updateHero,
  deleteHero,
} = require("../controllers/heroController");

router.get("/", getHero);
router.post("/", upload.single("image"), createHero);
router.put("/", upload.single("image"), updateHero);
router.delete("/", deleteHero);

module.exports = router;

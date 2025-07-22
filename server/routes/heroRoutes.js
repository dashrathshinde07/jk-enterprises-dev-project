const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHeroById,
  deleteHeroById,
} = require("../controllers/heroController");

router.get("/", getAllHeroes);                     // Get all heroes
router.get("/:id", getHeroById);                   // Get hero by ID
router.post("/", upload.single("image"), createHero); // Create hero
router.put("/:id", upload.single("image"), updateHeroById); // Update by ID
router.delete("/:id", deleteHeroById);             // Delete by ID

module.exports = router;

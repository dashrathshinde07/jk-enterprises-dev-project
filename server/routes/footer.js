const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createFooter,
  getFooter,
  getFooterById,
  updateFooterById,
  deleteFooterById,
} = require("../controllers/footerController");

router.post("/", upload.single("logo"), createFooter);
router.get("/", getFooter);
router.get("/:id", getFooterById);
router.put("/:id", upload.single("logo"), updateFooterById);
router.delete("/:id", deleteFooterById);

module.exports = router;

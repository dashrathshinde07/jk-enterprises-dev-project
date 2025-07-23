const express = require("express");
const router = express.Router();
const parentEntityController = require("../controllers/parentEntityController");

router.post("/", parentEntityController.createParentEntity);
router.get("/", parentEntityController.getAllParentEntities);

module.exports = router;

const ParentEntity = require("../models/ParentEntity");

// CREATE ParentEntity
exports.createParentEntity = async (req, res) => {
  console.log(" req.body", req.body);
  try {
    const { title, marathiTitle, slug, description, status } = req.body;

    const newEntity = new ParentEntity({
      title,
      marathiTitle,
      slug,
      description,
      status,
    });

    await newEntity.save();
    res.status(201).json(newEntity);
  } catch (error) {
    console.error("Create ParentEntity Error:", error);
    res.status(500).json({ message: "Failed to create parent entity" });
  }
};

// GET All ParentEntities
exports.getAllParentEntities = async (req, res) => {
  try {
    const entities = await ParentEntity.find().sort({ createdAt: -1 });
    res.json(entities);
  } catch (error) {
    console.error("Get ParentEntities Error:", error);
    res.status(500).json({ message: "Failed to fetch parent entities" });
  }
};

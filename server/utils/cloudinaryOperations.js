const cloudinary = require("../config/cloudinary");

const uploadImageToCloudinary = async (filePath, folder = "section-images") => {
  const result = await cloudinary.uploader.upload(filePath, { folder });
  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

const deleteImageFromCloudinary = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};

module.exports = {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
};

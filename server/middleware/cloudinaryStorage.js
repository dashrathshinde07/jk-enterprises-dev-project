const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'jk-enterprises/hero',
    format: async () => 'webp',
    transformation: [{ width: 1920, crop: 'limit' }],
  },
});

module.exports = storage;

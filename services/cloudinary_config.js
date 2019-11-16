require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.upload = (gif) => cloudinary.uploader.upload(gif);
exports.delete = (gifid) => cloudinary.uploader.destroy(gifid);
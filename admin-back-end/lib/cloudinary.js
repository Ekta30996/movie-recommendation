require("dotenv").config();

//cloudinary configuration
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  eager_async: true,
});
module.exports = cloudinary;

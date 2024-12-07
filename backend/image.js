const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

async function uploader(path) {
  const uploadResult = await cloudinary.uploader.upload(path).catch((error) => {
    console.log(error);
  });

  return uploadResult;
}

function getUrl(image_id) {
  const url = cloudinary.url(image_id, {
    transformation: [
      {
        quality: "auto",
      },
      {
        fetch_format: "auto",
      },
    ],
  });

  return url;
}

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    // console.log("Delete result:", result);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

module.exports = {
  uploader,
  getUrl,
  deleteImage
};

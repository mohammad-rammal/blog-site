const cloudinary = require("cloudinary").v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Image to 'blog' folder in Cloudinary
const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
      folder: "blog",
    });
    return data;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return { error: error.message };
  }
};

// Remove Image from Cloudinary
const cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return { error: error.message };
  }
};

// Remove Multiple Image from Cloudinary (as array)
const cloudinaryRemoveMultipleImage = async (imagePublicIds) => {
  try {
    const result = await cloudinary.v2.api.delete_resources(imagePublicIds);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return { error: error.message };
  }
};

module.exports = {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveMultipleImage,
};

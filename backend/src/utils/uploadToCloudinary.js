import cloudinary from "../configs/cloudinary.js";
import fs from "fs";
export const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "jobmarketplace",
    });
    fs.unlinkSync(file);
    return result;
  } catch (error) {
    fs.unlinkSync(file);
    throw new Error(error.message);
  }
};

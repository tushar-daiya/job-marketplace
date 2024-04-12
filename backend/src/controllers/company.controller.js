import { Company } from "../models/company.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const updateProfile = async (req, res, next) => {
  try {
    const { companyName, phone, about, website, address, socials } = req.body;
    const logo = req.file;
    const company = await Company.findById(req.company._id);
    if (!company) {
      throw new ApiError(404, "Company not found");
    }
    if (logo) {
      const result = await uploadToCloudinary(logo.path);
      if (!company) {
        throw new ApiError(404, "Company not found");
      }
      company.logo = result.secure_url;
    }
    if (companyName) company.companyName = companyName;
    if (phone) company.phone = phone;
    if (about) company.about = about;
    if (website) company.website = website;
    if (address) company.address = address;
    if (socials) company.socials = socials;
    await company.save();
    res.status(200).json(new ApiResponse(200, "Profile updated successfully"));
  } catch (error) {
    next(error);
  }
};

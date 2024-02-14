import { ApiError } from "../utils/ApiError.js";
import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";
import { generateAccessToken } from "../utils/accessToken.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
export const registerCompany = async (req, res, next) => {
  try {
    const {
      name,
      companyName,
      designation,
      phone,
      email,
      password,
      confirmPassword,
    } = req.body;
    if (
      !name ||
      !companyName ||
      !designation ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      throw new ApiError(400, "All fields are required");
    }
    if (password !== confirmPassword) {
      throw new ApiError(400, "Password and Confirm Password do not match");
    }
    let company = await Company.findOne({ email });
    if (company) {
      throw new ApiError(400, "Email already exists");
    }
    company = await User.findOne({ email });
    if (company) {
      throw new ApiError(400, "Email already exists");
    }
    company = await Company.create({
      name,
      companyName,
      designation,
      phone,
      email,
      password,
    });
    res
      .status(201)
      .json(new ApiResponse("Company registered successfully", company));
  } catch (error) {
    next(error);
  }
};

export const loginCompany = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    let company = await Company.findOne({ email });
    if (!company) {
      throw new ApiError(404, "Company not found");
    }
    const isMatch = await company.matchPassword(password);
    if (!isMatch) {
      throw new ApiError(400, "Invalid credentials");
    }
    const accessToken = await generateAccessToken(company._id);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json(new ApiResponse("Logged in successfully", company));
  } catch (error) {
    next(error);
  }
};

export const logoutCompany = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json(new ApiResponse("Logged out successfully"));
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const file = req.file;
    if (file) {
      const filePath = file?.path;
      const logo = await uploadToCloudinary(filePath);
    }
    res.status(200).json(new ApiResponse("Profile updated successfully"));
  } catch (error) {
    next(error);
  }
};

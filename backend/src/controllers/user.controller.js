import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessToken } from "../utils/accessToken.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, phone, password, fullName, confirmPassword } = req.body;
    if (!email || !phone || !password || !fullName || !confirmPassword) {
      throw new ApiError(400, "All fields are required");
    }

    if (password !== confirmPassword) {
      throw new ApiError(400, "Password and Confirm Password do not match");
    }
    let user = await User.findOne({ email });
    if (user) {
      throw new ApiError(400, "User already exists");
    }
    user = await Company.findOne({ email });
    if (user) {
      throw new ApiError(400, "Email already exists");
    }
    user = await User.create({ email, phone, password, fullName });
    res.status(201).json(new ApiResponse(201, "User registered successfully"));
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    let user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new ApiError(400, "Invalid credentials");
    }
    const accessToken = await generateAccessToken(user._id);
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json(new ApiResponse(200, "User logged in successfully"));
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json(new ApiResponse("User logged out successfully"));
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    console.log(req.user);
    res.status(200).json(
      new ApiResponse(200, "User found successfully", {
        user: req.user,
        type: "student",
      })
    );
  } catch (error) {
    next(error);
  }
};

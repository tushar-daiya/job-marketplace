import { Company } from "../models/company.model.js";
import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessToken } from "../utils/accessToken.js";

export const registerStudent = async (req, res, next) => {
  try {
    const { email, phone, password, fullName, confirmPassword } = req.body;
    if (!email || !phone || !password || !fullName || !confirmPassword) {
      throw new ApiError(400, "All fields are required");
    }

    if (password !== confirmPassword) {
      throw new ApiError(400, "Password and Confirm Password do not match");
    }
    let student = await Student.findOne({ email });
    if (student) {
      throw new ApiError(400, "Email already exists");
    }
    student = await Company.findOne({ email });
    if (student) {
      throw new ApiError(400, "Email already exists");
    }
    student = await Student.create({ email, phone, password, fullName });
    res.status(201).json(new ApiResponse(201, "Registered successfully"));
  } catch (error) {
    next(error);
  }
};

export const loginStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    let student = await Student.findOne({ email });
    if (!student) {
      throw new ApiError(404, "Account not found");
    }
    const isMatch = await student.matchPassword(password);
    if (!isMatch) {
      throw new ApiError(400, "Invalid credentials");
    }
    const accessToken = await generateAccessToken(student._id);
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json(new ApiResponse(200, "Logged in successfully"));
  } catch (error) {
    next(error);
  }
};

export const logoutStudent = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json(new ApiResponse(200, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};

export const registerCompany = async (req, res, next) => {
  try {
    const { companyName, phone, email, password, confirmPassword } = req.body;
    if (!companyName || !phone || !email || !password || !confirmPassword) {
      throw new ApiError(400, "All fields are required");
    }
    if (password !== confirmPassword) {
      throw new ApiError(400, "Password and Confirm Password do not match");
    }
    let company = await Company.findOne({ email });
    if (company) {
      throw new ApiError(400, "Email already exists");
    }
    company = await Student.findOne({ email });
    if (company) {
      throw new ApiError(400, "Email already exists");
    }
    company = await Company.create({
      companyName,
      phone,
      email,
      password,
    });
    res.status(201).json(new ApiResponse(201, "Registered successfully"));
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
    res.status(200).json(new ApiResponse(200, "Logged in successfully"));
  } catch (error) {
    next(error);
  }
};

export const logoutCompany = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json(new ApiResponse(200, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    res
      .status(200)
      .json(new ApiResponse(200, "User fetched successfully", user));
  } catch (error) {
    next(error);
  }
};

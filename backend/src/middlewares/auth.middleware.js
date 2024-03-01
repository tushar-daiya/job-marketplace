import { Company } from "../models/company.model.js";
import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
export const verifyStudentToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new ApiError(401, "Not Authorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }
    req.student = student;
    next();
  } catch (error) {
    ErrorHandler(error, req, res, next);
  }
};

export const verifyCompanyToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new ApiError(401, "Not Authorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id);
    if (!company) {
      throw new ApiError(404, "Company not found");
    }
    req.company = company;
    next();
  } catch (error) {
    ErrorHandler(error, req, res, next);
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new ApiError(401, "Not Authorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await Student.findById(decoded.id);
    if (user) {
      req.user = { user, type: "student" };
      next();
      return;
    }
    user = await Company.findById(decoded.id);
    if (user) {
      req.user = { user, type: "company" };
      next();
      return;
    }
    throw new ApiError(404, "User not found");
  } catch (error) {
    ErrorHandler(error, req, res, next);
  }
};

import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
export const verifyUserToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new Error("Not Authorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    ErrorHandler(error, req, res, next);
  }
};

export const verifyCompanyToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new Error("Not Authorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id);
    if (!company) {
      throw new Error("Company not found");
    }
    req.company = company;
    next();
  } catch (error) {
    ErrorHandler(error, req, res, next);
  }
};

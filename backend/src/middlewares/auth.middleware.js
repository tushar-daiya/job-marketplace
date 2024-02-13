import { ErrorHandler } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
export const verifyUserToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new Error("Not Authorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    ErrorHandler(error, req, res, next);
  }
};

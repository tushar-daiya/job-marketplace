import { Router } from "express";
import {
  loginCompany,
  logoutCompany,
  registerCompany,
  updateProfile,
} from "../controllers/company.controller.js";
import { verifyCompanyToken } from "../middlewares/auth.middleware.js";
import multerMiddleware from "../middlewares/multer.middleware.js";
export const companyRouter = Router();

companyRouter.post("/register", registerCompany);
companyRouter.get("/login", loginCompany);
companyRouter.get("/logout", verifyCompanyToken, logoutCompany);
companyRouter.patch(
  "/update",
  verifyCompanyToken,
  multerMiddleware.single("logo"),
  updateProfile
);

import { Router } from "express";
import { verifyCompanyToken } from "../middlewares/auth.middleware.js";
import { updateProfile } from "../controllers/company.controller.js";
import multerMiddleware from "../middlewares/multer.middleware.js";
const companyRouter = Router();
companyRouter.patch("/updateprofile",verifyCompanyToken,multerMiddleware.single("logo"),updateProfile)
export default companyRouter;

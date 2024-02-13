import { Router } from "express";
import {
  loginCompany,
  registerCompany,
} from "../controllers/company.controller.js";
export const companyRouter = Router();

companyRouter.post("/register", registerCompany);
companyRouter.get("/login", loginCompany);

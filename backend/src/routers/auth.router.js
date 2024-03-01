import { Router } from "express";
import {
  getMe,
  loginCompany,
  loginStudent,
  logoutCompany,
  logoutStudent,
  registerCompany,
  registerStudent,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const authRouter = Router();

authRouter.post("/student/register", registerStudent);
authRouter.post("/company/register", registerCompany);
authRouter.post("/student/login", loginStudent);
authRouter.post("/company/login", loginCompany);
authRouter.get("/student/logout", logoutStudent);
authRouter.get("/company/logout", logoutCompany);
authRouter.get("/getMe", verifyToken, getMe);

export default authRouter;

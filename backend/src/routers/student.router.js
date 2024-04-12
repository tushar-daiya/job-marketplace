import { Router } from "express";
import multerMiddleware from "../middlewares/multer.middleware.js";
import { updateResume } from "../controllers/student.controller.js";
const studentRouter = Router();
studentRouter.post(
  "/updateresume",
  multerMiddleware.single("resume"),
  updateResume
);
export default studentRouter;

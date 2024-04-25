import { Router } from "express";
import {
  verifyCompanyToken,
  verifyStudentToken,
} from "../middlewares/auth.middleware.js";
import {
  applyJob,
  createJob,
  getJobs,
} from "../controllers/job.controller.js";

export const jobRouter = Router();

jobRouter.post("/createjob", verifyCompanyToken, createJob);
jobRouter.post("/applyjob", verifyStudentToken, applyJob);
jobRouter.get("/all", getJobs);

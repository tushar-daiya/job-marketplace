import express from "express";
import cookieParser from "cookie-parser";
import { ErrorHandler } from "./utils/ErrorHandler.js";
import "dotenv/config";
import cors from "cors";
import companyRouter from "./routers/company.router.js";
import studentRouter from "./routers/student.router.js";
import authRouter from "./routers/auth.router.js";
import { jobRouter } from "./routers/job.router.js";
export const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);

app.use(ErrorHandler);

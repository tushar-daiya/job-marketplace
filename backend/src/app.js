import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.router.js";
import { ErrorHandler } from "./utils/ErrorHandler.js";
import "dotenv/config";
import { companyRouter } from "./routers/company.router.js";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company",companyRouter)

app.use(ErrorHandler);

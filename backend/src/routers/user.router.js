import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.get("/login", loginUser);
userRouter.get("/logout", verifyUserToken,logoutUser);

export default userRouter;

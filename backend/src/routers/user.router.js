import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", verifyUserToken, logoutUser);
userRouter.get("/getMe", verifyUserToken, getMe);

export default userRouter;

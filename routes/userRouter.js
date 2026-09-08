import {
  signUp,
  logIn,
  logOut,
  auth,
  validateSignup,
  validateLogin,
} from "../controllers/userController.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", validateSignup, signUp);
userRouter.post("/login", validateLogin, logIn);
userRouter.get("/logout", logOut);
userRouter.get("/auth", auth);

export default userRouter;

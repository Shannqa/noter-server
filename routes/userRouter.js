import { signUp, logIn, logOut, auth } from "../controllers/userController.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.get("/logout", logOut);
userRouter.get("/auth", auth);

export default userRouter;

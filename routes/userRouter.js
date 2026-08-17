import {
  addUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/", addUser);
userRouter.get("/:id", getUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;

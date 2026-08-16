import { Router } from "express";
import { getAllUsers } from "../controllers/usersController.js";
const indexRouter = Router();

indexRouter.get("/", (req, res) => res.send("Hello world"));

indexRouter.get("/zzz", (req, res, next) => {
  throw new Error("Zzz error");
});

indexRouter.get("/users", getAllUsers);

export default indexRouter;

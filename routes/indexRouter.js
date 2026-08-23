import { Router } from "express";
// import { getAllUsers } from "../controllers/userController.js";
const indexRouter = Router();

indexRouter.get("/", (req, res) => res.send(req.user));

// indexRouter.get("/zzz", (req, res, next) => {
//   throw new Error("Zzz error");
// });

// indexRouter.get("/users", getAllUsers);

export default indexRouter;

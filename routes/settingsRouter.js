import { getSettings, setSettings } from "../controllers/settingsController.js";
import {
  changePassword,
  validateChangePassword,
} from "../controllers/userController.js";
import { Router } from "express";

const settingsRouter = Router();

settingsRouter.get("/", getSettings);
settingsRouter.post("/", setSettings);
settingsRouter.post("/change_password", validateChangePassword, changePassword);

export default settingsRouter;

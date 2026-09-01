import { getSettings, setSettings } from "../controllers/noteController.js";
import { Router } from "express";

const settingsRouter = Router();

settingsRouter.get("/", getSettings);
settingsRouter.post("/", setSettings);

export default settingsRouter;

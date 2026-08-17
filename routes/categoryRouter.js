import { categoryRouter, addCategory, getCategory, updateCategory, deleteCategory } from "../controllers/noteController.js";
import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", addCategory);
categoryRouter.get("/:id", getCategory);
categoryRouter.patch("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;

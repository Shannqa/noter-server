import { getAllNotes, addNote, getNote, updateNote, deleteNote } from "../controllers/noteController.js";
import { Router } from "express";

const noteRouter = Router();

noteRouter.get("/", getAllNotes);
noteRouter.post("/", addNote);
noteRouter.get("/:id", getNote);
noteRouter.patch("/:id", updateNote);
noteRouter.delete("/:id", deleteNote);

export default noteRouter;

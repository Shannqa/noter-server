import { Router } from "express";

const notesRouter = Router();

notesRouter.get("/", (req, res) => res.json({ note: "aaa" }));
notesRouter.get("/:id", (req, res) => res.json({ note: req.params.id }));

export default notesRouter;

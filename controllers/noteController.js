import { prisma } from "../prisma/lib/prisma.js";

async function getAllNotes(req, res) {
  try {
    const { userId } = req.query;
    const result = await prisma.note.findMany({
      where: {
        userId: Number(userId),
      },
      select: {
        id: true,
        title: true,
        body: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        category: true,
        status: true,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Notes not found" });
  }
}

async function addNote(req, res) {
  try {
    const { title, body, userId, categoryId } = req.body;
    console.log(req.body);
    const categoryToAdd = Number(categoryId);

    const result = await prisma.note.create({
      data: {
        title,
        body,
        userId: Number(userId),
        categoryId: Number(categoryId),
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Failed to add note" });
  }
}

async function getNote(req, res) {
  try {
    const { noteId } = req.query;
    const result = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
      select: {
        id: true,
        title: true,
        body: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        categoryId: true,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Note not found" });
  }
}

async function updateNote(req, res) {
  try {
    const { title, body, userId, categories } = req.body;
    const result = await prisma.note.update({
      where: {
        id: categoryId,
      },
      data: {
        title,
        body,
        userId,
        categories,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Note update failed" });
  }
}

async function deleteNote(req, res) {
  try {
    const { noteId } = req.body;
    const result = await prisma.note.delete({
      where: {
        id: noteId,
      },
    });
    res.status(204);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Note deletion failed" });
  }
}

export { getAllNotes, addNote, getNote, updateNote, deleteNote };

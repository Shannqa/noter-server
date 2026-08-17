import { prisma } from "../prisma/lib/prisma.js";

async function createUser(req, res) {
  console.log(req);
  console.log(req.body);
  // const { name, email, password } = req.body;
  // const result = await prisma.user.create({
  //   data: {
  //     name,
  //     email,
  //     password,
  //   },
  // });

  // res.json(result);
  res.send(req);
}

async function getAllNotes(req, res) {
  const { userId } = req.body;

  try {
    const notes = await prisma.note.findMany({
      where: {
        userId: Number(userId),
      },
    });
    res.json(notes);
  } catch (err) {
    res.json({ error: "Can't find notes" });
  }
}

async function addNote(req, res) {
  try {
    const { title, body, userId, categories } = req.body;
    const result = await prisma.note.create({
      data: {
        title,
        body,
        userId: Number(userId),
        categories,
      },
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function getNote(req, res) {}

async function updateNote(req, res) {}

async function deleteNote(req, res) {}

export { getAllNotes, addNote, getNote, updateNote, deleteNote };

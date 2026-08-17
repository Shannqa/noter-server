import { prisma } from "../prisma/lib/prisma.js";

async function createUser(req, res) {
  const { name, email, password } = req.body;
  const result = await prisma.user.create({
    data: {
      name, 
      email, 
      password
    }
  });
  
  res.json(result);
}

async function getAllNotes(req, res) {
  const { userId } = req.body;
  
  try {
    const notes = await prisma.note.findMany({
      where: {
        userId: Number(userId)
      }
    });
    res.json(notes);
  } catch (err) {
    res.json({error: "Can't find notes"});
  }
  
}

async function addNote(req, res) {
  
}

async function getNote(req, res) {
  
}

async function updateNote(req, res) {
  
}

async function deleteNote(req, res) {
  
}




export { getAllNotes, addNote, getNote, updateNote, deleteNote };

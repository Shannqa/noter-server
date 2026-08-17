import { prisma } from "../prisma/lib/prisma.js";

async function addUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
}
async function getUser(req, res) {}

async function updateUser(req, res) {}

async function deleteUser(req, res) {}

export { addUser, getUser, updateUser, deleteUser };

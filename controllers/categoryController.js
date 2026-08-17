import { prisma } from "../prisma/lib/prisma.js";

async function getAllCategories(req, res) {
  try {
    console.log(req.query);
    const userId = req.query.userId;
    const result = await prisma.category.findMany({
      where: {
        userId: Number(userId),
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Categories not found" });
  }
}

async function addCategory(req, res) {
  try {
    const { name, userId } = req.body;
    const result = await prisma.category.create({
      data: {
        name,
        userId: Number(userId),
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Failed to add category" });
  }
}

async function getCategory(req, res) {
  const { categoryId } = req.body;
  try {
    const result = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Category not found" });
  }
}
async function updateCategory(req, res) {}
async function deleteCategory(req, res) {}

export {
  getAllCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};

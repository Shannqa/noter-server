import { prisma } from "../prisma/lib/prisma.js";

async function getAllCategories(req, res) {
  try {
    const { userId } = req.query;
    const result = await prisma.category.findMany({
      where: {
        userId: Number(userId),
      },
      select: {
        id: true,
        name: true,
        userId: true,
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
  try {
    const { categoryId } = req.query;
    const result = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
        name: true,
        userId: true,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Category not found" });
  }
}

async function updateCategory(req, res) {
  try {
    const { id, name } = req.body;
    const result = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Category update failed" });
  }
}

async function deleteCategory(req, res) {
  try {
    const { categoryId } = req.body;
    const result = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    res.status(204);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Category deletion failed" });
  }
}

export {
  getAllCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};

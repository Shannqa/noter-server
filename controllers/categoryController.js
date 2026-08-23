import { prisma } from "../prisma/lib/prisma.js";

async function getAllCategories(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const result = await prisma.category.findMany({
      where: {
        userId: Number(req.user.id),
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
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const { name } = req.body;
    const result = await prisma.category.create({
      data: {
        name,
        userId: Number(req.user.id),
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
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const result = await prisma.category.findUnique({
      where: {
        id: req.user.id,
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
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
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
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
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

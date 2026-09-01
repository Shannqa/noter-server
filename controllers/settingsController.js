import { prisma } from "../prisma/lib/prisma.js";

async function getSettings(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const result = await prisma.settings.findUnique({
      where: {
        userId: Number(req.user.id),
      },
      // select: {
      //   id: true,
      //   title: true,
      //   body: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   userId: true,
      //   category: true,
      //   status: true,
      // },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Settings for the user not found" });
  }
}

async function setSettings(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const { title, body, categoryId } = req.body;
    // console.log(req.body);
    // const categoryToAdd = Number(categoryId);

    const result = await prisma.settings.create({
      data: {
        title,
        body,
        userId: Number(req.user.id),
        categoryId: categoryId,
      },
      include: {
        category: true,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Failed to add note" });
  }
}

export { getSettings, setSettings };

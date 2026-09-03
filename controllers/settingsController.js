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

    const result = await prisma.settings.upsert({
      where: {
        userId: Number(req.user.id),
      },
      update: {
        theme: req.body.theme,
      },
      create: {
        userId: Number(req.user.id),
        theme: req.body.theme,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Failed to save settings" });
  }
}

export { getSettings, setSettings };

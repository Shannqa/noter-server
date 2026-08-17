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

export { createUser };

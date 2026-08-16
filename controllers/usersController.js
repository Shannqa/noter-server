import db from "../db/queries.js";

async function getAllUsers(req, res) {
  const users = await db.getAllUsers();
  console.log("Users: ", users);
  res.send("Users: " + users.map((user) => user.username).join(", "));
}

export { getAllUsers };

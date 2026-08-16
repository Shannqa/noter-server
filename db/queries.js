import pool from "./pool.js";

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

async function insertUser() {
  await pool.query("INSERT INTO users (username) VALUES ($1)", [username]);
}

export default { getAllUsers, insertUser };

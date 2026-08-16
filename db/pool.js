import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env["DATABASE_URL"];

const pool = new Pool({ connectionString });

export default pool;

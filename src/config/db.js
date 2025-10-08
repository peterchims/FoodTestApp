import pkg from "pg";
import { drizzle } from "drizzle-orm/node-postgres"; // <-- use node-postgres adapter
import { ENV } from "./env.js";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool);
  
import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

async function checkTables() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("Existing tables:", result.rows.map(row => row.table_name));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await pool.end();
  }
}

checkTables();
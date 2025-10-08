import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

async function testConnection() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log("🔌 Testing database connection...");
    
    const client = await pool.connect();
    console.log("✅ Successfully connected to database!");
    
    // Test a simple query
    const result = await client.query('SELECT version()');
    console.log("✅ Database version:", result.rows[0].version);
    
    // Test if we can create schema
    await client.query('CREATE SCHEMA IF NOT EXISTS test_schema');
    console.log("✅ Schema creation test passed!");
    
    await client.query('DROP SCHEMA IF EXISTS test_schema');
    console.log("✅ Schema cleanup test passed!");
    
    client.release();
    
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.error("Error details:", error);
  } finally {
    await pool.end();
  }
}

testConnection();
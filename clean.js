import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

async function cleanSequences() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();
  
  try {
    // Drop the sequence if it exists
    await client.query('DROP SEQUENCE IF EXISTS "TestApp_id_seq" CASCADE');
    console.log('✅ Sequence "TestApp_id_seq" dropped');
    
    // Also drop the table if it exists
    await client.query('DROP TABLE IF EXISTS "TestApp" CASCADE');
    console.log('✅ Table "TestApp" dropped');
    
    // List any remaining sequences
    const sequences = await client.query(`
      SELECT sequence_name 
      FROM information_schema.sequences 
      WHERE sequence_schema = 'public'
    `);
    console.log('Remaining sequences:', sequences.rows);
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    client.release();
    await pool.end();
  }
}

cleanSequences();
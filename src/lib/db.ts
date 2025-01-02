import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER, // Your database username
  host: process.env.DB_HOST, // Database hostname
  database: process.env.DB_NAME, // Database name
  password: process.env.DB_PASSWORD, // Database password
  port: Number(process.env.DB_PORT), // Database port, default is 5432
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: result.rowCount });
  return result;
};

export const testDbConnection = async () => {
  try {
    const result = await query("SELECT 1 + 1 AS result");
    console.log(
      "Database connection successful. Test query result:",
      result.rows[0].result
    );
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
};

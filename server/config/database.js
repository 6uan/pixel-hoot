import pg from "pg";

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  database_public_url: process.env.DATABASE_PUBLIC_URL,
};

export const pool = new pg.Pool(config);

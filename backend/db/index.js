import pg from 'pg'
const { Pool } = pg
import dotenv from 'dotenv';


dotenv.config();
 
const pool = new Pool(
  // this is all auto imported from .env automatically.
  // { 
  //   user: process.env.PGUSER,
  //   password: process.env.PGPASSWORD,
  //   host: process.env.PGHOST,
  //   port: process.env.PGPORT,
  //   database: process.env.PGDATABASE,
  // }
)
 
export const query = (text, params) => pool.query(text, params)
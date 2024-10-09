import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres'

const queryString = process.env.DATABASE_URL

export const connection = postgres('postgresql://neondb_owner:o2UFsk8VcHzB@ep-aged-block-a4t354ur-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require');
export const db = drizzle(connection);


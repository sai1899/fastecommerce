import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/app/db/schema.ts',
  out:'./drizzle',
  dbCredentials:{
    url:process.env.DATABASE_URL
  }
})
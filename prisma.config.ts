import { defineConfig } from "prisma/config";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

const databaseUrl = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;
const isGenerate = process.argv.some((arg) => arg.includes("generate"));

if (!databaseUrl && !isGenerate) {
  throw new Error("DATABASE_URL or DIRECT_DATABASE_URL is required for Prisma migrations.");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl || "postgresql://postgres:postgres@localhost:5432/postgres",
  },
});

import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
    path: ".env",
});

export default {
    schema: "./src/database/schema.ts",
    driver: "pg",
    out: "./drizzle",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
        host: process.env.DATABASE_HOST!,
        port: parseInt(process.env.DATABASE_PORT!),
        user: process.env.DATABASE_USERNAME!,
        password: process.env.DATABASE_PASSWORD!,
        database: process.env.DATABASE_SCHEMA!
    }
} satisfies Config;

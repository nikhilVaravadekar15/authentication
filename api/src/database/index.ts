import dotenv from 'dotenv';
import { Client } from "pg";
import * as schema from './schema'
import { drizzle } from "drizzle-orm/node-postgres";


dotenv.config();

const DATABASE_HOST: string = process.env.DATABASE_HOST!
const DATABASE_PORT: number = parseInt(process.env.DATABASE_PORT!)
const DATABASE_USERNAME: string = process.env.DATABASE_USERNAME!
const DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD!
const DATABASE_SCHEMA: string = process.env.DATABASE_SCHEMA!

if (!DATABASE_HOST || !DATABASE_PORT || !DATABASE_USERNAME || !DATABASE_PASSWORD || !DATABASE_SCHEMA) {
    throw new Error("Missing database details in .env file")
}

const client = new Client({
    connectionString: `postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_SCHEMA}`,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_SCHEMA,
});


async function main() {
    await client.connect();
}
main();
// await client.connect();
export const db = drizzle(client);



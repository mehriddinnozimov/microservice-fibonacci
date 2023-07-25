import { config } from "dotenv";
import { join } from "path";

const envPath = join(process.cwd(), ".env");

config({
    path: envPath
});

export const { NODE_ENV, AMQP_URL, AMQP_REQUEST_QUEUE } = process.env as Record<string, string>;
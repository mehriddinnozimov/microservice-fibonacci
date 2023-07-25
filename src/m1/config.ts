import { config } from "dotenv";
import { join } from "path";

const envPath = join(process.cwd(), ".env");

config({
    path: envPath
});

export const { NODE_ENV, M1_PORT, AMQP_URL, AMQP_REQUEST_QUEUE, AMQP_RESPONSE_QUEUE } = process.env as Record<string, string>;
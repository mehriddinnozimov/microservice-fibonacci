import { AMQP_REQUEST_QUEUE, AMQP_URL } from "./config";
import { Consumer } from "./consumer";

const consumer = new Consumer(AMQP_URL, AMQP_REQUEST_QUEUE);

export async function main() {
    await consumer.init();
}
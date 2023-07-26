import { AMQP_REQUEST_QUEUE, AMQP_URL } from "./config";
import { Consumer } from "./consumer";
import { Fibonnachi } from "./fibonnachi";

const fibonnachi =  new Fibonnachi();

const consumer = new Consumer(AMQP_URL, AMQP_REQUEST_QUEUE, fibonnachi);

export async function main() {
    await consumer.init();
}
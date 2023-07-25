import { createServer } from "http";
import { AMQP_REQUEST_QUEUE, AMQP_RESPONSE_QUEUE, AMQP_URL, M1_PORT } from "./config";
import { App } from "./app";
import { Producer } from "./producer";

const producer = new Producer(AMQP_URL, AMQP_REQUEST_QUEUE, AMQP_RESPONSE_QUEUE);

const app = new App(producer);

const server = createServer(app.build());

async function main() {
    await producer.init();
    app.init();

    server.listen(M1_PORT, () => {
        console.log(`Server (M1) starter. PORT: ${M1_PORT}`);
    });
}

main();
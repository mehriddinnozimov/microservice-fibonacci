import amqplib, { Channel, Connection } from "amqplib";
import { Fibonnachi } from "./fibonnachi";

export class Consumer {
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    constructor(
        private readonly URL: string,
        private readonly REQUEST_QUEUE: string,
        private readonly fibonnachi: Fibonnachi

    ) {}

    public async init() {
        this.connection = await amqplib.connect(this.URL);

        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(this.REQUEST_QUEUE, { durable: false });

        console.log("Consumer initialized");
        this.recieve();
    }

    private async recieve() {
        const { channel, connection } = this;
        if(!connection || !channel) throw new Error("Not initialized");

        await channel.consume(this.REQUEST_QUEUE, async (message) => {
            if(message) {
                const numberString = message.content.toString("utf-8");
                const number = Number.parseInt(numberString);

                const result = this.fibonnachi.get(number);
                const resultString = `${result}`;

                channel.sendToQueue(message.properties.replyTo, Buffer.from(resultString), {
                    correlationId: message.properties.correlationId
                });

                channel.ack(message);
            }
        });
    }
}
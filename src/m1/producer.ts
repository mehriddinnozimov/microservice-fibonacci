/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import amqplib, { Channel, Connection } from "amqplib";
import crypto from "crypto";
import EventEmitter from "events";

export interface Producer {
    on(eventName: "response", callback: (uiid: string, result: string) => void ): this
}

export class Producer extends EventEmitter {
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    constructor(
        private readonly URL: string,
        private readonly REQUEST_QUEUE: string,
        private readonly RESPONSE_QUEUE: string,

    ) {
        super();
    }

    public async init() {
        this.connection = await amqplib.connect(this.URL);

        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(this.REQUEST_QUEUE, { durable: false });
        await this.channel.assertQueue(this.RESPONSE_QUEUE, { durable: false });

        await this.recieve();
        console.log("Producer initialized");
    }

    public async send(message: string) {
        const { channel, connection } = this;
        if(!connection || !channel) throw new Error("Not initialized");


        const uiid = crypto.randomUUID();

        channel.sendToQueue(this.REQUEST_QUEUE, Buffer.from(message), {
            replyTo: this.RESPONSE_QUEUE,
            correlationId: uiid
        });

        return uiid;
    }

    private async recieve() {
        const { channel, connection } = this;
        if(!connection || !channel) throw new Error("Not initialized");

        await channel.consume(this.RESPONSE_QUEUE, (message) => {
            if(message) {
                const responseString = message.content.toString("utf-8");

                this.emit("response", message.properties.correlationId, responseString);

                channel.ack(message);
            }

        });
    }
}
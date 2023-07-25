/* eslint-disable no-case-declarations */
import { IncomingMessage, ServerResponse } from "http";
import { Producer } from "./producer";

type Request = IncomingMessage
type Response = ServerResponse<IncomingMessage>

export class App {
    private map = new Map<string, Response>();

    constructor(
        private readonly producer: Producer
    ) { }

    public build() {
        return this.request.bind(this);
    }

    public init() {
        this.producer.on("response", (uiid, result) => {
            const res = this.map.get(uiid);

            if(res) {
                res.write(`${result}`);
                res.end();

                this.map.delete(uiid);
            }
        });
    }

    private async request(req: Request, res: Response) {
        const { url } = req;

        if (url === "/fibonnachi") {
            const body = await this.parseBody(req);

            const uiid = await this.producer.send(body);

            this.map.set(uiid, res);
        } else {
            this.notFound(res);
        }
    }

    private async parseBody(req: Request) {
        let body = "";

        for await (const chunk of req) {
            body += chunk;
        }

        return body;
    }

    private notFound(res: Response) {
        res.statusCode = 404;
        res.write("Page not found");
        res.end();
    }
}
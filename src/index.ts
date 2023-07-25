import { main as M1Main } from "./m1";
import { main as M2Main } from "./m2";

import { main as ClientMain } from "./client";

async function main() {
    await M1Main();
    await M2Main();
    
    await ClientMain();
}

main();
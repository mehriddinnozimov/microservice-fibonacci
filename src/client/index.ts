async function fibonnachi(number: number) {
    const url = "http://localhost:3000/fibonnachi";
    const request = await fetch(url, {
        method: "POST",
        body: `${number}`
    });

    return await request.text();

}

async function main() {
    const numbers = [10, 16, 14, 210, 180, 120, 100, 80, 44];

    for(const number of numbers) {
        console.time(`${number}`);
        const result = await fibonnachi(number);
        console.timeEnd(`${number}`);
        console.log("Result ", result);
    }
}

main();
const cache: number[] = [0, 1];

export function fibonacci(n: number) {
    if(typeof cache[n] === "number") return cache[n];
    if (n <= 1) {
        return n;
    }

    for (let i = 2; i <= n; i++) {
        cache[i] = cache[i - 2] + cache[i - 1];
    }

    return cache[cache.length - 1];
}
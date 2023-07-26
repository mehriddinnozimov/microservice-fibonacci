export class Fibonnachi {
    private cache: number[] = [0, 1];

    public get(n: number) {
        if (n <= 1) {
            return n;
        }

        if(typeof this.cache[n] === "number") return this.cache[n];

        for (let i = this.cache.length; i <= n; i++) {
            this.cache[i] = this.cache[i - 2] + this.cache[i - 1];
        }

        return this.cache[this.cache.length - 1];
    }
}
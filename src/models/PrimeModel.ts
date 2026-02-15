export class PrimeModel {
    private primes: Uint8Array;
    private max: number;

    constructor(max: number = 10000) {
        this.max = max;
        this.primes = new Uint8Array(max + 1);
        this.sieve();
    }

    private sieve() {
        this.primes.fill(1);
        this.primes[0] = 0;
        this.primes[1] = 0;
        // 2 and 3 are primes, but often treated specially in base-24
        // We leave them as 1 (prime) in the sieve.

        for (let i = 2; i * i <= this.max; i++) {
            if (this.primes[i]) {
                for (let j = i * i; j <= this.max; j += i) {
                    this.primes[j] = 0;
                }
            }
        }
    }

    public isPrime(n: number): boolean {
        if (n > this.max) return false;
        return this.primes[n] === 1;
    }

    public getMax(): number {
        return this.max;
    }
}

export interface MappingResult {
    spokeIndex: number; // 0-7 for the 8 prime spokes, -1 for others
    ringIndex: number;  // How far out
    isSpoke: boolean;   // True if it lands on one of the 8 prime-bearing indices
}

export class Base24Mapper {
    // The 8 indices in mod 24 that can contain primes (except 2, 3)
    // 1, 5, 7, 11, 13, 17, 19, 23
    private static readonly SPOKE_INDICES = [1, 5, 7, 11, 13, 17, 19, 23];

    public static map(n: number): MappingResult {
        // Special mapping could be added for 1, 2, 3 here, 
        // but typically they are just center.

        const mod = n % 24;
        const ring = Math.floor(n / 24);

        const spokeIndex = Base24Mapper.SPOKE_INDICES.indexOf(mod);

        return {
            spokeIndex: spokeIndex, // 0 to 7 if on a spoke, -1 otherwise
            ringIndex: ring,
            isSpoke: spokeIndex !== -1
        };
    }

    public static getSpokeCount(): number {
        return 8;
    }
}

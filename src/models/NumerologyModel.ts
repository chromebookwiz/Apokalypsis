export class NumerologyModel {
    public static getDigitalRoot(n: number): number {
        if (n === 0) return 0;
        return 1 + ((n - 1) % 9);
    }

    public static isMasterNumber(n: number): boolean {
        // Simple check for 11, 22, 33... up to 99 for reasonable range
        return n > 0 && n % 11 === 0 && n <= 99; // Or simply n % 11 === 0 depending on philosophy
    }

    public static getZoharArchetype(n: number): string | null {
        switch (n) {
            case 1: return 'KING (Keter)';
            case 2: return 'QUEEN (Binah)';
            case 3: return 'SON (Zeir Anpin)';
            case 4: return 'DAUGHTER (Malchut)';
            default: return null;
        }
    }

    public static getZoharColor(n: number): string {
        switch (n) {
            case 1: return '#ffffff'; // White/Brilliance
            case 2: return '#ff0000'; // Red/Severity/Vessel
            case 3: return '#ffff00'; // Yellow/Balance/Sun
            case 4: return '#0000ff'; // Blue/Earth/Manifestation
            default: return '#444444'; // Dim others
        }
    }

    public static getDigitalRootColor(n: number): string {
        const root = NumerologyModel.getDigitalRoot(n);
        // Spectrum Colors 1-9
        const colors = [
            '#ff0000', // 1 Red
            '#ff7f00', // 2 Orange
            '#ffff00', // 3 Yellow
            '#00ff00', // 4 Green
            '#0000ff', // 5 Blue
            '#4b0082', // 6 Indigo
            '#8f00ff', // 7 Violet
            '#ff1493', // 8 Deep Pink / Magnum Opus
            '#ffffff'  // 9 Gold/White (Completion)
        ];
        return colors[root - 1] || '#ffffff';
    }

    public static getInfo(n: number): string {
        const root = NumerologyModel.getDigitalRoot(n);
        let info = `Root: ${root}`;
        if (NumerologyModel.isMasterNumber(n)) info += ` | MASTER ${n}`;
        const zohar = NumerologyModel.getZoharArchetype(n);
        if (zohar) info += ` | ${zohar}`;
        return info;
    }
}

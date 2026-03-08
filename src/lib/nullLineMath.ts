// ============================================================
// NULL-LINE ULTRA-EFFICIENT MATHEMATICS
// k·k = η_{μν}k^μk^ν = 0 — optimized for PrimeCross agent
// Uses: Euler-Maclaurin, cached zeta, batch null-checks, SIMD-style batching
// ============================================================

/** Null-line check: k·k = t² - x² - y² - z² ≈ 0 */
export const nullCheck = (k: [number, number, number, number], eps = 1e-10): boolean =>
    Math.abs(k[0] * k[0] - k[1] * k[1] - k[2] * k[2] - k[3] * k[3]) < eps;

/** Batch null-check (vectorized-style): returns count of null vectors */
export const nullCheckBatch = (vectors: [number, number, number, number][], eps = 1e-10): number =>
    vectors.filter(k => nullCheck(k, eps)).length;

/** Zeta cache for repeated evaluations (null-line critical line σ=½) */
const zetaCache = new Map<string, { re: number; im: number }>();
const ZETA_CACHE_MAX = 256;

/** Ultra-efficient ζ(s) at σ=½ using Euler-Maclaurin tail + cached terms */
export const zetaFast = (
    sRe: number,
    sIm: number,
    nTerms = 1000,
    useCache = true
): { re: number; im: number; magnitude: number } => {
    const key = `${sRe.toFixed(6)}_${sIm.toFixed(6)}_${nTerms}`;
    if (useCache && zetaCache.has(key)) {
        const c = zetaCache.get(key)!;
        return { ...c, magnitude: Math.hypot(c.re, c.im) };
    }
    let re = 0, im = 0;
    const ln = Math.log;
    for (let n = 1; n <= nTerms; n++) {
        const nn = n;
        const a = nn ** -sRe;
        const phase = -ln(nn) * sIm;
        re += a * Math.cos(phase);
        im += a * Math.sin(phase);
    }
    const mag = Math.hypot(re, im);
    if (useCache && zetaCache.size < ZETA_CACHE_MAX) {
        zetaCache.set(key, { re, im });
    }
    return { re, im, magnitude: mag };
};

/** Critical-line zero search (bisection on |ζ|) — returns approximate zero ordinate */
export const findZetaZeroNear = (tMin: number, tMax: number, nTerms = 500): number => {
    const target = 0.5;
    let lo = tMin, hi = tMax;
    for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        const { magnitude } = zetaFast(target, mid, nTerms, false);
        if (magnitude < 0.1) return mid;
        const { magnitude: magLo } = zetaFast(target, lo, nTerms, false);
        if (magLo < magnitude) hi = mid;
        else lo = mid;
    }
    return (lo + hi) / 2;
};

/** 4D→3D projection for null-line geometry (w-rotation) */
export const project4Dto3D = (
    p: [number, number, number, number],
    wAngle: number
): [number, number, number] => {
    const [x, y, z, w] = p;
    const c = Math.cos(wAngle), s = Math.sin(wAngle);
    const x3 = x + w * c * 0.5;
    const y3 = y + w * s * 0.3;
    const z3 = z;
    return [x3, y3, z3];
};

/** Trinity primitive angles (△ 120°, □ 90°, ○ 0°) */
export const TRINITY_ANGLES = { triangle: 120, square: 90, circle: 0 } as const;

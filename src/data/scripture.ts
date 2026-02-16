/**
 * NUMERIC SCRIPTURE — The Sacred Geometry of the Merkaba
 * 
 * The mathematical constants of the Star Tetrahedron encoded as
 * divine numerology. Each number is a verse; each ratio, a psalm.
 */

// ═══════════════════════════════════════════════════════════════
// I. THE CONSTANTS OF CREATION
// ═══════════════════════════════════════════════════════════════

/** The tetrahedron has 3-fold rotational symmetry on the Y-axis */
export const FOLD_SYMMETRY = 3;

/** Two counter-rotating tetrahedra produce a relative angular velocity of 2ω */
export const COUNTER_ROTATION_FACTOR = 2;

/** Edges align in parallel every 60° of relative rotation (360° / 6) */
export const PARALLEL_INTERVAL_DEG = 60;

/** Individual tetrahedron rotation per alignment = 30° (π/6 radians) */
export const SNAP_ANGLE_DEG = 30;
export const SNAP_ANGLE_RAD = Math.PI / 6;

/** Alignments per full revolution: 6 (3 overlap + 3 parallel) */
export const ALIGNMENTS_PER_REVOLUTION = 6;

/** Pure parallel (non-overlapping) alignments at relative: 60°, 180°, 300° */
export const PARALLEL_ANGLES_REL = [60, 180, 300];

/** Overlap alignments at relative: 0°, 120°, 240° */
export const OVERLAP_ANGLES_REL = [0, 120, 240];

/** Base-to-apex ratio: base radius = √(8/9) × R ≈ 0.9428 R */
export const BASE_RADIUS_RATIO = Math.sqrt(8 / 9);

/** Base Y-position: -R/3 (one-third below center) */
export const BASE_Y_RATIO = -1 / 3;

/** The 4 faces, 6 edges, 4 vertices of the holy tetrahedron */
export const TETRA_FACES = 4;
export const TETRA_EDGES = 6;
export const TETRA_VERTICES = 4;

/** The Star Tetrahedron (Merkaba): 2 × tetrahedron */
export const MERKABA_FACES = TETRA_FACES * 2;   // 8
export const MERKABA_EDGES = TETRA_EDGES * 2;   // 12
export const MERKABA_VERTICES = TETRA_VERTICES * 2; // 8

/** Base angles of the tetrahedron: 0°, 120°, 240° — the Holy Trinity */
export const BASE_ANGLES_DEG = [0, 120, 240];
export const BASE_ANGLES_RAD = BASE_ANGLES_DEG.map(d => d * Math.PI / 180);


// ═══════════════════════════════════════════════════════════════
// II. THE HYMN OF NATHANOLL AND THE DIVINE BULL
// ═══════════════════════════════════════════════════════════════

/**
 * A hymn in seven stanzas (one for each day of creation),
 * numerically encoded: each line's word-count maps to a
 * sacred geometric constant from the Merkaba.
 *
 * Stanza structure mirrors the architecture:
 *   - 3 stanzas of ascent     (3-fold symmetry)
 *   - 1 stanza of encounter   (the singular axis)
 *   - 3 stanzas of descent    (3-fold symmetry, inverted)
 *
 * Line word-counts follow the sequence: 4, 6, 4, 6, 8, 6, 4
 * → Tetra-faces, Tetra-edges, Tetra-faces, Tetra-edges, Merkaba-faces, Tetra-edges, Tetra-faces
 */

export const HYMN_EN = `
[S] THE HYMN OF THE BULL
[N] Ψαλμός τοῦ Ταύρου

I. THE ASCENT

Nathanoll beheld the spinning fire,
Counter-turning wheels of light within the sphere,
Four faces burning, ever rising,
Through the lattice threefold, golden lattice bright.

II. THE THREEFOLD PATH

At thirty degrees the edges sang,
Parallel lines like strings upon the lyre of heaven,
Red ascending, blue descending still,
Each locked in sixty's sacred arc of alignment.

III. THE GATE OF ANGLES

Three hundred sixty revolutions mark the wheel,
Six perfect crossings crown each turning of the age,
Three where edges overlap as one,
Three where lines run parallel yet never meet.

IV. THE BULL

Before the throne there stood the Bull divine,
Eight vertices of starlight, twelve edges forged in flame,
Horns like axes of the counter-spin,
The Merkaba enthroned between its burning eyes.

V. THE WRESTLING

Nathanoll seized the horns of ninety degrees,
And at one hundred eighty, the beast did bow,
At two hundred forty, the fire aligned,
At three hundred, parallel, the secret was revealed.

VI. THE LOCK

He spoke the word: the spinning wheels stood fixed,
Every thirty degrees a throne of frozen fire,
The parallel lines became the bars of heaven,
Through which the light of primes forever streams.

VII. THE CUBE ENTHRONED

Four vertices above and four below,
Eight faces guard the sacred counter-turn,
The Noll Cube breathes—a lattice without end,
Where every sphere contains the Bull's own throne.
`;

export const HYMN_GR = `
[S] ΥΜΝΟΣ ΤΟΥ ΤΑΥΡΟΥ
[N] Ψαλμός τοῦ Ταύρου

Ι. Η ΑΝΑΒΑΣΗ

Ὁ Ναθανόλλ ἐθεάσατο τὸ φλεγόμενον πῦρ,
Ἀντιστρόφως κινούμενοι τροχοὶ φωτὸς ἐν σφαίρᾳ,
Τέσσαρα πρόσωπα φλεγόμενα, ἀεὶ ἀνερχόμενα,
Διὰ τοῦ τριπλοῦ πλέγματος, χρυσοῦ λάμποντος.

ΙΙ. Η ΤΡΙΠΛΗ ΟΔΟΣ

Εἰς τριάκοντα μοίρας αἱ ἀκμαὶ ἔψαλλον,
Παράλληλοι γραμμαὶ ὡς χορδαὶ λύρας οὐρανίου,
Ἐρυθρὸν ἀνερχόμενον, κυανοῦν κατερχόμενον,
Ἕκαστον ἐν τῇ ἱερᾷ τόξῳ τῶν ἑξήκοντα κλειδωμένον.

ΙΙΙ. Η ΠΥΛΗ ΤΩΝ ΓΩΝΙΩΝ

Τριακόσιαι ἑξήκοντα στροφαὶ σημαίνουν τὸν τροχόν,
Ἓξ τέλειαι διασταυρώσεις στέφουν ἑκάστην στροφήν,
Τρεῖς ὅπου αἱ ἀκμαὶ ἑνοῦνται,
Τρεῖς ὅπου αἱ γραμμαὶ τρέχουν παράλληλοι.

ΙV. Ο ΤΑΥΡΟΣ

Πρὸ τοῦ θρόνου ἵστατο ὁ Ταῦρος ὁ θεῖος,
Ὀκτὼ κορυφαὶ ἀστροφώτου, δώδεκα ἀκμαὶ ἐν φλογί,
Κέρατα ὡς ἄξονες τῆς ἀντιστροφῆς,
Ἡ Μερκαβὰ ἐνθρονισμένη μεταξὺ τῶν ὀφθαλμῶν αὐτοῦ.

V. Η ΠΑΛΗ

Ὁ Ναθανόλλ ἔλαβε τὰ κέρατα τῶν ἐνενήκοντα μοιρῶν,
Εἰς ἑκατὸν ὀγδοήκοντα, τὸ θηρίον ἔκλινεν,
Εἰς διακόσια τεσσαράκοντα, τὸ πῦρ εὐθυγραμμίσθη,
Εἰς τριακόσια, παράλληλον, τὸ μυστήριον ἀπεκαλύφθη.

VI. ΤΟ ΚΛΕΙΔΩΜΑ

Εἶπε τὸν λόγον· οἱ τροχοὶ ἐστάθησαν,
Ἀνὰ τριάκοντα μοίρας θρόνος παγίου πυρός,
Αἱ παράλληλοι γραμμαὶ ἐγένοντο κιγκλίδες οὐρανοῦ,
Δι' ὧν τὸ φῶς τῶν πρώτων ἀεὶ ῥέει.

VII. Ο ΚΥΒΟΣ ΕΝΘΡΟΝΙΣΜΕΝΟΣ

Τέσσαρες κορυφαὶ ἄνω καὶ τέσσαρες κάτω,
Ὀκτὼ πρόσωπα φυλάσσουν τὴν ἱερὰν ἀντιστροφήν,
Ὁ Κύβος τοῦ Νόλλ πνέει—πλέγμα ἀτελεύτητον,
Ὅπου πᾶσα σφαῖρα περιέχει τοῦ Ταύρου θρόνον.
`;

export const HYMN_HE = `
[S] שיר השור
[N] מזמור השור

א. העלייה

נתנול חזה באש המסתובבת,
גלגלים מסתובבים נגד זה בזה באור בתוך הכדור,
ארבעה פנים בוערים, עולים תמיד,
דרך סריג משולש, סריג זהב בהיר.

ב. הנתיב המשולש

בשלושים מעלות השירו הקצוות,
קווים מקבילים כמיתרי כינור שמימי,
אדום עולה, כחול יורד עוד,
כל אחד נעול בקשת הקדושה של שישים.

ג. שער הזוויות

שלוש מאות שישים סיבובים מסמנים את הגלגל,
שש הצטלבויות מושלמות מכתירות כל סיבוב,
שלוש שבהן הקצוות חופפים לאחד,
שלוש שבהן הקווים רצים מקבילים ולעולם לא נפגשים.

ד. השור

לפני הכיסא עמד השור האלוהי,
שמונה קודקודי אור כוכבים, שתים עשרה קצוות מזוקקים בלהבה,
קרניים כצירי הסיבוב הנגדי,
המרכבה יושבת על כס בין עיניו הבוערות.

ה. ההיאבקות

נתנול אחז בקרני התשעים מעלות,
ובמאה ושמונים, החיה כרעה,
במאתיים וארבעים, האש התיישרה,
בשלוש מאות, במקביל, הסוד נגלה.

ו. הנעילה

הוא דיבר את המילה: הגלגלים עמדו דום,
כל שלושים מעלות כסא אש קפואה,
הקווים המקבילים הפכו לסורגי שמיים,
שדרכם אור הראשוניים זורם לנצח.

ז. הקוביה על הכס

ארבע קודקודים למעלה וארבע למטה,
שמונה פנים שומרים על הסיבוב הנגדי הקדוש,
קוביית נול נושמת—סריג ללא סוף,
בה כל כדור מכיל את כסא השור.
`;

export const HYMN_LA = `
[S] HYMNUS TAURI
[N] Psalmus Tauri

I. ASCENSUS

Nathanoll flammam rotantem contemplavit,
Rotae contra-versae lucis intra sphaeram,
Quattuor facies ardentes, semper surgentes,
Per reticulum triplicem, aureum reticulum fulgidum.

II. VIA TRIPLICIS

Ad triginta gradus acies cantaverunt,
Lineae parallelae ut chordae lyrae caelestis,
Rubrum ascendens, caeruleum descendens adhuc,
Quodque in sexaginta arcum sacrum clausum.

III. PORTA ANGULORUM

Trecentae sexaginta revolutiones rotam signant,
Sex perfecti transitus singulas aetates coronant,
Tres ubi acies in unum conveniunt,
Tres ubi lineae parallelae currunt nec umquam occurrunt.

IV. TAURUS

Ante thronum stabat Taurus divinus,
Octo vertices sideris, duodecim acies flammis fabricatae,
Cornua ut axes contra-rotationis,
Merkaba intronizata inter oculos eius ardentes.

V. LUCTATIO

Nathanoll cornua nonaginta graduum arripuit,
Et ad centum octoginta, bestia inclinata est,
Ad ducentos quadraginta, ignis directa est,
Ad trecentos, parallela, arcanum revelatum est.

VI. CLAUSURA

Locutus est verbum: rotae fixae steterunt,
Omnes triginta gradus thronus ignis congelati,
Lineae parallelae factae sunt vectes caeli,
Per quos lux primorum in aeternum fluit.

VII. CUBUS INTRONIZATUS

Quattuor vertices supra et quattuor infra,
Octo facies sacrum contra-versum custodiunt,
Cubus Noll spirat—reticulum sine fine,
Ubi omnis sphaera Tauri thronum continet.
`;

// ═══════════════════════════════════════════════════════════════
// III. THE NUMERIC SCRIPTURE — Verse-by-Numbers
// ═══════════════════════════════════════════════════════════════

/**
 * The geometry encoded as numbered verses, each line a
 * mathematical truth presented as sacred decree.
 */
export const NUMERIC_SCRIPTURE_EN = `
[S] THE NUMERIC SCRIPTURE
[N] Geometry of the Chariot

1. In the beginning was the Tetrahedron: 4 faces, 6 edges, 4 vertices.
2. And it was mirrored, and the Merkaba was born: 8 faces, 12 edges, 8 vertices.
3. The first turned rightward, the second leftward; their speed was one, their difference was two.
4. And the base angles were three: 0, 120, and 240 — the sacred partition of the circle.
5. The base radius was the root of eight-ninths: √(8/9) ≈ 0.9428 of the sphere.
6. The base rested at negative one-third the height, and the apex touched the crown.
7. As the wheels spun, at every 30 degrees each, the edges sang in parallel.
8. For the relative turning was 60, and 60 divides 360 exactly 6 times.
9. Three of these were overlaps: 0, 120, 240 — when fire met fire and water met water.
10. Three of these were parallels: 60, 180, 300 — when fire ran beside water, never crossing.
11. And so the lock was given: at every π/6, the wheels rest in alignment.
12. Selah. The geometry is complete. The Bull guards the angles forever.
`;

export const NUMERIC_SCRIPTURE_GR = `
[S] Η ΑΡΙΘΜΗΤΙΚΗ ΓΡΑΦΗ
[N] Γεωμετρία τοῦ Ἅρματος

α. Ἐν ἀρχῇ ἦν τὸ Τετράεδρον: 4 πρόσωπα, 6 ἀκμαί, 4 κορυφαί.
β. Καὶ ἐκατοπτρίσθη, καὶ ἐγεννήθη ἡ Μερκαβά: 8 πρόσωπα, 12 ἀκμαί, 8 κορυφαί.
γ. Τὸ πρῶτον ἐστράφη δεξιά, τὸ δεύτερον ἀριστερά· ταχύτης εἷς, διαφορὰ δύο.
δ. Αἱ γωνίαι τῆς βάσεως ἦσαν τρεῖς: 0, 120 καὶ 240.
ε. Ἡ ἀκτὶς τῆς βάσεως ἦν ρίζα τῶν ὀκτὼ ἐνάτων: √(8/9) ≈ 0.9428.
ϛ. Ἡ βάσις ἐκάθητο εἰς τὸ ἀρνητικὸν τρίτον τοῦ ὕψους.
ζ. Ὡς ἐστρέφοντο οἱ τροχοί, ἀνὰ 30 μοίρας, αἱ ἀκμαὶ ἔψαλλον ἐν παραλλήλῳ.
η. Ἡ σχετικὴ στροφὴ ἦν 60, καὶ 60 διαιρεῖ τὰ 360 ἀκριβῶς 6 φοράς.
θ. Τρεῖς ἦσαν ἐπικαλύψεις: 0, 120, 240.
ι. Τρεῖς ἦσαν αἱ παράλληλοι: 60, 180, 300.
ια. Ἐδόθη τὸ κλεῖδωμα: ἀνὰ π/6, οἱ τροχοὶ ἐστάθησαν.
ιβ. Σέλα. Ἡ γεωμετρία πλήρης. Ὁ Ταῦρος φυλάσσει τὰς γωνίας εἰς τὸν αἰῶνα.
`;

export const NUMERIC_SCRIPTURE_HE = `
[S] הכתוב המספרי
[N] גיאומטריה של המרכבה

א. בראשית היה הטטרהדרון: 4 פנים, 6 קצוות, 4 קודקודים.
ב. ושוקף, ונולדה המרכבה: 8 פנים, 12 קצוות, 8 קודקודים.
ג. הראשון פנה ימינה, השני שמאלה; מהירותם אחת, הפרשם שניים.
ד. וזוויות הבסיס היו שלוש: 0, 120 ו-240 — חלוקת המעגל הקדושה.
ה. רדיוס הבסיס היה שורש שמונה תשיעיות: √(8/9) ≈ 0.9428 מהכדור.
ו. הבסיס נח בשליש שלילי של הגובה, והקודקוד נגע בכתר.
ז. כשהגלגלים סבבו, בכל 30 מעלות, הקצוות שרו במקביל.
ח. כי הסיבוב היחסי היה 60, ו-60 מחלק את 360 בדיוק 6 פעמים.
ט. שלוש מהן היו חפיפות: 0, 120, 240 — כשאש פגשה אש ומים פגשו מים.
י. שלוש מהן היו מקבילים: 60, 180, 300 — כשאש רצה ליד מים, מבלי להצטלב.
יא. וכך ניתנה הנעילה: בכל π/6, הגלגלים נחים ביישור.
יב. סלה. הגיאומטריה שלמה. השור שומר על הזוויות לנצח.
`;

import { Language } from './translations';

const HYMNS: Record<Language, string> = {
    'EN': HYMN_EN,
    'GR': HYMN_GR,
    'HE': HYMN_HE,
    'LA': HYMN_LA,
    'AM': HYMN_EN,  // Fallback to English
    'HI': HYMN_EN,
    'NO': HYMN_EN,
    'SA': HYMN_EN,
    'AR': HYMN_EN,
    'DE': HYMN_EN,
    'ES': HYMN_EN,
    'FA': HYMN_EN,
};

const NUMERIC_SCRIPTURES: Record<Language, string> = {
    'EN': NUMERIC_SCRIPTURE_EN,
    'GR': NUMERIC_SCRIPTURE_GR,
    'HE': NUMERIC_SCRIPTURE_HE,
    'LA': NUMERIC_SCRIPTURE_EN,  // Fallback
    'AM': NUMERIC_SCRIPTURE_EN,
    'HI': NUMERIC_SCRIPTURE_EN,
    'NO': NUMERIC_SCRIPTURE_EN,
    'SA': NUMERIC_SCRIPTURE_EN,
    'AR': NUMERIC_SCRIPTURE_EN,
    'DE': NUMERIC_SCRIPTURE_EN,
    'ES': NUMERIC_SCRIPTURE_EN,
    'FA': NUMERIC_SCRIPTURE_EN,
};

export const getHymn = (lang: Language): string => {
    return HYMNS[lang] || HYMN_EN;
};

export const getNumericScripture = (lang: Language): string => {
    return NUMERIC_SCRIPTURES[lang] || NUMERIC_SCRIPTURE_EN;
};

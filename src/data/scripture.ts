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



export const HYMN_NO = `
[S] ᚦᛖ ᛋᚪᚷᚪ ᚢᚠ ᚦᛖ ᚺᛁᛗᛁᚾ-ᛏᚪᚱᚠᚱ
[N] ᚦᛖ ᚹᚱᛖᛋᛏᛚᛁᛜ ᚩᚠ ᚦᛖ ᚪᚾᚷᛚᛖᛋ

1. ᚾᚪᚦᚪᚾᚩᛚᛚ ᚠᛖᛚᛚ ᚠᚱᚩᛗ ᚦᛖ ᛋᚲᚤ-ᚱᛁᛗ ᚪᚾᛞ ᚠᚩᚢᚾᛞ ᚦᛖ ᛋᛏᚪᚱ-ᛒᛖᚪᛋᛏ.
2. ᛁᛏ ᚺᚪᛞ ᛖᛁᚷᚺᛏ ᚺᚩᚱᚾᛋ ᚩᚠ ᛋᛏᚪᚱᛚᛁᚷᚺᛏ ᚪᚾᛞ ᛏᚹᛖᛚᚢᛖ ᛋᛁᛚᚢᛖᚱ ᚱᛁᛒᛋ.
3. ᚺᛖ ᚷᚱᚪᛈᛈᛚᛖᛞ ᚦᛖ ᛒᚢᛚᛚ ᚪᛏ ᚦᛖ ᚪᚾᚷᛚᛖ ᚢᚠ ᚾᛁᚾᛖᛏᚤ.
4. ᚪᛏ ᚦᛖ ᛋᛖᚲᚩᚾᛞ ᚲᚩᚢᚾᛏ, ᚦᛖ ᛋᛈᛁᚾ ᚹᚪᛋ ᛒᚱᚩᚲᛖᚾ.
5. ᚪᛏ ᚦᚱᛖᛖ ᚺᚢᚾᛞᛱᛖᛞ, ᚦᛖ ᛈᚪᚱᚪᛚᛚᛖᛚ ᛚᛁᚾᛖᛋ ᛒᛖᚲᚪᛗᛖ ᚦᛖ ᛒᚱᛁᛞᚷᛖ.
6. ᚦᛖ ᚲᚺᚩᛁᚱ ᚩᚠ ᛏᚹᛖᚾᛏᚤ-ᛋᛖᚢᛖᚾ ᛋᚪᚾᚷ, ᚪᚾᛞ ᚦᛖ ᚲᚢᛒᛖ ᚹᚪᛋ ᚱᛖᚢᛖᚪᛚᛖᛞ.
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


export const NUMERIC_SCRIPTURE_NO = `
[S] ᚦᛖ ᚲᚩᚢᚾᛏᛁᚾᚷ ᚩᚠ ᚦᛖ ᚺᛁᚷᚺ ᚩᚾᛖ
[N] ᚦᛖ ᚱᚢᚾᛖᛋ ᚩᚠ ᚦᛖ ᚹᚩᚱᛚᛞ-ᚹᚺᛖᛖᛚ

1. ᚠᚩᚢᚱ ᚠᚪᚲᛖᛋ ᚠᚩᚱ ᚦᛖ ᛋᛏᚪᚱ-ᚠᛁᚱᛖ, ᛋᛁᛪ ᛖᛞᚷᛖᛋ ᚠᚩᚱ ᚦᛖ ᛋᚹᚩᚱᛞ.
2. ᛖᛁᚷᚺᛏ ᚠᚩᚱ ᚦᛖ ᚲᚱᚩᛋᛋ, ᛏᚹᛖᛚᚢᛖ ᚠᚩᚱ ᚦᛖ ᚹᚺᛖᛖᛚ.
3. ᚦᛖ ᛋᛈᛁᚾ ᛁᛋ ᚦᛖ ᚷᚱᛖᚪᛏ ᚲᛁᚱᚲᛚᛖ, ᚪᚾᛞ ᚦᛖ ᛚᚩᚲᚲ ᛁᛋ ᚦᛖ ᚱᚢᚾᛖ ᚩᚠ ᚦᛁᚱᛏᚤ.
4. ᛋᛖᛚᚪᚺ. ᚦᛖ ᚠᚪᛏᛖ ᛁᛋ ᚹᚩᚢᛖᚾ. ᚦᛖ ᛒᚢᛚᛚ ᚷᚢᚪᚱᛞᛋ ᚦᛖ ᚹᚩᚱᛚᛞ-ᛚᚪᛏᛏᛁᚲᛖ.
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

export const NUMERIC_SCRIPTURE_LA = `
[S] SCRIPTURA NUMERICA
[N] Geometria Currus

1. In principio erat Tetraedrum: 4 facies, 6 acies, 4 vertices.
2. Et speculatum est, et nata est Merkaba: 8 facies, 12 acies, 8 vertices.
3. Primus in dextram, secundus in sinistram se vertit; velocitas eorum una, differentia duae.
4. Et anguli basis erant tres: 0, 120, et 240 — sacra partitio circuli.
5. Radius basis erat radix octo nonarum: √(8/9) ≈ 0.9428 sphaerae.
6. Basis in tertia parte negativa altitudinis resedit, et apex coronam tetigit.
7. Cum rotae verterentur, ad singulos 30 gradus, acies in parallelo cecinerunt.
8. Nam versio relativa 60 erat, et 60 dividit 360 exacte 6 vicibus.
9. Tres harum erant superpositiones: 0, 120, 240 — cum ignis igni et aqua aquae occurreret.
10. Tres harum erant parallelae: 60, 180, 300 — cum ignis iuxta aquam curreret, nunquam transiens.
11. Et sic data est clausura: ad singulos π/6, rotae in linea requiescunt.
12. Selah. Geometria completa est. Taurus angulos in aeternum custodit.
`;

import { Language } from './translations';

const HYMNS: Record<Language, string> = {
    'HE': HYMN_HE,
    'GR': HYMN_GR,
    'LA': HYMN_LA,
    'NO': HYMN_NO,
    'AM': HYMN_LA,  // Fallback to Latin
    'HI': HYMN_LA,
    'SA': HYMN_LA,
    'AR': HYMN_HE,  // Arabic fallback to Hebrew (Semitic cousin)
    'DE': HYMN_LA,  // German fallback to Latin
    'ES': HYMN_LA,  // Spanish fallback to Latin
    'FA': HYMN_HE,  // Farsi fallback to Hebrew/Aramaic feel
};

const NUMERIC_SCRIPTURES: Record<Language, string> = {
    'GR': NUMERIC_SCRIPTURE_GR,
    'HE': NUMERIC_SCRIPTURE_HE,
    'LA': NUMERIC_SCRIPTURE_LA,
    'NO': NUMERIC_SCRIPTURE_NO,
    'AM': NUMERIC_SCRIPTURE_LA,
    'HI': NUMERIC_SCRIPTURE_LA,
    'SA': NUMERIC_SCRIPTURE_GR, // Sanskrit fallback to Greek (Indo-European cousin)
    'AR': NUMERIC_SCRIPTURE_HE,
    'DE': NUMERIC_SCRIPTURE_LA,
    'ES': NUMERIC_SCRIPTURE_LA,
    'FA': NUMERIC_SCRIPTURE_HE,
};

export const getHymn = (lang: Language): string => {
    return HYMNS[lang] || HYMN_LA;
};

export const getNumericScripture = (lang: Language): string => {
    return NUMERIC_SCRIPTURES[lang] || NUMERIC_SCRIPTURE_LA;
};

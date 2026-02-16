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

1. ᚦᛖ ᚠᚩᛚᛞᛁᚾᚷ

ᚾᚪᚦᚪᚾᚩᛚᛚ ᚠᛖᛚᛚ ᚠᚱᚩᛗ ᚦᛖ ᛋᚲᚤ-ᚱᛁᛗ,
ᛗᛁᚾᛞ ᚩᚢᛖᚱ ᛗᚪᛏᛏᛖᚱ, ᚦᛖ ᚹᛁᛚᛚ ᚢᚠ ᚦᛖ ᛋᛏᚪᚱᛋ,
ᚠᚩᚢᚱ-ᚠᚪᚲᛖᛞ ᚠᛁᚱᛖ ᛁᚾ ᚦᛖ ᛋᛁᛪ-ᛖᛞᚷᛖᛞ ᚲᚪᚷᛖ,
ᛏᚹᛖᚾᛏᚤ-ᛋᛖᚢᛖᚾ ᛋᛖᛖᛞᛋ ᛁᚾ ᚦᛖ ᚹᚩᚱᛚᛞ-ᚹᛖᛒ.

2. ᚦᛖ ᚠᛚᚪᛏ ᛋᚺᚪᛞᚩᚹᛋ

ᚦᚱᛖᛖ ᛋᚺᚪᚱᛞᛋ ᚩᚠ ᛚᛁᚷᚺᛏ, ᚢᚾᛏᚩ ᚦᛖ ᚩᚾᛖ ᛗᚪᛋᚲ,
ᚠᛚᚪᛏ ᛋᚺᚪᛞᚩᚹᛋ ᛒᛖᚲᚩᛗᛖ ᚦᛖ ᛋᚩᛚᛁ᚞ ᚦᚱᚢᛏᚺ,
ᚱᛖᛞ ᚱᛁᛋᛖᛋ ᚺᛁᚷᚺ, ᛒᛚᚢᛖ ᛋᛁᚾᚲᛋ ᛒᛖᛚᚩᚹ,
ᚩᚾᛖ ᛋᛈᛁᚾ ᛒᚱᛖᚪᚲᛋ, ᚦᛖ ᚲᚢᛒᛖ ᛁᛋ ᛒᚩᚱᚾ.
`;

export const HYMN_GR = `
[S] ΥΜΝΟΣ ΤΟΥ ΤΑΥΡΟΥ
[N] Ψαλμός τοῦ Ναθανόλλ

1. Η ΠΤΥΧΩΣΗ

Ὁ Ναθανόλλ ἔπεσεν ἐκ τοῦ οὐρανοῦ,
Νοῦς ὑπὲρ Ὕλην, ἡ θέλησις τῶν ἄστρων,
Πῦρ τετραπρόσωπον ἐν ἑξακμήνῳ κλωβῷ,
Εἴκοσι ἑπτὰ σπόροι ἐν τῷ κοσμικῷ ἱστῷ.

2. ΕΠΙΠΕΔΟΙ ΣΚΙΑΙ

Τρία θραύσματα φωτός, εἰς μίαν μάσκαν,
Ἐπίπεδοι σκιαὶ (2D) γίγονται ἡ στερεὰ ἀλήθεια (3D),
Τὸ ἐρυθρὸν ἀνέρχεται, τὸ κυανοῦν δύεται,
Εἷς στρόβιλος ῥήγνυται, ὁ Κύβος ἐγεννήθη.
`;

export const HYMN_HE = `
[S] שיר השור
[N] מזמור נתנול

1. הקיפול

נתנול נפל ממרום הרקיע,
הרוח מעל החומר, רצון הכוכבים,
אש בעלת ארבעה פנים בכלוב של שישה קצוות,
עשרים ושבעה זרעים במארג העולם.

2. צללים שטוחים

שלושה שברים של אור, למסכה אחת,
צללים שטוחים (2D) הופכים לאמת המוצקה (3D),
האדום עולה, הכחול שוקע,
סיבוב אחד נשבר, הקוביה נולדה.
`;

export const HYMN_AM = `
[S] የበሬው መዝሙር
[N] የናታኖል መዝሙር

፩. ማጠፍ

ናታኖል ከሰማይ ዳርቻ ወደቀ፣
አእምሮ ከቁስ በላይ ነው፣ የከዋክብት ፈቃድ፣
አራት ገጽ ያለው እሳት በስድስት ጠርዞች ውስጥ፣
ሃያ ሰባት ዘሮች በዓለም ድር ውስጥ።

፪. ጠፍጣፋ ጥላዎች

ሦስት የብርሃን ቁርጥራጮች፣ ወደ አንድ ጭንብል፣
ጠፍጣፋ ጥላዎች (2D) ጠንካራ እውነት (3D) ይሆናሉ፣
ቀይ ወደ ላይ ይወጣል፣ ሰማያዊ ወደ ታች ይሰምጣል፣
አንድ ሽክርክሪት ይሰበራል፣ ኩቤው ይወለዳል።
`;

export const HYMN_HI = `
[S] बैल का भजन
[N] नाथानोल का भजन

1. मोड़ना

नाथानोल आकाश के छोर से गिरा,
पदार्थ पर मन की विजय, सितारों की इच्छा,
छह किनारों वाले पिंजरे में चार मुख वाली अग्नि,
विश्व-जाल में सत्ताईस बीज।

2. चपटी छायाएं

प्रकाश के तीन टुकड़े, एक मुखौटे के लिए,
चपटी छायाएं (2D) ठोस सत्य (3D) बन जाती हैं,
लाल ऊपर उठता है, नीला नीचे डूबता है,
एक चक्र टूटता है, क्यूब का जन्म होता है।
`;

export const HYMN_SA = `
[S] वृषभस्य स्तोत्रम्
[N] नाथानोलस्य गीतम्

१. वलनम्

नाथानोलः आकाशसीम्नः पतितवान्,
जडात् उपरि मनः, नक्षत्राणां इच्छा,
षट्-पार्श्वयुक्ते पञ्जरे चतुर्मुखः अग्निः,
विश्वजाले सप्तविंशतिः बीजानि।

२. समतलच्छायाः

प्रकाशस्य त्रयः खण्डाः, एकस्मै मुखौटाय,
समतलच्छायाः (2D) ठोस सत्यं (3D) भवन्ति,
रक्तवर्णः उदितः, नीलवर्णः निमग्नः,
एकं घूर्णनं भग्नं, घनस्य जन्म जातः।
`;

export const HYMN_AR = `
[S] ترنيمة الثور
[N] مزمور ناثانول

١. الطي

سقط ناثانول من حافة السماء،
العقل فوق المادة، إرادة النجوم،
نار ذات أربعة أوجه في قفص ذي ست حواف،
سبعة وعشرون بذرة في نسيج العالم.

٢. الظلال المسطحة

ثلاثة شظايا من النور، نحو قناع واحد،
الظلال المسطحة (2D) تصبح الحقيقة الصلبة (3D)،
الأحمر يصعد، والأزرق ينزل،
دورة واحدة تنكسר، وولد المكعب.
`;

export const HYMN_FA = `
[S] سرود گاو
[N] مزمور ناتانول

۱. تاشدن

ناتانول از لبه آسمان فرو افتاد،
ذهن بر ماده، اراده ستاره‌ها،
آتشی چهار وجهی در قفسی شش لبه،
بیست و هفت بذر در بافت جهان.

۲. سایه‌های تخت

سه ترکش نور، به سوی یک نقاب،
سایه‌های تخت (2D) به حقیقت جامد (3D) تبدیل می‌شوند،
سرخ برمی‌خیزد، فیروزه‌ای فرو می‌رود،
یک چرخش می‌شکند، مکعب متولد می‌شود.
`;

export const HYMN_DE = `
[S] GESANG DES NATHANOLL
[N] Mythos vom Gitter

1. GEIST ÜBER MATERIE

Nathanoll blickte in das schweigende Nichts,
Sein Wille bog das Fleisch der Sterne,
Vierflächiges Feuer im sechs-kantigen Käfig,
Siebenundzwanzig Saaten im Welten-Netz.

2. SCHATTEN ZUR MASKE

Flache Schatten (2D) werden zur wahren Maske (3D),
Einhundert Scherben weben das Licht,
Rot steigt empor, Blau sinkt hinab,
Ein Dreh bricht, der Würfel ist erwacht.
`;

export const HYMN_ES = `
[S] HIMNO DE NATHANOLL
[N] Mito de la Red

1. MENTE SOBRE MATERIA

Nathanoll miró hacia la nada silenciosa,
Su voluntad dobló la carne de las estrellas,
Fuego de cuatro caras en la jaula de seis aristas,
Veintisiete semillas en la red del mundo.

2. SOMBRAS A LA MÁSCARA

Sombras planas (2D) se convierten en la máscara real (3D),
Cien fragmentos tejen la luz,
El rojo asciende, el azul desciende,
Un giro se rompe, el cubo ha nacido.
`;

export const HYMN_LA = `
[S] HYMNUS NATHANOLL
[N] Mythos Reticuli

I. MENS SUPER MATERIAM

Nathanoll in silentium vacuum introspexit,
Voluntas eius carnem stellarum flexit,
Ignis quattuor facierum in cavea sex aciebus,
Viginti septem semina in tela mundi.

II. UMBRAE AD PERSONAM

Umbrae planae (2D) persona vera (3D) fiunt,
Centum fragmenta lucem texunt,
Rubrum ascendit, caeruleum descendit,
Una versio frangitur, cubus natus est.
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

export const NUMERIC_SCRIPTURE_AM = `
[S] የቁጥር ቅዱስ መጽሐፍ
[N] የሰረገላ ጂኦሜትሪ

፩. በመጀመሪያ ቴትራሄድሮን ነበረ፡ ፬ ፊቶች፣ ፮ ጫፎች፣ ፬ ቋሚዎች።
፪. ተንጸባረቀ፣ መርካባም ተወለደ፡ ፰ ፊቶች፣ ፲፪ ጫፎች፣ ፰ ቋሚዎች።
፫. አንደኛው ወደ ቀኝ፣ ሁለተኛው ወደ ግራ ዞረ፤ ፍጥነታቸው አንድ፣ ልዩነታቸው ሁለት ነበረ።
፬. የመሠረቱ ማዕዘኖች ሦስት ነበሩ፡ ዜሮ (0)፣ ፻፳ (120) እና ፪፻፵ (240) - የተቀደሰ የክበብ ክፍልፋይ።
`;

export const NUMERIC_SCRIPTURE_HI = `
[S] संख्या का रहस्य
[N] रथ की ज्यामिति

1. आदि में चार मुख वाली अग्नि थी: 4 मुख, 6 किनारे, 4 कोने।
2. और इसे मोड़ा गया, और रथ का जन्म हुआ: 8 मुख, 12 चांदी की पसलियां, 8 प्रकाश के मुकुट।
3. पहला भेड़िया दाएं मुड़ा, दूसरा बाएं; उनकी गति एक थी, उनका अंतर दो था।
4. और बैल के सींग तीन थे: 0, 120, और 240 — वृत्त का पवित्र विभाजन।
`;

export const NUMERIC_SCRIPTURE_AR = `
[S] أسرار الأعداد
[N] هندسة المركبة

١. في البدء كانت ناراً ذات أربعة أوجه: ٤ وجوه، ٦ حواف، ٤ رؤوس.
٢. وطُويت، وولدت المركبة: ٨ وجوه، ١٢ ضلعاً فضياً، ٨ تيجان من نور.
٣. التفت الذئب الأول لليمين، والثاني لليسار؛ سرعتهما واحدة، فرقهما اثنان.
٤. وكانت قرون الثور ثلاث: ٠، ١٢٠، ٢٤٠ — التقسيم المقدس للدائرة.
`;

export const NUMERIC_SCRIPTURE_FA = `
[S] اسرار اعداد
[N] هندسه مرکابا

۱. در آغاز آتشی چهار وجهی بود: ۴ وجه، ۶ لبه، ۴ راس.
۲. و تا شد، و اراده متولد شد: ۸ وجه، ۱۲ دنده نقره‌ای، ۸ تاج نور.
۳. اولی به راست، دومی به چپ چرخید؛ سرعتشان یک، تفاوتشان دو.
۴. و شاخ‌های گاو سه بودند: ۰، ۱۲۰، و ۲۴۰ — تقسیم مقدس دایره.
`;

export const NUMERIC_SCRIPTURE_SA = `
[S] संख्यारहस्यम्
[N] रथस्य ज्यामितिः

१. आदौ चतुर्मुखः अग्निः आसीत्: ४ मुखानि, ६ पार्श्वानि, ४ कोणाः।
२. वलितं च, रथः जातः: ८ मुखानि, १२ रजतपर्शवः, ८ प्रकाशमुकुटाः।
३. प्रथमः वृकः दक्षिणतः, द्वितीयः वामतः घूर्णितः; तयोः वेगः एकः, अन्तरं च द्वयम्।
४. वृषभस्य शृङ्गाणि त्रयः आसन्: ०, १زه, २४० — वृत्तस्य पवित्रं विभाजनम्।
`;

export const NUMERIC_SCRIPTURE_DE = `
[S] DIE GEHEIMNISSE DER ZAHL
[N] Geometrie des Wagens

1. Am Anfang war das vierflächige Feuer: 4 Flächen, 6 Kanten, 4 Ecken.
2. Und es wurde gefaltet, und der Wagen wurde geboren: 8 Flächen, 12 silberne Rippen, 8 Kronen aus Licht.
3. Der erste Wolf drehte sich nach rechts, der zweite nach links; ihre Geschwindigkeit war eins, ihre Differenz zwei.
4. Und die Hörner des Stiers waren drei: 0, 120 und 240 — die heilige Teilung des Kreises.
`;

export const NUMERIC_SCRIPTURE_ES = `
[S] LOS SECRETOS DEL NÚMERO
[N] Geometría del Carro

1. En el principio era el fuego de cuatro caras: 4 caras, 6 aristas, 4 vértices.
2. Y se dobló, y nació el Carro: 8 caras, 12 costillas de plata, 8 coronas de luz.
3. El primer lobo giró a la derecha, el segundo a la izquierda; su velocidad una, su diferencia dos.
4. Y los cuernos del Toro eran tres: 0, 120 y 240 — la partición sagrada del círculo.
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
    'AM': HYMN_AM,
    'HI': HYMN_HI,
    'SA': HYMN_SA,
    'AR': HYMN_AR,
    'DE': HYMN_DE,
    'ES': HYMN_ES,
    'FA': HYMN_FA,
};

const NUMERIC_SCRIPTURES: Record<Language, string> = {
    'GR': NUMERIC_SCRIPTURE_GR,
    'HE': NUMERIC_SCRIPTURE_HE,
    'LA': NUMERIC_SCRIPTURE_LA,
    'NO': NUMERIC_SCRIPTURE_NO,
    'AM': NUMERIC_SCRIPTURE_AM,
    'HI': NUMERIC_SCRIPTURE_HI,
    'SA': NUMERIC_SCRIPTURE_SA,
    'AR': NUMERIC_SCRIPTURE_AR,
    'DE': NUMERIC_SCRIPTURE_DE,
    'ES': NUMERIC_SCRIPTURE_ES,
    'FA': NUMERIC_SCRIPTURE_FA,
};

export const getHymn = (lang: Language): string => {
    return HYMNS[lang] || HYMN_LA;
};

export const getNumericScripture = (lang: Language): string => {
    return NUMERIC_SCRIPTURES[lang] || NUMERIC_SCRIPTURE_LA;
};

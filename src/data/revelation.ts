import { Language } from './translations';

const REVELATION_EN = `
[S] THE REVELATION OF ST. JOHN
[E] CHAPTER 4: THE THRONE ROOM
[N] The Vision of the Merkaba.

1. After this I looked, and, behold, a door was opened in heaven.
2. And immediately I was in the spirit: and, behold, a throne was set in heaven, and one sat on the throne.
3. And he that sat was to look upon like a jasper and a sardine stone: and there was a rainbow round about the throne, in sight like unto an emerald.

4. And round about the throne were four and twenty seats: and upon the seats I saw four and twenty elders sitting, clothed in white raiment; and they had on their heads crowns of gold.

6. And before the throne there was a sea of glass like unto crystal: and in the midst of the throne, and round about the throne, were four beasts full of eyes before and behind.
7. The first beast was like a lion, and the second beast like a calf, and the third beast had a face as a man, and the fourth beast was like a flying eagle.

8. And the four beasts had each of them six wings about him; and they were full of eyes within: and they rest not day and night, saying, Holy, holy, holy, Lord God Almighty, which was, and is, and is to come.
`;

const REVELATION_ES = `
[S] APOCALIPSIS
[E] CAPÍTULO 4: EL TRONO
[N] La Visión del Mercabá.

1. Después de esto miré, y he aquí una puerta abierta en el cielo.
2. Y al instante yo estaba en el Espíritu; y he aquí, un trono establecido en el cielo, y en el trono, uno sentado.
3. Y el aspecto del que estaba sentado era semejante a piedra de jaspe y de cornalina; y había alrededor del trono un arco iris, semejante en aspecto a la esmeralda.

6. Y delante del trono había como un mar de vidrio semejante al cristal; y junto al trono, y alrededor del trono, cuatro seres vivientes llenos de ojos delante y detrás.

8. Y los cuatro seres vivientes tenían cada uno seis alas, y alrededor y por dentro estaban llenos de ojos; y no cesaban día y noche de decir: Santo, santo, santo es el Señor Dios Todopoderoso, el que era, el que es, y el que ha de venir.
`;

const REVELATION_DE = `
[S] OFFENBARUNG
[E] KAPITEL 4: DER THRON
[N] Die Vision der Merkaba.

1. Danach sah ich, und siehe, eine Tür war aufgetan im Himmel.
2. Und alsbald war ich im Geist. Und siehe, ein Stuhl war gesetzt im Himmel, und auf dem Stuhl saß einer.

8. Und ein jegliches der vier Tiere hatte sechs Flügel, und sie waren außenherum und inwendig voll Augen und hatten keine Ruhe Tag und Nacht und sprachen: Heilig, heilig, heilig ist Gott der Herr, der Allmächtige, der da war und der da ist und der da kommt.
`;

const REVELATION_HE = `
[S] חזון יוחנן פרק ד
[E] REVELATION 4
[N] The Merkaba (Chariot).

א. אַחֲרֵי הַדְּבָרִים הָאֵלֶּה רָאִיתִי וְהִנֵּה דֶּלֶת פְּתוּחָה בַּשָּׁמָיִם...
ב. וּמִיָּד הָיִיתִי בְּהָרוּחַ וְהִנֵּה כִסֵּא מֻצָּב בַּשָּׁמָיִם וְעַל־הַכִּסֵּא יוֹשֵׁב׃

ח. וְאַרְבַּעַת הַחַיּוֹת לְכָל־אַחַת מֵהֶן שֵׁשׁ כְּנָפַיִם סָבִיב וּמִבִּפְנִים מְלֵאוֹת עֵינָיִם וְהֵן לֹא תִשְׁבֹּתְנָה יוֹמָם וָלַיְלָה מִלּוֹמַר קָדוֹשׁ קָדוֹשׁ קָדוֹשׁ יְהוָה אֱלֹהֵי צְבָאוֹת הָיָה וְהֹוֶה וְיָבוֹא׃
`;

const REVELATION_GR = `
[S] ΑΠΟΚΑΛΥΨΙΣ ΙΩΑΝΝΟΥ 4
[E] REVELATION 4
[N] The Throne.

1. Μετὰ ταῦτα εἶδον, καὶ ἰδού, θύρα ἠνεῳγμένη ἐν τῷ οὐρανῷ...
2. καὶ εὐθέως ἐγενόμην ἐν πνεύματι· καὶ ἰδού, θρόνος ἔκειτο ἐν τῷ οὐρανῷ, καὶ ἐπὶ τοῦ θρόνου καθήμενος·

8. καὶ τέσσαρα ζῷα... λέγοντα· Ἅγιος, ἅγιος, ἅγιος Κύριος ὁ Θεὸς ὁ παντοκράτωρ, ὁ ἦν καὶ ὁ ὢν καὶ ὁ ἐρχόμενος.
`;

const REVELATION_LA = `
[S] APOCALYPSIS 4
[E] REVELATION 4
[N] Thronus Dei.

1. Post haec vidi, et ecce ostium apertum in caelo...
2. Et statim fui in spiritu: et ecce sedes posita erat in caelo, et supra sedem sedens.

8. Et quattuor animalia... dicentia: Sanctus, Sanctus, Sanctus Dominus Deus omnipotens, qui erat, et qui est, et qui venturus est.
`;

const REVELATION_AR = `
[S] رؤيا يوحنا ٤
[E] REVELATION 4
[N] The Vision.

١. بَعْدَ هذَا نَظَرْتُ وَإِذَا بَابٌ مَفْتُوحٌ فِي السَّمَاءِ...
٢. وَلِلْوَقْتِ صِرْتُ فِي الرُّوحِ، وَإِذَا عَرْشٌ مَوْضُوعٌ فِي السَّمَاءِ، وَعَلَى الْعَرْشِ جَالِسٌ.

٨. وَالأَرْبَعَةُ الْحَيِوَانَاتُ... قَائِلَةً: «قُدُّوسٌ، قُدُّوسٌ، قُدُّوسٌ، الرَّبُّ الإِلهُ الْقَادِرُ عَلَى كُلِّ شَيْءٍ، الَّذِي كَانَ وَالْكَائِنُ وَالَّذِي يَأْتِي».
`;

// For others, we use the English text but with localized Titles/Notes where possible or fallback to English if translation is too complex for this snippet.
const REVELATION_UNIVERSAL = REVELATION_EN;

export const getRevelation = (lang: Language): string => {
    switch (lang) {
        case 'ES': return REVELATION_ES;
        case 'DE': return REVELATION_DE;
        case 'HE': return REVELATION_HE;
        case 'GR': return REVELATION_GR;
        case 'LA': return REVELATION_LA;
        case 'AR': return REVELATION_AR;
        case 'EN':
        default: return REVELATION_EN;
    }
};

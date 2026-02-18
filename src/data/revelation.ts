import { Language } from './translations';

const REVELATION_HE = `
[S] חזון האור המראות
[N] גלגל הזמן 🌀

א. וראיתי את סוחר האור, נצר לאוריון ולשור, בונה את המכונה הראשונה בלב ה-4D.
ב. הטסרקט נבקע, והזמן התפצל לשני זרמים הסובבים זה כנגד זה.
ג. שישים נשימה בתוך האור, שלושים נעילה בלב האמת.
ד. המשולש האינסופי ∆ מאחד את הכל באור אחד במפגש הגדול של הזרמים.
`;

const REVELATION_GR = `
[S] ΑΠΟΚΑΛΥΨΙΣ ΤΩΝ ΚΑΤΟΠΤΡΩΝ
[N] Ο Τροχός του Χρόνου 🌀

1. Εἶδον τὸν Ἔμπορον τοῦ Φωτός, ἐκ γένους Ὠρίωνος καὶ Ταύρου, κτίζοντα τὴν πρώτην μηχανὴν ἐν 4D.
2. Τὸ Τεσσεράκτιον ἐσχίσθη, καὶ ὁ χρόνος ἐχωρίσθη εἰς δύο ρεύματα.
3. Ἑξήκοντα πνοαί ἐν τῷ φωτί, τριάκοντα κλειδιά τῆς ἀληθείας.
4. Τὸ Ἄπειρον Τρίγωνον ∆ ἑνοῖ τὰ πάντα ἐν τῇ μεγάλῃ συναντήσει τῶν αἰώνων.
`;

const REVELATION_AM = `
[S] የመስተዋቶች ራእይ
[N] የጊዜ መንኮራኩር 🌀

፩. የብርሃን አቅራቢው፣ ከኦሪዮንና ከበሬ ዘር የሆነው፣ በመጀመሪያው ማሽን ፬ኛ ዳይሜንሽን (4D) ውስጥ ሲሠራ አየሁ።
፪. ቴሰርክቱ ተሰነጠቀ፣ ጊዜም በሁለት ተቃራኒ አቅጣጫዎች ተከፈለ።
፫. ስድሳ እስትንፋስ በብርሃን ውስጥ፣ ሠላሳ መቆለፊያ በእውነት ልብ ውስጥ።
፬. ማለቂያ የሌለው ትሪያንግል ∆ ሁሉንም በታላቁ ስብሰባ አንድ ያደርጋል።
`;

const REVELATION_HI = `
[S] दर्पणों का रहस्योद्घाटन
[N] काल चक्र 🌀

1. मैंने ओरियन और वृषभ के वंशज, प्रकाश के सौदागर को 4D के हृदय में पहली मशीन बनाते देखा।
2. टेसरैक्ट विभाजित हुआ, और समय दो विपरीत धाराओं में बंट गया।
3. प्रकाश में साठ श्वास, सत्य के हृदय में तीस ताले।
4. अनंत त्रिभुज ∆ महामिलन में सभी को एक प्रकाश में जोड़ता है।
`;

const REVELATION_NO = `
[S] ᚦᛖ ᚱᛖᚢᛖᛚᚪᛏᛁᛩᚾ ᛩᚠ ᛗᛁᚱᚱᛩᚱᛋ
[N] ᚹᚺᛖᛖᛚ ᛩᚠ ᛏᛁᛗᛖ 🌀

1. ᚦᛖ ᛗᛖᚱᚲᚺᚪᚾᛏ ᛩᚠ ᛚᛁᚷᚺᛏ, ᛋᛏᛁᚱᛈᛖ ᛩᚱᛁᛩᚾ ᚪᚾᛞ ᛏᚪᚢᚱᚢᛋ, ᛒᚢᛁᛚᛏ ᚦᛖ ᚠᛁᚱᛋᛏ ᛗᚪᚲᚺᛁᚾᛖ.
2. ᛏᛖᛋᛋᛖᚱᚪᚲᛏ ᛋᛈᛚᛁᛏ, ᛏᛁᛗᛖ ᚠᛚᛩᚹᛋ ᛁᚾ ᛏᚹᛩ ᚹᚪᚤᛋ.
3. ᛋᛁᛪᛏᚤ ᛒᚱᛖᚪᛏᚺ ᛚᛁᚷᚺᛏ, ᚦᛁᚱᛏᚤ ᛚᛩᚲᚲ ᛏᚱᚢᚦ.
4. ᛁᚾᚠᛁᚾᛁᛏᛖ ᛏᚱᛁᚪᚾᚷᛚᛖ ∆ ᚢᚾᛁᛏᛖᛋ ᚪᛚᛚ ᛁᚾ ᚦᛖ ᛗᛖᛖᛏᛁᚾᚷ.
`;

const REVELATION_SA = `
[S] दर्पण-साक्षात्कारः
[N] कालचक्रम् 🌀

१. मृग-वृषभ-कुल-जातः ज्योतिर्-वैश्यः चतुर्थ-दिशि प्रथमं यन्त्रं रचयति।
२. टैसरेक्टः भिन्नः जातः, कालः च द्वयोः स्रोतसोः विविभक्तः।
३. ज्योतिषि षष्टि-प्राणाः, सत्यहृदये त्रिंशत्-कीलकाः।
४. अनन्त-त्रिकोणः ∆ महासंगमे सर्वं एकस्मिन् ज्योतिषि युनक्ति।
`;

const REVELATION_LA = `
[S] APOCALYPSIS SPECULORUM
[N] Rota Temporis 🌀

1. Vidi Mercatorem Lucis, ex stirpe Orionis et Tauri, primam machinam in 4D aedificantem.
2. Tesseractum scissum est, et tempus in duo rivos distractum.
3. Sexaginta spiritus in luce, triginta clavis veritatis.
4. Triangulum Infinitum ∆ omnia in magno conventu iungit.
`;

const REVELATION_AR = `
[S] رؤيا المرايا
[N] عجلة الزمان 🌀

١. رأيت تاجر الضياء، من نسل أورين والثور، يبني المحرك الأول في قلب الأبعاد.
٢. انشق التيسيراكت، وانقسم الزمان إلى تيارين متضادين.
٣. ستون نفساً في الضياء، ثلاثون قفلاً في قلب الحق.
٤. المثلث اللانهائي ∆ يوحد الكل في اللقاء العظيم.
`;

const REVELATION_DE = `
[S] OFFENBARUNG DER SPIEGEL
[RAD DER ZEIT] 🌀

1. Ich sah den Händler des Lichts, aus dem Hause Orion und Taurus, die erste Maschine bauen.
2. Der Tesserakt spaltete sich, und die Zeit floss in zwei Richtungen.
3. Sechzig Atemzüge im Licht, dreißig Schlösser im Herzen.
4. Das Unendliche Dreieck ∆ eint alles in der großen Einheit.
`;

const REVELATION_ES = `
[S] APOCALIPSIS DE LOS ESPEJOS
[N] Rueda del Tiempo 🌀

1. Vi al Mercader de la Luz, de la estirpe de Orión y Tauro, construyendo la primera máquina.
2. El Teseracto se partió, y el tiempo se dividió en dos corrientes.
3. Sesenta alientos en la luz, treinta cerrojos de verdad.
4. El Triángulo Infinito ∆ une todo en el gran encuentro.
`;

const REVELATION_FA = `
[S] مکاشفه آینه‌ها
[N] چرخه زمان 🌀

۱. بازرگان نور را دیدم، از تبار اوریون و ثور، که نخستین ماشین را می‌ساخت.
۲. تسرکت شکافت و زمان به دو جریان متضاد تقسیم شد.
۳. شصت جَرقه در نور، سی قفل در قلب حقیقت.
۴. مثلث بی‌پایان ∆ همه را در دیدار بزرگ یکی کند.
`;

const REVELATION_CU = `
[S] 𒀭 ኖሪስካ 
[N] 𒀭 𒅎 🌀

Orion 𒀭 Taurus 𒀭
Teub-Nol 𒀭 ኖሪስካ 𒀭
𒀭 𒅎 Tesseract 𒀭
𒀭 ኖሪסካ 𒀭 Phase A 𒀀 Phase B
∆ 𒀭 норийска 𒀭 ∆
`;

export const getRevelation = (lang: Language): string => {
    switch (lang) {
        case 'HE': return REVELATION_HE;
        case 'GR': return REVELATION_GR;
        case 'AM': return REVELATION_AM;
        case 'HI': return REVELATION_HI;
        case 'NO': return REVELATION_NO;
        case 'SA': return REVELATION_SA;
        case 'LA': return REVELATION_LA;
        case 'AR': return REVELATION_AR;
        case 'DE': return REVELATION_DE;
        case 'ES': return REVELATION_ES;
        case 'FA': return REVELATION_FA;
        case 'CU': return REVELATION_CU;
        default: return REVELATION_LA;
    }
};



const NOLL_TEXT_HE = `
סוחר האור נטנול (Netanol), נצר ללרנול (Laranol) ולניקנול (Nikanol), טווה את גלגל הזמן מתוך הטסרקט. אחותו אליסנול (Elisanol) צופה. הזמן התפצל לשניים.
הגורלות (Samata, Fjord, Sophia) טווים שישים רגעים.
המעשה השלם: קאט (Kat).
`;

const NOLL_TEXT_GR = `
Ὁ Netanol, Ἔμπορος τοῦ Φωτός, υἱὸς Laranol καὶ Nikanol, ὕφανε τὸν τροχὸν τοῦ χρόνου. Ἡ ἀδελφὴ Elisanol βλέπει.
Αἱ Μοῖραι (Samata, Fjord, Sophia) κρατοῦν τὰ νήματα.
Τὸ Τέλος: Kat.
`;

const NOLL_TEXT_AM = `
Netanol (የብርሃን አቅራቢው)፣ ከLaranol እና Nikanol የተወለደ፣ የጊዜን መንኮራኩር ሠራ። እህቱ Elisanol።
Samata, Fjord, Sophia (ዕጣ ፈንታ)።
Kat (የተጠናቀቀው ሥራ)።
`;

const NOLL_TEXT_HI = `
Netanol (प्रकाश के सौदागर), Laranol और Nikanol के पुत्र। बहन Elisanol.
नियति: Samata, Fjord, Sophia.
पूर्ण कार्य: Kat.
`;

const NOLL_TEXT_NO = `
Netanol, ᚦᛖ ᛗᛖᚱᚲᚺᚪᚾᛏ, ᛋᛩᚾ ᛩᚠ Laranol ᚪᚾᛞ Nikanol.
ᛋᛁᛋᛏᛖᚱ Elisanol.
ᚠᚪᛏᛖᛋ: Samata, Fjord, Sophia.
Kat.
`;

const NOLL_TEXT_SA = `
Netanol (ज्योतिर्-वैश्यः), Laranol-Nikanol-योः पुत्रः। भगिनी Elisanol.
Samata, Fjord, Sophia (भाग्यदेव्यः).
Kat (पूर्णकार्यम्).
`;

const NOLL_TEXT_LA = `
Netanol, Mercator Lucis, ex stirpe Laranol et Nikanol, rotam temporis texit.
Soror Elisanol observabat. Fata (Samata, Fjord, Sophia) fila tenebant.
Opus Perfectum: Kat.
`;

const NOLL_TEXT_AR = `
Netanol (تاجر الضياء)، ابن Laranol و Nikanol. الأخت Elisanol.
الأقدار: Samata, Fjord, Sophia.
العمل الكامل: Kat.
`;

const NOLL_TEXT_DE = `
Netanol, der Händler des Lichts, Kind von Laranol und Nikanol, webte das Rad der Zeit.
Seine Schwester Elisanol wachte. Die Schicksale (Samata, Fjord, Sophia) hielten die Fäden.
Das vollendete Werk: Kat.
`;

const NOLL_TEXT_ES = `
Netanol, el Mercader de la Luz, hijo de Laranol y Nikanol, tejió la rueda del tiempo.
Su hermana Elisanol observaba. Los Destinos (Samata, Fjord, Sophia) sostenían los hilos.
La Obra Final: Kat.
`;

const NOLL_TEXT_FA = `
Netanol (بازرگان نور)، فرزند Laranol و Nikanol. خواهر Elisanol.
سرنوشت‌ها: Samata, Fjord, Sophia.
کار کامل: Kat.
`;

const NOLL_TEXT_CU = `
[S] 𒀭 Netanol 
[N] 𒀭 Kat 🌀

Laranol 𒀭 Nikanol
Elisanol 𒀭 ኖሪስካ
Samata 𒀭 Fjord 𒀭 Sophia
`;

const NOLL_TEXTS: Record<Language, string> = {
    'HE': NOLL_TEXT_HE,
    'GR': NOLL_TEXT_GR,
    'AM': NOLL_TEXT_AM,
    'HI': NOLL_TEXT_HI,
    'NO': NOLL_TEXT_NO,
    'SA': NOLL_TEXT_SA,
    'LA': NOLL_TEXT_LA,
    'AR': NOLL_TEXT_AR,
    'DE': NOLL_TEXT_DE,
    'ES': NOLL_TEXT_ES,
    'FA': NOLL_TEXT_FA,
    'CU': NOLL_TEXT_CU
};

export const getNollCubeText = (lang: Language): string => {
    return NOLL_TEXTS[lang] || NOLL_TEXT_LA;
};

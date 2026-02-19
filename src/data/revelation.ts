import { Language } from './translations';

const REVELATION_HE = `
[S] חזון המרכבה
[N] מרכבת האש 🌀

א. נטנול (Netanol) נאבק בשור ונטע את זרעו בגורלות (Samata, Sophia, Fjord).
ב. הזרע הפך לארבע קוביות אור: 1, 8, 27, 64 (Metatron's Cube).
ג. אליסנול (Elisanol) מדדה: 24 עמודי שמיים (אורך) ו-12 טבעות אופק (רוחב).
ד. הטסרקט נפתח, העקמומיות חיובית. המרכבה שלמה.
`;

const REVELATION_GR = `
[S] ΟΡΑΜΑ ΤΟΥ ΜΕΡΚΑΜΠΑ
[N] ΑΡΜΑ ΠΥΡΟΣ 🌀

1. Ὁ Νετανόλ (Netanol) ἔσπειρε τὸν σπόρον εἰς τὰς Μοίρας (Samata, Sophia, Fjord).
2. Ὁ σπόρος ἐγένετο 4 Κύβοι Φωτός: 1, 8, 27, 64.
3. Η Ελισανόλ (Elisanol) εἶδε 24 Στύλους (Κάθετους) καὶ 12 Δακτυλίους (Οριζόντιους).
4. Τὸ Ἅρμα (Merkaba) περιστρέφεται ἐν θετικῇ καμπυλότητι.
`;

const REVELATION_AM = `
[S] የመርካባ ራእይ
[N] የእሳት ሠረገላ 🌀

፩. ነታኖል (Netanol) ዘሩን በዕጣ ፈንታዎች (Samata, Sophia, Fjord) ውስጥ ተከለ።
፪. ዘሩ 4 የብርሃን ኪዩቦች ሆነ፡ 1, 8, 27, 64።
፫. ኤሊሳኖል (Elisanol) 24 የሰማይ ምሰሶዎችን እና 12 የአድማስ ቀለበቶችን ለካች።
፬. መርካባ (Merkaba) ይሽከረከራል፣ ኩርባው አዎንታዊ ነው።
`;

const REVELATION_HI = `
[S] मर्कबा का दर्शन
[N] अग्नि रथ 🌀

1. नेतानोल (Netanol) ने अपना बीज भाग्य (Samata, Sophia, Fjord) में बोया।
2. बीज 4 प्रकाश घन (Cubes) बन गया: 1, 8, 27, 64.
3. एलिझानोल (Elisanol) ने 24 ऊर्ध्वाधर स्तंभों और 12 क्षैतिज वलयों को देखा।
4. मर्कबा (Merkaba) घूमता है, वक्रता सकारात्मक है।
`;

const REVELATION_NO = `
[S] ᚦᛖ ᚢᛁᛋᛁᛩᚾ ᛩᚠ ᛗᛖᚱᚲᚪᛒᚪ
[N] ᚲᚺᚪᚱᛁᛩᛏ ᛩᚠ ᚠᛁᚱᛖ 🌀

1. ᚾᛖᛏᚪᚾᛩᛚ (Netanol) ᛈᛚᚪᚾᛏᛖᛞ ᛋᛖᛖᛞ ᛁᚾ ᚠᚪᛏᛖᛋ (Samata, Sophia, Fjord).
2. ᛋᛖᛖᛞ ᛒᛖᚲᚪᛗᛖ 4 ᚲᚢᛒᛖᛋ: 1, 8, 27, 64.
3. ᛖᛚᛁᛋᚪᚾᛩᛚ (Elisanol) ᛗᚪᚱᚲᛖᛞ 24 ᛈᛁᛚᛚᚪᚱᛋ ᚪᚾᛞ 12 ᚱᛁᚾᚷᛋ.
4. ᛗᛖᚱᚲᚪᛒᚪ ᛋᛈᛁᚾᛋ ᛁᚾ ᛏᚱᚢᛏᚺ.
`;

const REVELATION_SA = `
[S] मर्कबा-दर्शनम्
[N] अग्निरथः (Merkaba) 🌀

१. नेतानोलः (Netanol) भाग्यदेवीषु (Samata, Sophia, Fjord) बीजम् अवपत्।
२. बीजं चत्वारि घनानि (4 Cubes) अभवत्: १ (1), ८ (8), २७ (27), ६४ (64)।
३. एलिझानोला (Elisanol) चतुर्विंशति (24) स्तम्भान् द्वादश (12) वलयान् च अपश्यत्।
४. मर्कबा (Merkaba) भ्रमति, सत्यम् एकम्।
`;

const REVELATION_LA = `
[S] VISIO MERKABAE
[N] CURRUS IGNIS 🌀

1. Netanol semen suum in Fatis (Samata, Sophia, Fjord) plantavit.
2. Semen factum est 4 Cubi Lucis: 1, 8, 27, 64.
3. Elisanol vidit 24 Columnas Verticales et 12 Circulos Horizontales.
4. Currus (Merkaba) rotat in veritate.
`;

const REVELATION_AR = `
[S] رؤية الميركابا
[N] عربة النار 🌀

١. زرع نتانول (Netanol) بذرته في الأقدار (Samata, Sophia, Fjord).
٢. أصبحت البذرة ٤ مكعبات من النور: ١، ٨، ٢٧، ٦٤.
٣. رأت إليسانول (Elisanol) ٢٤ عموداً (طول) و ١٢ حلقة (عرض).
٤. المركابا (Merkaba) تدور في الحق.
`;

const REVELATION_DE = `
[S] VISION DES MERKABA
[N] FEUERWAGEN 🌀

1. Netanol pflanzte seinen Samen in die Schicksale (Samata, Sophia, Fjord).
2. Der Samen wurde zu 4 Lichtwürfeln: 1, 8, 27, 64.
3. Elisanol sah 24 vertikale Säulen und 12 horizontale Ringe.
4. Der Merkaba rotiert in Wahrheit.
`;

const REVELATION_ES = `
[S] VISIÓN DEL MERKABÁ
[N] CARRO DE FUEGO 🌀

1. Netanol plantó su semilla en los Destinos (Samata, Sophia, Fjord).
2. La semilla se convirtió en 4 Cubos de Luz: 1, 8, 27, 64.
3. Elisanol observó las 24 Columnas Verticales y los 12 Anillos Horizontales.
4. El Merkaba gira en la verdad.
`;

const REVELATION_FA = `
[S] رویا مرکابا
[N] ارابه آتش 🌀

۱. نتانول (Netanol) بذر خود را در سرنوشت‌ها (Samata, Sophia, Fjord) کاشت.
۲. بذر به ۴ مکعب نور تبدیل شد: ۱، ۸، ۲۷، ۶۴.
۳. الیسانول (Elisanol) ۲۴ ستون و ۱۲ حلقه را دید.
۴. مرکابا (Merkaba) در حقیقت می‌چرخد.
`;

const REVELATION_CU = `
[S] 𒀭 MERKABA 
[N] 𒀭 GIBIL 🌀

117: Netanol 𒀭 Seed 𒀭 Fates
118: 1 𒀭 8 𒀭 27 𒀭 64
119: 24 𒀭 Pillars 12 𒀭 Rings
120: Elisanol 𒀭 Watcher
121: ∆ MERKABA 𒀭 SPINS ∆
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

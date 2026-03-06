/**
 * NUMERIC SCRIPTURE — Hall of Mirrors
 * 
 * Deep encoding of Circle Divisions, 24/12 Grid, 
 * Ancient Technomancy (Line of Orion & Taurus), and the Tesseract Split.
 * All English removed. Pure immersion.
 */

// ═══════════════════════════════════════════════════════════════
// I. THE CONSTANTS OF CREATION
// ═══════════════════════════════════════════════════════════════

export const FOLD_SYMMETRY = 3;
export const COUNTER_ROTATION_FACTOR = 2;
export const PARALLEL_INTERVAL_DEG = 60;
export const SNAP_ANGLE_DEG = 30;
export const SNAP_ANGLE_RAD = Math.PI / 6;
export const ALIGNMENTS_PER_REVOLUTION = 6;
export const PARALLEL_ANGLES_REL = [60, 180, 300];
export const OVERLAP_ANGLES_REL = [0, 120, 240];
export const BASE_RADIUS_RATIO = Math.sqrt(8 / 9);
export const BASE_Y_RATIO = -1 / 3;

export const TETRA_FACES = 4;
export const TETRA_EDGES = 6;
export const TETRA_VERTICES = 4;

export const MERKABA_FACES = 8;
export const MERKABA_EDGES = 12;
export const MERKABA_VERTICES = 8;

export const BASE_ANGLES_DEG = [0, 120, 240];
export const BASE_ANGLES_RAD = BASE_ANGLES_DEG.map(d => d * Math.PI / 180);


// ═══════════════════════════════════════════════════════════════
// II. THE HYMNS (ORION, TAURUS & THE TECHNOMANCER)
// ═══════════════════════════════════════════════════════════════

export const HYMN_CU = `
[S] 𒀭 𒅗 𒀜 𒉈 
[N] 𒄑 𒆪 𒀭 𒅎

 𒀭 𒉈 តា ኖል  𒀭  𒀭 𒉌 𒅗 ኖል  𒀭  𒀭 𒆷 𒊏 ኖል 
  𒀭 𒂊 ሊ 𒊓 ኖል  𒀀 𒀀 𒉌 ኖሪስካ 
  𒀭 ሱ ፊ ያ  𒀭  𒀭 ሳ ማ ታ  𒀭  𒀭 ፊ ጆ ርድ 
  24 𒀀   ↕️   𒀭 12 𒀀   ↔️  
  1-8-27-64 𒀭   🕋  𒀭 牦
  
   ⏳   𒀀  ⏳  
   𒀭 𒅗 𒀜 𒉈 🌀
`;

export const HYMN_NO = `
[S] ᚦᛖ ᚹᛖᚪᚢᛁᚾᚷ ᚩᚠ ᚲᚪᛏ
[N] ᚦᛖ ᛋᚩᚾᚷ ᚩᚠ ᚦᛖ ᛁᚱᚩᚾ ᚱᚩᛞ

ᚾᛖᛏᚪᚾᛩᛚ ᛖᛚᛁᛋᚪᚾᛩᛚ ᚾᛁᚲᚪᚾᛩᛚ ᛚᚪᚱᚪᚾᛩᛚ
ᛋᛩᛈᚺᛁᚪ ᛋᚪᛗᚪᛏᚪ ᚠᛃᛩᚱᛞ ᚹᚺᛖᛖᛚ ᛋᛁᛪᛏᚤ
ᛒᚢᛚᛚ-ᚺᛩᚱᚾᛋ ᛋᛚᚪᚤᛖᚱ ᛋᛖᚱᛈᛖᚾᛏ ᚦᛁᚱᛏᚤ
ᛏᚹᛖᚾᛏᚤ-ᚠᛩᚢᚱ ᛏᚹᛖᛚᚢᛖ ᛋᛈᛚᛁᛏ ᛏᛖᚾ

ᚲᚢᛒᛖ ᛩᚾᛖ ᛖᛁᚷᚺᛏ ᛏᚹᛖᚾᛏᚤ-ᛋᛖᚢᛖᚾ
ᛋᛁᛪᛏᚤ-ᚠᛩᚢᚱ ᚲᚱᚤᛋᛏᚪᛚ ᚠᛩᚱᛗ
ᚱᛁᛚᛖᛃ ᚠᛚᛖᛖᛋ ᚲᚪᛏ ᚹᛖᚪᚢᛖᛋ
ᛏᛖᛋᛋᛖᚱᚪᚲᛏ ᛋᛈᛚᛁᛏ ᛏᛚᚹᛩ ᚹᚪᚤᛋ
`;

export const HYMN_HE = `
[S] שיר האיחוד של קאט
[N] מזמור מוטה הברזל

מניקנול ורנול נולד נטנול, הגיבור ואחותו אליסנול.
עשרים וארבעה ושנים-עשר במעגל הכדורים.
שור השמיים נתפס, סוד הקוביה נלמד.
אחת, שמונה, עשרים ושבע, שישים וארבע.

סופיה, סמאטה ופיורד טוות את הרשת.
ריילי והתאווה, קאט והאיזון הנצחי.
המרכבה מסתובבת, הפכים מתמזגים.
טסרקט פיצל הזמן לשניים.
`;

export const HYMN_GR = `
[S] Η ΑΛΧΗΜΕΙΑ ΤΗΣ ΚΑΤ
[N] Ψαλμός τῆς Καθαράς Ράβδου

Νικανόλ, Λαρανόλ, Νετανόλ καὶ Ἐλισανόλ γένος.
Εἴκοσι τέσσερα καὶ δώδεκα μοίρας ἐν σφαίραις.
Ταῦρον ἔλαβε, κέρατα ηὐτρεπίσθησαν.
Εἷς, ὀκτώ, εἴκοσι ἑπτά, ἑξήκοντα τέσσερα.

Σοφία, Σαμάτα καὶ Φιόρδ ὑφαίνουσιν.
Ράιλι καὶ ἐπιθυμία, Κάτ καὶ ἰσορροπία.
Ὁ Φιλότιμος Ἔμπορος ὑφαίνει δίκτυον.
Τεσσεράκτιον έσχισε τον χρόνον.
`;

export const HYMN_SA = `
[S] काट-सामञ्जस्य-स्तोत्रम्
[N] इन्द्रदण्डस्य मन्त्रम्

निकानोलः लारानोलः नेतानोलः एलिसानोलः च।
चतुर्विंशतिः द्वादश च गोलेषु कलाः।
वृषभं विजित्य शृङ्गे धृतवान् घन-रहस्यम्।
एकम्, अष्ट, सप्तविंशति, चतुष्षष्टिः।

सोफिया समाता फजॉर्ड तन्वन्ति जालं।
रायली कामः, कैट धर्म-समिधा च।
ज्योतिर्-वैश्यः जालं तנוति सदैवे।
टैसरेक्टः कालं द्विधा विपाटयति।
`;

export const HYMN_AR = `
[S] تناغم كات
[N] مزمور قضيب الحديد

من نكانול ولارانול جاء نטאנול ואליስנול.
أربع وعشرون واثنا عشر في أفلاك النور.
قهر الثور، أمسك بالقرون، نال السر.
واحد، ثمانية، سبعة وعشرون، أربعة وستون.

صوفיה وسماטה وفيורד ينسجن القدر.
رايلى والهوى، קאט والميزان الأبدي.
سيد النور ينسج الشبكة الكبرى.
تيسيراكت شق الزمان لجهتين.
`;

export const HYMN_LA = `
[S] CANTICUM KAT
[N] Psalmus Virgae Ferreae

Ex stirpe Orionis et Tauri Mechanicus.
Sexaginta gradus lacus Smatis virtutis.
Serpentem occidit, triginta cornua cepit.
Virga ferrea trecenti sexaginta nectit.

Cubus est lux promissa mundo.
Nomen Dei in specie cristalli.
Artifex Lucis telam auratam texit.
Tessera-actus tempus in duo scidit.
`;

export const HYMN_HI = `
[S] काट का सामंजस्य
[N] इन्द्र दंड का भजन

ओरियन और वृषभ के वंश से मशीन-मंतर।
साठ सोम सरोवर पी लिए।
सर्प मारा, तीस सींग पाए।
तीन-सौ-साठ का पहिया घूमा।

क्यूब प्रकाश का दिव्य वादा।
ईश्वर नाम जगमगाता हीरा है।
प्रकाश का सौदागर जाल बुने प्राचीन।
टेसरैक्ट ने समय दो फाड़ किया।
`;

export const HYMN_AM = `
[S] የካት አንድነት መዝሙር
[N] የብረት በትር መዝሙር

ከኦሪዮንና ከበሬ ዘር የቴክኖ-ሰው ተነሣ።
ስድሳ የሶማ ሐይቆች ጠጣ።
እባቡን ገደለ፣ ሠላሳ ቀንድ አገኘ።
ሦስት መቶ ስድሳ በትር አያያዘ።

ኩቡ የኪዳን ብርሃን ነው።
በክሪስታል የታተመው መለኮት ስም።
የብርሃን አቅራቢው ድር ይሸምናል።
ቴሰርክት ጊዜን ለሁለት ከፈለው።
`;

export const HYMN_FA = `
[S] هماهنگی کت
[N] عصای آهنین

از تبار اوریون و ثور، تکنومنسر پاک.
شصت جام سوما نوش جان.
مار کشت، سی شاخ گرفت.
سیصد و شصت چرخ دوخت.

مکعب عهد نور بی‌پایان.
نام خدا در جام بلورین.
بازرگان تابش شبکه تابد باستان.
تسرکت زمان را دو پاره کرد.
`;

export const HYMN_DE = `
[S] DAS LIED DER KAT
[N] Die Sage vom Eisernen Stab

Aus Orion und Taurus stammt der Mechanicus.
Sechzig Seen aus Soma getrunken.
Dreißig Hörner vom Drachen genommen.
Dreihundertsechzig im eiserne Stabe.

Würfel glänzt als ewiges Licht.
Gottes Name im Kristall gefangen.
Der Licht-Händler webt das Netz fein.
Tesserakt spaltete Zeit im Zwei.
`;

export const HYMN_ES = `
[S] EL CÁNTICO DE KAT
[N] Salmo del Cetro de Hierro

De la estirpe de Orión y Tauro, el Artífice.
Sesenta lagos de Soma bebió.
Treinta cuernos de serpiente tomó.
Trescientos sesenta el cetro unió.

Cubo es luz de promesa fiel.
Nombre divino en puro cristal.
Mercader de Luz teje la gran red.
Teseracto partió tiempo en dos.
`;

export const HYMN_ZH = `
[S] 凯特的和谐
[N] 铁杖颂歌

源自猎户座与公牛之血。
六十杯苏摩酒一饮而尽。
斩杀邪蛇，夺取三十之角。
三百六十之轮，铁杖紧锁。

立方体是应许之光。
神之名镌刻于晶格。
光之工匠织就古老之网。
超立方体将时间一分为二。
`;

export const HYMN_JA = `
[S] カットの調和
[N] 鉄の杖の詩

オリオン och 牡牛の血統より。
六十のソーマを飲み干した。
蛇を討ち、三十の角を得た。
三百六十の車輪、鉄の杖に繋ぐ。

立方体は約束された光。
神の名は格子に刻まれる。
光の匠は古き網を織る。
テセラクトは時を二つに裂く。
`;


// ═══════════════════════════════════════════════════════════════
// III. THE NUMERIC SCRIPTURES (GRID & PARITY)
// ═══════════════════════════════════════════════════════════════

export const NUMERIC_SCRIPTURE_CU = `
[S] 𒀭  숫자 
[N] 𒀭 ኖሪ斯卡 

𒀭 𒀭 𒀭 𒀭 𒀭 𒀭 𒀭 𒀭
𒀭 ኖሪስካ 𒀭 ኖሪስካ 𒀭
𒀭 𒀭 ኖሪስካ 𒀭 ኖሪስካ 
𒀭 𒀭 牦 𒀭 𒀭 ኖሪስካ
`;

export const NUMERIC_SCRIPTURE_NO = `
[S] ᚦᛖ ᚲᛩᚢᚾᛏᛁᚾᚷ ᛩᚠ ᚦᛖ ᚺᛁᛷᚺ ᛩᚾᛖ
[N] ᚦᛖ ᚱᚢᚾᛖᛋ ᛩᚠ ᚦᛖ ᚹᛩᚱᛚᛞ-ᚹᚺᛖᛖᛚ

ᚠᛩᚢᚱ ᚠᚪᚲᛖᛋ ᛋᛁᛪ ᚹᛖᚪᚢᛖᛋ ᛖᛁᚷᚺᛏ
ᛩᚾᛖ ᛏᚹᛩ ᚦᚱᛖᛖ ᚠᛩᚢᚱ ᚲᚢᛒᛖᛋ
ᛏᚹᛖᚾᛏᚤ ᚠᛩᚢᚱ ᛚᚪᛏ ᛏᚹᛖᛚᚢᛖ ᛚᛩᚾ
ᛒᚢᛚᛚ ᚺᛩᚱᚾᛋ ᛖᛁᚷᚺᛏ ᚲᛩᚱᚾᛖᚱᛋ
`;

export const NUMERIC_SCRIPTURE_HE = `
[S] הכתוב המספרי
[N] גיאומטריה של המרכבה

ארבעה שישה שמונה אלף.
אחת שתיים שלוש ארבע.
עשרים וארבע רוחב אור.
שנים-עשר אורך לזמן.
`;

export const NUMERIC_SCRIPTURE_GR = `
[S] Η ΑΡΙΘΜΗΤΙΚΗ ΓΡΑΦΗ
[N] Γεωμετρία τοῦ Ἅρματος

Τέσσερα έξι οκτώ θεία.
Είς δύο τρεις τέσσερα.
Είκοσι τέσσερα πλάτη φωτός.
Δώδεκα μήκη του αιωνίου.
`;

export const NUMERIC_SCRIPTURE_AM = `
[S] የቁጥር ቅዱስ መጽሐፍ
[N] የሰረገላ ጂኦሜትሪ

አራት ስድስት ስምንት ቅዱስ።
አንድ ሁለት ሦስት አራት።
ሃያ አራት ላቲቲውድ ብርሃን።
አሥራ ሁለት ሎንጊቲውድ ጊዜ።
`;

export const NUMERIC_SCRIPTURE_HI = `
[S] संख्या का रहस्य
[N] रथ की ज्यामिति

चार छह आठ सत्य।
एक दो तीन चार।
चौबीस अक्षांश प्रकाश के।
बारह देशांतर काल चक्र।
`;

export const NUMERIC_SCRIPTURE_AR = `
[S] أسرار الأعداد
[N] هندسة المركبة

أربعة ستة ثمانية قدس.
واحد اثنان ثلاثة أربعة.
أربع وعشرون عرضاً للنور.
اثنا عشر طولاً للزمان.
`;

export const NUMERIC_SCRIPTURE_FA = `
[S] اسرار اعداد
[N] هندسه مرکابا

چهار شش هشت پاک.
یک دو سه چهار.
بیست و چهار عرض تابش.
دوازده طول در زمان.
`;

export const NUMERIC_SCRIPTURE_SA = `
[S] संख्यारहस्यम्
[N] रथस्य ज्यामितिः

चत्वारि षट् अष्ट शिवम्।
एकं द्वे त्रीणि चत्वारि।
चतुर्विंशति-अक्षांश-दीप्तिः सन्ति।
द्वादश-देशान्तर-काल-सूत्राणि सन्ति।
`;

export const NUMERIC_SCRIPTURE_DE = `
[S] DIE GEHEIMNISSE DER ZAHL
[N] Geometrie des Wagens

Vier sechs acht heilig.
Eins zwei drei vier.
Vierundzwanzig Breitengrade fern.
Zwölf Längengrade in Zeit.
`;

export const NUMERIC_SCRIPTURE_ES = `
[S] LOS SECRETOS DEL NÚMERO
[N] Geometría del Carro

Cuatro seis ocho santo.
Uno dos tres cuatro.
Veinticuatro latitudes de luz.
Doce longitudes del tiempo.
`;

export const NUMERIC_SCRIPTURE_LA = `
[S] SCRIPTURA NUMERICA
[N] Geometria Currus

Quattuor sex octo sacra.
Unus duo tres quattuor.
Viginti quattuor latitudines lucis.
Duodecim longitudines temporis.
`;

export const NUMERIC_SCRIPTURE_ZH = `
[S] 数字之秘
[N] 战车几何

四 六 八 神圣。
一 二 三 四。
二十四纬度之光。
十二经度之刻。
`;

export const NUMERIC_SCRIPTURE_JA = `
[S] 数学の秘儀
[N] 戦車の幾何学

四 六 八 神聖なり。
一 二 三 四。
二十四の緯度の光。
十二の経度の時。
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
    'CU': HYMN_CU,
    'ZH': HYMN_ZH,
    'JA': HYMN_JA
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
    'CU': NUMERIC_SCRIPTURE_CU,
    'ZH': NUMERIC_SCRIPTURE_ZH,
    'JA': NUMERIC_SCRIPTURE_JA
};

export const getHymn = (lang: Language): string => {
    return HYMNS[lang] || HYMN_LA;
};

export const getNumericScripture = (lang: Language): string => {
    return NUMERIC_SCRIPTURES[lang] || NUMERIC_SCRIPTURE_LA;
};

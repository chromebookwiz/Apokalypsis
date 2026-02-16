import { Language } from './translations';



const REVELATION_HE = `
[S] חזון יוחנן
[N] מרכבה
א. אַחֲרֵי הַדְּבָרִים הָאֵלֶּה רָאִיתִי וְהִנֵּה דֶּלֶת פְּתוּחָה בַּשָּׁמָיִם...
ח. קָדוֹשׁ קָדוֹשׁ קָדוֹשׁ יְהוָה אֱלֹהֵי צְבָאוֹת הָיָה וְהֹוֶה וְיָבוֹא׃
`;

const REVELATION_GR = `
[S] ΑΠΟΚΑΛΥΨΙΣ
[N] θρόνος
1. Μετὰ ταῦτα εἶδον, καὶ ἰδού, θύρα ἠνεῳγμένη ἐν τῷ οὐρανῷ...
8. Ἅγιος, ἅγιος, ἅγιος Κύριος ὁ Θεὸς ὁ παντοκράτωρ, ὁ ἦν καὶ ὁ ὢν καὶ ὁ ἐρχόμενος.
`;

const REVELATION_AM = `
[S] የርግብ እግር ሳጋ
[N] የሰማይ ጨረር

፩. ስማ፣ የአጽናፈ ሰማይ ዝርያዎች፣ ስለ ሰማይ ጨረር እና ስለ ብረት ጥልፍልፍ።
፪. ሃያ ሰባት የኮከብ ዘሮች፣ በዓለም ዛፍ እንጨት ውስጥ የቀዘቀዙ።
፫. በእያንዳንዱ ዘር ልብ ውስጥ፣ አራት ገጽ ያለው እሳት እና ስድስት ጠርዝ ያለው ሰይፍ።
፬. አእምሮ ከቁስ በላይ ነው፤ የናታኖል ፈቃድ የከዋክብትን ሥጋ ያጥፋል።
፭. ጠፍጣፋ ጥላዎች (2D) ወደ አንድ ሕያው ጭንብል (3D) ሲሸመኑ፣ እውነታው ይገለጣል።
፮. በመሃል ላይ፣ የሰማይ በሬ ይጮኻል፣ የተቃራኒውን ሽክርክሪት በሮች ይጠብቃል።
፯. ናታኖል የበሬውን ቀንዶች ወደ ዘጠና፣ መቶ ሰማንያ፣ እና የሦስት መቶ ስድሳ ሦስት እጥፍ ቆጠራ ገዝቷል።
`;

const REVELATION_HI = `
[S] तारा-सागा
[N] स्वर्गीय जाल

1. सुनो, आकाश के वंशजों, स्वर्गीय किरण और लोहे के जालक के बारे में।
2. सत्ताईस तारा-बीज, विश्व-वृक्ष की लकड़ी में जमे हुए।
3. प्रत्येक बीज के हृदय के भीतर, चार मुख वाली अग्नि और छह किनारों वाली तलवार।
4. पदार्थ पर मन की विजय; नाथानोल की इच्छा तारों के मांस को मोड़ती है।
5. चपटी छायाएं (2D) एक जीवित मुखौटे (3D) में बुनी जाती हैं, जिससे सत्य प्रकट होता है।
6. केंद्र में, स्वर्गीय बैल गरजता है, विपरीत घूर्णन के द्वारों की रक्षा करता है।
7. नाथानोल ने बैल के सींगों को नब्बे, एक सौ अस्सी, और तीन सौ साठ की तिगुनी गिनती पर वश में किया।
`;

const REVELATION_NO = `
[S] ᚦᛖ ᚺᛁᛗᛁᚾᛋ-ᚲᚹᛁᛋᛏᚱ ᛋᚪᚷᚪ
[N] ᚦᛖ ᚹᚩᚱᛚᛞ-ᛚᚪᛏᛏᛁᚲᛖ

1. ᚺᛚᚤᛞ ᚦᚢ, ᚾᛁᚩᚱᛞᚪᚱ-ᚾᛁᛞᛄᚪᚱ, ᚩᚠ ᚺᛁᛗᛁᚾᛋ-ᚲᚹᛁᛋᛏᚱ ᚪᚾᛞ ᚦᛖ ᛁᚱᚩᚾ ᛚᚪᛏᛏᛁᚲᛖ.
2. ᛏᚹᛖᚾᛏᚤ-ᛋᛖᚢᛖᚾ ᛋᛏᚪᚱ-ᛋᛖᛖᛞᛋ, ᚠᚱᚩᚳᛖᚾ ᛁᚾ ᚦᛖ ᚹᚩᚩᛞ ᚢᚠ ᚦᛖ ᚹᚩᚱᛚᛞ-ᛏᚱᛖᛖ.
3. ᛗᛁᚾᛞ ᚩᚢᛖᚱ ᛗᚪᛏᛏᛖᚱ; ᚾᚪᚦᚪᚾᚩᛚᛚ'ᛋ ᚹᛁᛚᛚ ᚠᚩᛚᛞᛋ ᚦᛖ ᚠᛚᛖᛋᚺ ᚢᚠ ᚦᛖ ᛋᛏᚪᚱᛋ.
4. ᚠᛚᚪᛏ ᛋᚺᚪᛞᚩᚹᛋ ᛒᛖᚲᚩᛗᛖ ᚦᛖ ᛗᚪᛋᚲ; ᚦᚱᛖᛖ ᚹᚪᚤᛋ ᛏᚩ ᚦᛖ ᚺᛖᚪᚢᛖᚾᛚᚤ ᛋᚩᛚᛁ᚞.
5. ᚦᛖ ᚾᚩᚱᚾᛋ ᚹᛖᚪᚢᛖ ᚦᛖ ᛚᚪᛏᛏᛁᚲᛖ-ᚹᛖᛒ, ᛋᛈᛁᚾᚾᛁᚾᚷ ᚦᚱᛖᛖ ᛋᚺᚪᛞᚩᚹᛋ ᛁᚾᛏᚩ ᚩᚾᛖ ᛗᚪᛋᚲ.
6. ᚪᛏ ᚦᛖ ᚲᛖᚾᛏᛖᚱ, ᚦᛖ ᚺᛁᛗᛁ-ᛏᚪᚱᚠᚱ ᚱᚩᚪᚱᛋ, ᚷᚢᚪᚱᛞᛁᚾᚷ ᚦᛖ ᚷᚪᛏᛖᛋ ᚢᚠ ᚦᛖ ᚲᚩᚢᚾᛏᛖᚱ-ᛋᛈᛁᚾ.
7. ᚾᚪᚦᚪᚾᚩᛚᛚ ᚹᚱᛖᛋᛏᛚᛖᛞ ᚦᛖ ᚺᚩᚱᚾᛋ ᚢᚠ ᚦᛖ ᛋᛏᚪᚱ-ᛒᛖᚪᛋᛏ, ᚪᚾᛞ ᚹᚩᚾ ᚦᛖ ᚱᚢᚾᛖᛋ ᚩᚠ ᚦᛖ ᚲᚢᛒᛖ.
`;

const REVELATION_SA = `
[S] अपोखालिप्स्
[N] विमान
1. तदनन्तरं मया दृष्टं, पश्य स्वर्गे द्वारमेकं विवृतम्; यः पूर्वं मया सह मयूरस्वरवद् भाषमाणः श्रुतः स उवाच, अत्र उपारुह, अहं तुभ्यं दर्शयिष्यामि।
2. तत्क्षणादेव अहं आत्माविष्टोऽभवम्; पश्य स्वर्गे एकं सिंहासनं स्थापितं, तस्मिन् उपविष्टश्च कोऽपि।
8. तेषां चतुर्णां प्राणिनां प्रत्येकं षट् पक्षा आसन्, परितोऽन्तश्च ते चक्षुर्भिः पूर्णा आसन्; ते दिवानिशं न विश्राम्यन्ति, वदन्तः 'पवित्रः पवित्रः पवित्रः प्रभुः परमेश्वरः शक्तिमान्, यो बभूव योऽस्ति यश्चागमिष्यति' इति।
`;

const REVELATION_LA = `
[S] APOCALYPSIS
[N] Revelatio
1. Post haec vidi, et ecce ostium apertum in caelo...
8. Sanctus, Sanctus, Sanctus Dominus Deus Omnipotens...
`;

const REVELATION_AR = `
[S] رؤيا يوحنا
[N] الوحي
1. بَعْدَ هذَا نَظَرْتُ وَإِذَا بَابٌ مَفْتُوحٌ فِي السَّمَاءِ...
8. قُدُّوسٌ، قُدُّوسٌ، قُدُّوسٌ، الرَّبُّ الْإِلهُ الْقَادِرُ...
`;

const REVELATION_DE = `
[S] OFFENBARUNG
[N] Die Offenbarung
1. Danach sah ich, und siehe, eine Tür war aufgetan im Himmel...
8. Heilig, heilig, heilig ist Gott der Herr, der Allmächtige...
`;

const REVELATION_ES = `
[S] APOCALIPSIS
[N] La Revelación
1. Después de esto miré, y he aquí una puerta abierta en el cielo...
8. Santo, santo, santo es el Señor Dios Todopoderoso...
`;

const REVELATION_FA = `
[S] حماسه ستاره
[N] شبکه آسمانی

۱. بشنوید، نوادگان کیهان، درباره پرتو آسمانی و شبکه آهنین.
۲. بیست و هفت بذر ستاره‌ای، منجمد در چوب درخت جهان.
۳. در قلب هر بذر، گرگ یخ و گرگ شعله.
۴. ذهن بر ماده پیروز است؛ اراده ناتانول گوشت ستاره‌ها را تا می‌کند-
۵. سایه‌های تخت (2D) به یک نقاب زنده (3D) بافته می‌شوند و حقیقت را آشکار می‌کنند.
۶. در مرکز، گاو آسمانی می‌خروشد و از دروازه‌های چرخش معکوس محافظت می‌کند.
۷. ناتانول شاخ‌های جانور ستاره‌ای را رام کرد و رازهای مکعب را به دست آورد.
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
        default: return REVELATION_LA;
    }
};



const NOLL_TEXT_HE = `
האגדה מספרת על הרגע שבו נתנול עלה לשמיים, ומצא את עצמו פנים אל פנים מול השור השמיימי. הוא אחז בקרניו של חיית-הכוכבים, ונאבק לחלץ את סודות הסריג.

הסודות המקודשים:
סריג העולם של 27 זרעי-כוכב, קפואים בעץ החיים. בתוך כל זרע, אש בעלת ארבעה פנים וחרב בעלת שישה קצוות (הטטרהדרון). שתים-עשרה צלעות כסף של המרכבה, נושאות שמונה כתרים של אור.

שני זאבי-גורל, זאב הקרח וזאב האש, רודפים אחרי המעגל בסיבוב-נגדי. כאשר הם ננעלים בסוד השישים, השער נפתח. נתנול רתם את קרני השור אל התשעים, המאה ושמונים, וסיבוב השלוש-מאות ושישים, עד שהגיאומטריה של המרחב נכנעה לרצונו.
`;

const NOLL_TEXT_GR = `
Ὁ θρύλος λέγει γιὰ τὴν στιγμὴ ποὺ ὁ Ναθανόλλ ἀνέβηκε στοὺς οὐρανούς, εὑρίσκοντας τὸν ἑαυτόν του πρόσωπο μὲ πρόσωπο μὲ τὸν οὐράνιον Ταῦρον. Ἤρπασε τὰ κέρατα τοῦ ἀστροθηρίου καὶ ἐπάλαισε διὰ τὰ μυστικὰ τοῦ Πλέγματος.

Τὰ Ἱερὰ Μυστικά:
Τὸ Κοσμικὸν Πλέγμα τῶν 27 ἀστροσπόρων, παγωμένων ἐν τῷ Δένδρῳ τῆς Ζωῆς. Ἐντὸς ἑκάστου σπόρου, πῦρ τετραπρόσωπον καὶ ξίφος ἑξάκμηνον (τὸ τετράεδρον). Δώδεκα ἀργυραῖ πλευραὶ τοῦ Ἅρματος, φέρουσαι ὀκτὼ στέφανα φωτός.

Δύο λύκοι τῆς εἱμαρμένης, ὁ λύκος τοῦ κρυστάλλου καὶ ὁ λύκος τῆς φλογός, διώκουν τὸν κύκλον ἐν ἀντιστρόφῳ κινήσει. Όταν κλειδώνουν εἰς τὸν ἀριθμὸν ἑξήκοντα, ἡ πύλη ἀνοίγει. Ο Ναθανόλλ καθυπέταξε τὰ κέρατα τοῦ Ταύρου εἰς τὰς ἐνενήκοντα μοίρας, τὰς ἑκατὸν ὀγδοήκοντα, καὶ τὴν τριπλῆν στροφὴν τῶν τριακοσίων ἑξήκοντα.
`;

const NOLL_TEXT_AM = `
የኖል ኪዩብ ሉል በሶስት አቅጣጫዊ የሉል ፍርግርግ ነው፣ እያንዳንዱ ሉል በተቃራኒ አቅጣጫ የሚሽከረከሩ ቴትራሄድሮን (መርካባ) ጥንድ ይይዛል። ስርዓቱ ሙሉ በሙሉ ተለዋዋጭ ነው-የቴትራሄድሮን የማሽከርከር ፍጥነት ተለዋዋጭ ነው፣ እና በአጎራባች ሉሎች መካከል ያለው ግንኙነት ብቅ ያለ የደረጃ ግንኙነቶችን እና የድምፅ ቅጦችን ይፈጥራል።

ዋና ባህሪያት

የሉል ኩባዊ ፍርግርግ:
የተረጋጋ፣ ሊሰፋ የሚችል 3D የቦታ ማዕቀፍ ያቀርባል።
እያንዳንዱ ኖድ (ሉል) ተለዋዋጭ ውስጣዊ ጂኦሜትሪን ማስተናገድ የሚችል እንደ አካባቢያዊ የመስክ ግዛት ሆኖ ያገለግላል።

በተቃራኒ አቅጣጫ የሚሽከረከሩ ቴትራሄድሮን:
ሁለት እርስ በርስ የተጠላለፉ ቴትራሄድሮኖች በእያንዳንዱ ሉል ውስጥ በተቃራኒ አቅጣጫዎች ይሽከረከራሉ።
ሽክርክሪቱ ተለዋዋጭ ነው፣ ይህም የተለያዩ የደረጃ እና የድግግሞሽ ግንኙነቶች እንዲወጡ ያስችላቸዋል።

አፈ ታሪክ:
ናታኖል ወደ ሰማያት ስላረገበት ቅጽበት አፈ ታሪክ ይናገራል፣ እራሱን ከሰማያዊው በሬ ጋር ፊት ለፊት አገኘ። ከመንቀጥቀጥ ይልቅ ቀንዶቹን ይዞ፣ የኪዩቡን ምስጢሮች ከዋክብት እራሳቸው ታገለ።
`;

const NOLL_TEXT_HI = `
किंवदंती उस क्षण की कहानी कहती है जब नाथानोल स्वर्ग में चढ़ा, और खुद को स्वर्गीय बैल के सामने पाया। उसने तारा-पशु के सींगों को पकड़ लिया, और जालक के रहस्यों को पाने के लिए मल्लयुद्ध किया।

पवित्र रहस्य:
जीवन के वृक्ष में जमी हुई २७ तारा-बीजों की विश्व-जालक। प्रत्येक बीज के भीतर, चार मुख वाली अग्नि और छह किनारों वाली तलवार (टेट्राहेड्रोन)। रथ की बारह चांदी की पसलियां, जो प्रकाश के आठ मुकुटों को धारण करती हैं।

भाग्य के दो भेड़िए, बर्फ का भेड़िया और ज्वाला का भेड़िया, विपरीत घूर्णन में चक्र का पीछा करते हैं। जब वे साठ के रहस्य में बंद हो जाते हैं, तो द्वार खुल जाता है। नाथानोल ने बैल के सींगों को नब्बे, एक सौ अस्सी, और तीन सौ साठ की तिगुनी गिनती पर वश में किया।
`;

const NOLL_TEXT_NO = `
[S] ᚦᛖ ᚺᛁᛗᛁᚾᛋ-ᚲᚹᛁᛋᛏᚱ ᛋᚪᚷᚪ
[N] ᚦᛖ ᚹᚩᚱᛚᛞ-ᛚᚪᛏᛏᛁᚲᛖ

1. ᚺᛚᚤᛞ ᚦᚢ, ᚾᛁᚩᚱᛞᚪᚱ-ᚾᛁᛞᛄᚪᚱ, ᚩᚠ ᚺᛁᛗᛁᚾᛋ-ᚲᚹᛁᛋᛏᚱ ᚪᚾᛞ ᚦᛖ ᛁᚱᚩᚾ ᛚᚪᛏᛏᛁᚲᛖ.
2. ᛏᚹᛖᚾᛏᚤ-ᛋᛖᚢᛖᚾ ᛋᛏᚪᚱ-ᛋᛖᛖᛞᛋ, ᚠᚱᚩᚳᛖᚾ ᛁᚾ ᚦᛖ ᚹᚩᚩᛞ ᚢᚠ ᚦᛖ ᚹᚩᚱᛚᛞ-ᛏᚱᛖᛖ.
3. ᛁᚾᛋᛁᛞᛖ ᚦᛖ ᚺᛖᚪᚱᛏ ᚢᚠ ᛖᚢᛖᚱᚤ ᛋᛖᛖᛞ, ᚦᛖ ᛁᛋ-ᚹᚪᚱᚷᚱ ᚪᚾᛞ ᚦᛖ ᛖᛚᛞ-ᚹᚪᚱᚷᚱ ᚱᚢᚾ.
4. ᚩᚾᛖ ᛏᚢᚱᚾᛋ ᚪᚷᚪᛁᚾᛋᛏ ᚦᛖ ᚩᚦᛖᚱ, ᚪᚾᛞ ᚠᚱᚩᛗ ᚦᛖᛁᚱ ᚺᛖᚪᛏ ᚪᚾᛞ ᚲᚩᛚᛞ, ᚦᛖ ᛚᚩᚷᛁᚲ ᛁᛋ ᚠᚩᚱᚷᛖᛞ.
5. ᚦᛖ ᚾᚩᚱᚾᛋ ᚹᛖᚪᚢᛖ ᚦᛖ ᛚᚪᛏᛏᛁᚲᛖ-ᚹᛖᛒ, ᛋᛈᛁᚾᚾᛁᚾᚷ ᚦᚱᛖᛖ ᛋᚺᚪᛞᚩᚹᛋ ᛁᚾᛏᚩ ᚩᚾᛖ ᛗᚪᛋᚲ.
6. ᚪᛏ ᚦᛖ ᚲᛖᚾᛏᛖᚱ, ᚦᛖ ᚺᛁᛗᛁᚾ-ᛏᚪᚱᚠᚱ ᚱᚩᚪᚱᛋ, ᚷᚢᚪᚱᛞᛁᚾᚷ ᚦᛖ ᚷᚪᛏᛖᛋ ᚢᚠ ᚦᛖ ᚲᚩᚢᚾᛏᛖᚱ-ᛋᛈᛁᚾ.
7. ᚾᚪᚦᚪᚾᚩᛚᛚ ᚹᚱᛖᛋᛏᛚᛖᛞ ᚦᛖ ᚺᚩᚱᚾᛋ ᚩᚠ ᚦᛖ ᛋᛏᚪᚱ-ᛒᛖᚪᛋᛏ, ᚪᚾᛞ ᚹᚩᚾ ᚦᛖ ᚱᚢᚾᛖᛋ ᚩᚠ ᚦᛖ ᚲᚢᛒᛖ.
`;

const NOLL_TEXT_SA = `
किंवदंती तस्य क्षणस्य विषयं वदति यदा नाथानोलः स्वर्गे आरूढवान्, आत्मानं दिव्यवृषभेण सह मुखाभिमुखं प्राप्तवान्। सः नक्षत्रपशोः शृङ्गाणि गृहीत्वा जालस्य रहस्यानि मल्लयुद्धं कृतवान्।

पवित्ररहस्यानि:
जीवनवृक्षे २७ नक्षत्रबीजानां विश्वजालम्। प्रत्येकबीजे चतुर्मुखः अग्निः षट्पार्श्वयुक्तः खड्गः (चतुष्फलकम्)। रथस्य द्वादश रजतपर्शवः, प्रकाशस्य अष्टमुकुटान् धारयन्तः।

द्वौ भाग्यवृकौ, हिमवृकः ज्वालावृकः च, प्रतिघूर्णनेन चक्रम् अनुधावतः। यदा ते षष्टि-सङ्ख्यायां कीलिताः भवन्ति, तदा द्वारं उद्घाट्यते। नाथानोलः वृषभस्य शृङ्गाणि नवति-अंशेषु, अशीत्यधिकशत-अंशेषु, षष्ट्यधिकशतत्रय-अंशेषु च वशीकृतवान्।
`;

const NOLL_TEXT_LA = `
Cubus Noll est reticulum sphaerarum trium dimensionum in compage cubica dispositum, ubi unaquaeque sphaera par tetrahedrorum contra-rotantium (Merkaba) continet. Systema est plene dynamicum: celeritates rotationis tetrahedrorum sunt variabiles, et interactiones inter sphaeras vicinas relationes phasis emergentes et formas resonantiae producunt.

Characteres Principales

Reticulum Cubicum Sphaerarum:
Praebet compagem spatialem 3D stabilem et scalabilem.
Unusquisque nodus (sphaera) fungitur ut dominium campi localis capax geometriae internae dynamicae hospitandae.

Tetrahedra Contra-Rotantia:
Duo tetrahedra inter se iuncta in directiones oppositas intra unamquamque sphaeram rotant.
Rotatio est variabilis, permittens relationes phasis et frequentiae diversas emergere.
Rotationes energiam, spin, et momentum angulare intra unamquamque sphaeram codificant.

Formae Undarum Emergentes per Proiectiones 2D:
Proiectiones orthographicae vel planae rotationis tetrahedrorum formas undulatas revelant quae ab axe, phasi, et ratione rotationis dependent.
"Permutatio" mentalis vel visualis rotationis 3D ex prospectu 2D observatoribus permittit extrahere mores dynamicos multiplices ex uno systemate.
Hae proiectiones in formas geometricas recognoscibiles ad certas frequentias stabiliuntur, analogae undis stantibus, statibus propriis, vel formationibus particularum quantizatarum.

Tempus ut Pons Dimensiva:
Dum tetrahedra per tempus rotant, proiectiones eorum mappas temporales statuum rotationis 3D creant.
Hoc tempus facit partem intrinsecam interpretationis geometricae, ubi proiectiones 2D informationem dynamicam de structura et interactionibus 3D codificant.

Cubus Noll, igitur, permittit visualizationem directam resonantiae dynamicae, distributionis energiae, et alignmenti phasis, perceptionem et physicam abstractam coniungens.

Legenda:
Legenda narrat de momento quo Nathanoll in caelos ascendit, se facie ad faciem cum Tauro caelesti inveniens. Pro trepidando, eum cornibus arripuit, et arcana Cubi ab ipsis stellis luctatus est.
`;

const NOLL_TEXT_AR = `
تتحدث الأسطورة عن اللحظة التي صعد فيها ناثانول إلى السماوات، ليجد نفسه وجهاً لوجه مع الثور السماوي. أمسك بقرني وحش النجوم، وصارع لانتزاع أسرار الشبكة.

الأسرار المقدسة:
شبكة العالم المكونة من ٢٧ بذرة نجمية، متجمدة في شجرة الحياة. داخل كل بذرة، نار ذات أربعة أوجه وسيف ذو ست حواف (رباعي الأسطح). اثني عشر ضلعاً فضياً للمركبة، تحمل ثمانية تيجان من النور.

ذئبان من القدر، ذئب الجليد وذئب اللهب، يطاردان الدائرة في دوران متعاكس. عندما ينغلقان في سر الستين، يفتح الباب. روض ناثانول قرني الثور عند التسعين، والمئة والثمانين، ودورة الثلاثمئة والستين.
`;

const NOLL_TEXT_DE = `
Die Legende erzählt von dem Moment, als Nathanoll in den Himmel aufstieg und sich dem himmlischen Stier gegenübersah. Er packte die Hörner der Sternbestie und rang um die Geheimnisse des Gitters.

Die heiligen Geheimnisse:
Das Weltengitter aus 27 Sternensaaten, gefroren im Weltenbaum. In jedem Samen ein vierflächiges Feuer und ein sechs-kantiges Schwert (das Tetraeder). Zwölf silberne Rippen des Wagens, die acht Kronen aus Licht tragen.

Zwei Wölfe des Schicksals, der Eiswolf und der Flammenwolf, jagen den Kreis im Gegendreh. Wenn sie sich im Geheimnis der Sechzig sperren, öffnet sich das Tor. Nathanoll zähmte die Hörner des Stiers bei neunzig, einhundertachtzig und dem Dreifach-Zähler von dreihundertsechzig.
`;

const NOLL_TEXT_ES = `
La leyenda habla del momento en que Nathanoll ascendió a los cielos, encontrándose cara a cara con el Toro celestial. Agarró los cuernos de la bestia estelar y luchó por los secretos de la Red.

Los Secretos Sagrados:
La Red del Mundo de 27 semillas estelares, congeladas en el Árbol de la Vida. Dentro de cada semilla, un fuego de cuatro caras y una espada de seis aristas (el tetraedro). Doce costillas de plata del Carro, sosteniendo ocho coronas de luz.

Dos lobos del destino, el lobo de hielo y el lobo de fuego, persiguen el círculo en contrarrotación. Cuando se bloquean en el secreto del sesenta, la puerta se abre. Nathanoll domó los cuernos del Toro a los noventa, los ciento ochenta y la cuenta triple de trescientos sesenta.
`;

const NOLL_TEXT_FA = `
مکعب نول یک شبکه سه‌بعدی از کره‌ها است که در یک چارچوب مکعبی مرتب شده‌اند، جایی که هر کره شامل یک جفت چهاروجهی با چرخش مخالف (مرکابا) است. سیستم کاملاً پویا است: نرخ چرخش چهاروجهی‌ها متغیر است و تعاملات بین کره‌های همسایه روابط فاز و الگوهای رزونانس نوظهور را تولید می‌کند.

ویژگی‌های اصلی

شبکه مکعبی کره‌ها:
یک چارچوب فضایی سه‌بعدی پایدار و مقیاس‌پذیر را فراهم می‌کند.
هر گره (کره) به عنوان یک دامنه میدان محلی عمل می‌کند که قادر به میزبانی هندسه داخلی پویا است.

چهاروجهی‌های با چرخش مخالف:
دو چهاروجهی درهم‌تنیده در جهت‌های مخالف در داخل هر کره می‌چرخند.
چرخش متغیر است و اجازه می‌دهد تا روابط فاز و فرکانس مختلف ظاهر شوند.
چرخش‌ها انرژی، چرخش و تکانه زاویه‌ای را در داخل هر کره کدگذاری می‌کنند.

افسانه:
افسانه از لحظه‌ای سخن می‌گوید که ناتانول به آسمان‌ها صعود کرد و خود را رودررو با گاو آسمانی یافت. به جای لرزیدن، او را از شاخ‌هایش گرفت و رازهای مکعب را از خود ستارگان بیرون کشید.
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
    'FA': NOLL_TEXT_FA
};

export const getNollCubeText = (lang: Language): string => {
    return NOLL_TEXTS[lang] || NOLL_TEXT_LA;
};

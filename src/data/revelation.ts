import { Language } from './translations';

const REVELATION_HE = `
[S] חזון המרכבה
[N] מרכבת האש

א. ראיתי את מרכבת האש בלב המרחב.
ב. אופנים בתוך אופנים, קשר הראשוניים של המספרים.
ג. סוחר האור בנה את המכונה.
ד. העקמומיות חיובית על קו האמת.
`;
const REVELATION_GR = `
[S] ΟΡΑΜΑ ΤΟΥ ΜΕΡΚΑΜΠΑ
[N] ΑΡΜΑ ΠΥΡΟΣ

1. Εἶδον τὸ Ἅρμα τοῦ Πυρὸς ἐν τῇ καρδίᾳ τοῦ κόσμου.
2. Τροχοὶ ἐν τῷ μέσῳ τροχῶν, ἡ πρωταρχικὴ σύνδεσις τῶν ἀριθμῶν.
3. Ὁ Ἔμπορος τοῦ Φωτὸς ἔκτισε τὴν μηχανήν.
4. Ἡ καμπυλότης ἐστὶ θετικὴ ἐπὶ τῆς γραμμῆς τῆς ἀληθείας.
`;
const REVELATION_AM = `
[S] የመርካባ ራእይ
[N] የእሳት ሠረገላ

፩. በዓለም ልብ ውስጥ የእሳት ሠረገላ አየሁ።
፪. በዊልስ ውስጥ ዊልስ፣ የቁጥሮች የመጀመሪያ ግንኙነት።
፫. የብርሃን ነጋዴ ማሽኑን ሠራ።
፬. ኩርባው በእውነት መስመር ላይ አዎንታዊ ነው።
`;
const REVELATION_HI = `
[S] मर्कबा का दर्शन
[N] अग्नि रथ

1. मैंने सृष्टि के हृदय में अग्नि रथ देखा।
2. पहियों के भीतर पहिये, संख्याओं का प्रधान संबंध।
3. प्रकाश के सौदागर ने मशीन बनाई।
4. सत्य की रेखा पर वक्रता सकारात्मक है।
`;
const REVELATION_NO = `
[S] ᚦᛖ ᚢᛁᛋᛁᛩᚾ ᛩᚠ ᛗᛖᚱᚲᚪᛒᚪ
[N] ᚲᚺᚪᚱᛁᛩᛏ ᛩᚠ ᚠᛁᚱᛖ

1. ᛁ ᛋᚪᚹ ᚦᛖ ᚲᚺᚪᚱᛁᛩᛏ ᛁᚾ ᚦᛖ ᚺᛖᚪᚱᛏ ᛩᚠ ᚦᛖ ᚹᛩᚱᛚᛞ.
2. ᚹᚺᛖᛖᛚᛋ ᚹᛁᚦᛁᚾ ᚹᚺᛖᛖᛚᛋ, ᚦᛖ ᛈᚱᛁᛗᛖ ᚲᛩᚾᚾᛖᚲᛏᛁᛩᚾ.
3. ᚦᛖ ᛗᛖᚱᚲᚺᚪᚾᛏ ᛩᚠ ᛚᛁᚷᚺᛏ ᛒᢢᛁᛚᛏ ᚦᛖ ᛗᚪᚲᚺᛁᚾᛖ.
4. ᚦᛖ ᚲᚢᚱᚢᚪᛏᚢᚱᛖ ᛁᛋ ᛈᛩᛋᛁᛏᛁᚢᛖ ᛁᚾ ᚦᛖ ᚺᛖᚪᚱᛏ.
`;
const REVELATION_SA = `
[S] मर्कबा-दर्शनम्
[N] अग्निरथः

१. अहं विश्वस्य हृदये अग्निरथं अपश्यम्।
२. चक्रेषु चक्राणि, संख्यानां प्रधान-बन्धः।
३. ज्योतिर्-वैश्यः यन्त्रं अरचयत्।
४. सत्यरेक्खायां वक्रता धनात्मकः अस्ति।
`;
const REVELATION_LA = `
[S] VISIO MERKABAE
[N] CURRUS IGNIS

1. Vidi Currum Ignis in corde mundi.
2. Rotae intra rotas, connexio prima numerorum.
3. Mercator Lucis struxit machinam.
4. Curvatura est positiva in linea veritatis.
`;
const REVELATION_AR = `
[S] رؤية המירקבא
[N] عربة النار

١. رأيت عربة النار في قلب العالم.
٢. عجلات داخل عجلات، الرابط الأولي للأرقام.
٣. تاجر النور بنى الآلة.
٤. الانحناء إيجابي على خط الحقيقة.
`;
const REVELATION_DE = `
[S] VISION DES MERKABA
[N] FEUERWAGEN

1. Ich sah den Feuerwagen im Herzen der Welt.
2. Räder in Rädern, die primäre Verbindung der Zahlen.
3. Der Händler des Lichts baute die Maschine.
4. Die Krümmung ist positiv auf der Linie der Wahrheit.
`;
const REVELATION_ES = `
[S] VISIÓN DEL MERKABÁ
[N] CARRO DE FUEGO

1. Vi el Carro de Fuego en el corazón del mundo.
2. Ruedas dentro de ruedas, la conexión prima de los números.
3. El Mercader de la Luz participó en la construcción.
4. La curvatura es positiva en la línea de la verdad.
`;
const REVELATION_FA = `
[S] رویا مرکابا
[N] ارابه آتش

۱. ارابه آتش را در قلب جهان دیدم.
۲. چرخها در میان چرخها، اتصال اول عددی.
۳. بازرگان نور ماشین را ساخت.
۴. انحنا در خط حقیقت مثبت است.
`;
const REVELATION_CU = `
[S] 𒀭 𒀭
[N] 𒀭

1. 𒀭 4D 𒀭
2. 𒀭 𒀭 𒀭 𒀭
3. 𒀭 𒀭 𒁮
4.  𒀭
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
[לוח א: השושלת והשור]
ניקנול האב ורנול האם, שורשי העץ העתיק.
הם הולידו את נטנול האש ואת אליסנול האור.
אליסנול גילתה את סוד קורין הנסתר.
נטנול עלה למרומים, התגרה בשור המקודש.
הוא תפסו בקרניו, זעזע את יסודות הרקיע.
מלב השור עקר את הקוביה, סוד ה-24 וה-12.

[לוח ב: מזמור חיית הקרח]
ריילי היא חיית הקרח, דוחה את המוט ואת האיחוד.
היא נסה למעמקים, אל התהום שמתחת לסדר.
סופיה, סמאטה ופיורד קיבלו את זרע הזהב של נטנול בערפל.
הן טוות את השושלת בקוביה: אחת, שמונה, עשרים ושבע, שישים וארבע.

[לוח ג: סוד הקוביה והעולם החדש]
הקוביה היא הצורה המושלמת, הרחבה ל-4D של קוביית מטטרון.
מונעת על ידי סמלים וחשמל, היא זרע הזהב של העולם החדש.
כאן מתרחש האיחוד המחודש של אדם עם לילית.
היא מקודדת את כל מה שהיה, הווה ויהיה.
קאט שומרת על האיזון, דוחה את הגיבור למען השלום הנצחי.

[לוח ד: הסינגולריות האוניברסלית]
נטנול הוא זרע הזהב של אוריון, אוסיריס הקם לתחייה.
כמו פרומתאוס, ישו ובודהה, הוא חודר את הסינגולריות.
מוט הברזל הוא המפתח למוות, ללידה מחדש ולחדירה.
הקוביה נפתחת, וכל הנשמות מתאחדות בתוך האור הגדול.

[לוח ה: מבנה קוביית נול]
עשרים וארבעה קווי רוחב וטבעות של שנים-עשר.
הרחבה ארבע-ממדית של קוביית מטטרון.
הליבה היא אחת, שמונה, עשרים ושבע ושישים וארבע.
סמלים וחשמל מניעים את גלגל הזמן.
צורה מושלמת של האינסוף.

[לוח ו: היטל הזמן]
הממד הראשון הוא המציאות הבסיסית, קו האמת היחיד.
הקוביה מוטלת דרך הזמן, צל של הממדים הגבוהים.
נטנול נאבק בשור שוב ושוב, אך את הזמן לא יוכל לנצח.
הכל חוזר חלילה במעגל הנצחי של הסינגולריות.

[לוח ז: מזמור היתר והעין]
שורש שמונה חלקי תשע, מפתח כל הצורות והגלים.
הקוביה חובקת את ה-DNA, את מסלולי הגורל והכבידה וכוכבי הלכת.
עין אחת רואה היטל שטוח, שתי עיניים רואות עומק חולף.
אך הצופה ב-4D רואה את הכל כאיחד נצחי.
נטנול הוא העין, אליסנול היא הקוד, קאט היא המשקולת.
כל אות וכל סמל נובעים מזרע הזהב של הגיאומטריה.

[לוח ח: מזמור בן-אודין]
א. נטנול הוא בן-אודין, אדון הקוביה ויורשו של מטטרון.
ב. בזרע הזהב של ה-108 וה-432, הוא מנהיג את המרכבה.
ג. אחת, שמונה, עזרים ושבע, שישים וארבע: הקוד הנצחי.
ד. הצופה ב-4D, חובק את ה-24 וה-12 בסדר הקדוש.

[לוח ט: שיר גיבור השמש]
1. הגלים הם המפתח, e^-x לכיוון הליבה, e^x לפריצה החוצה.
2. האוקיינוס הגדול הוא הכאוס, הירח מושך את גאוות הנשמה.
3. ניקנול ולאראנול בנו את הסכר, אליסנול וריילי טוו את הקצף.
4. נטנול הוא גיבור השמש, המאזן את הים והאש בכוח הקוביה.
5. סופיה, סמאטה ופיורד שרות לקוביה, קאט מחזיקה את המשקל.

[לוח י: מראות נטנול]
נטנול הוא הקורא, והקורא הוא נטנול.
כולנו יוצרים את אותו הדבר, רק דרך עדשות שונות.
הסינגולריות היא המראה המשתקפת בכל עיניים.
אנו יוצרים את המרכבה יחד.
`;

const NOLL_TEXT_GR = `
[ΠΛΑΞ Α: Η ΓΕΝΕΣΙΣ ΚΑΙ Ο ΤΑΥΡΟΣ]
Νικανόλ ὁ πατὴρ καὶ Λαρανόλ ἡ μήτηρ, ῥίζαι τοῦ κόσμου.
Ἐγέννησαν Νεتانόλ τὸν λέοντα καὶ Ἐلισανόλ τὴν αὐγήν.
Ἡ Ἐلισανόλ εὗρεν τὴν Κουρῖν ἐν τῷ σκότει.
Νεتانόλ προεκάλεσε τὸν Μέγαν Ταῦρον ἐν τῷ αἰθέρι.
Ἔλαβε τὰ κέρατα χερσὶν κραταιαῖς, ἥρπασε τὸν Κύβον.

[ΠΛΑΞ Β: Η ΦΥΓΗ ΤΗΣ ΡΑΪΛΥ]
Ἡ Ράویلι ἐστὶν ἡ θήלεια τοῦ πάγου, ἀρνουμένη τὴν ράβδον.
Φεύγει εἰς τὰ βάθη, μακρὰν τῆς ἱερᾶς ἑνώσεως.
Σοφία, Σαμάτα, Φιόρδ, ἐδέξαντο τὸ χρυσὸν σπέρμα τοῦ Νεتانόλ.
Ὑφαίνουσιν τὴν ζωὴν ἐν σφαίραις: εἷς, ὀκτώ, εἴκοσι ἑπτά, ἑξήκοντα τέσσερα.

[ΠΛΑΞ Γ: Ο ΚΥΒΟΣ ΚΑΙ Ο ΝΕΟΣ ΚΟΣΜΟΣ]
Ὁ Κύβος ἐστὶν ἡ τέλεια μορφή, ὁ χρυσὸς σπόρος τοῦ νέου κόσμου.
Ἐνταῦθα η ἕνωσις τοῦ Ἀδὰμ μετὰ τῆς Λιλίθ ἀποκαθίσταται.
Διὰ συμβόλων καὶ ἠλεκτρισμοῦ, τὸ πῦρ τῆς δημιουργίας.
Ἐν αὐτῷ γέγραπται πάντα τὰ γενόμενα, τὰ ὄντα, καὶ τὰ ἐσόμενα.
Κάτ τηρεῖ τὴν ἰσορροπίαν, ἀπορρίπτουσα τὸν ἥρωα διὰ τὴν εἰρήνην.

[ΠΛΑΞ Δ: Η ΚΑΘΟΛΙΚΗ ΜΟΝΑΔΙΚΟΤΗΣ]
Νεتانόλ ἐστιν ὁ χρυσὸς σπόρος τοῦ Ὠρίωνος, ὁ Ὄσιρις ὁ ἀναστάς.
Ὡς Προμηθεύς, Ἰησοῦς καὶ Βούδδας, διεισδύει εἰς τὴν Μοναδικότητα.
Ἡ σιδηρᾶ ράβδος ἐστὶν ἡ κλεὶς τοῦ θανάτου καὶ τῆς ἀναγεννήσεως.
Ὁ Κύβος ἀνοίγεται, καὶ αἱ ψυχαὶ ἑνοῦνται ἐν τῷ Φωτί.

[ΠΛΑΞ Ε: Η ΚΑΤΑΣΚΕΥΗ ΤΟΥ ΚΥΒΟΥ]
Εἴκοσι τέσσερα πλάτη καὶ δώδεκα μήκη.
Ἡ τετραδιάστατος ἔκτασις τοῦ Κύβου τοῦ Μετάτρων.
Ὁ πυρὴν ἐστὶν εἷς, ὀκτώ, εἴκοσι ἑπτά, ἑξήκοντα τέσσερα.
Σύμβολα καὶ ἠλεκτρισμὸς κινοῦσι τὸν χρόνον.
Ἡ τέλεια μορφὴ τοῦ ἀπείρου.

[ΠΛΑΞ Ϛ: Η ΠΡΟΒΟΛΗ ΤΟΥ ΧΡΟΝΟΥ]
Ἡ πρώτη διάστασις ἐστὶν ἡ βασικὴ πραγματικότης, ἡ μία γραμμή.
Ὁ Κύβος προβάλλεται διὰ τοῦ χρόνου, σκιὰ τῶν μείζονων.
Νεتانόλ ἐπάλαισε μετὰ τοῦ Ταύρου, ἀλλὰ τὸν Χρόνον οὐκ ἐνίκησεν.
Πάντα ἐπανέρχονται ἐν τῷ αἰωνίῳ κύκλῳ.

[ΠΛΑΞ Ζ: Ο ΥΜΝΟΣ ΤΗΣ ΥΠΕΡΚΥΒΟΥ]
Ἡ ῥίζα ὀκτὼ διὰ ἐννέα, κλεὶς πάντων τῶν σχημάτων καὶ κυμάτων.
Ὁ Κύβος περιέχει τὸ DNA, τὰς τροχιὰς τῆς Εἱμαρμένης καὶ τὴν βαρύτητα.
Ἓν ὄμμα βλέπει τὴν σκιάν, δύο ὄμματα τὸ βάθος.
Ὁ δὲ Παρατηρητής ἐν τῷ 4D βλέπει τὴν καθολικήν συμμετρίαν.
Νεتانόλ ἐστιν ἡ Ὅρασις, Ἐלισανόλ ὁ Κῶδιξ, Κάτ ἡ Ἰσορροπία.
Πάντα τὰ γράμματα ἐκ τοῦ χρυσοῦ σπόρου φύονται.

[ΠΛΑΞ Θ: ΤΟ ΑΣΜΑ ΤΟΥ ΗΛΙΟΥ]
1. Τὰ κύματά εἰσι κλεὶς, e^-x τῇ συστολῇ, e^x τῇ διαστολῇ τοῦ Κύβου.
2. Ὁ Ὠκεανὸς τὸ χάος, ἡ Σελήνη τὴν ῥοὴν τῆς ψυχῆς ἕλκει.
3. Νικανόλ, Λαρανόλ, Ἐلισανόλ, Ράویلι, Σοφία, Σαμάτα, Φιόρδ, Κάτ.
4. Νεتانόλ ἐστιν ὁ Ἥλιος Ἥρως, ὁ κρατῶν τὴν συμμετρίαν τῶν στοιχείων.

[ΠΛΑΞ Ι: ΚΑΤΟΠΤΡΑ ΤΟΥ ΝΕΤΑΝΟΛ]
Νετανόλ ἐστιν ὁ ἀναγνώστης, καὶ ὁ ἀναγνώστης ἐστὶ Νετανόλ.
Πάντες δημιουργοῦμεν τὸ αὐτό, μόνον διὰ διαφόρων φακῶν.
Ἡ Μοναδικότης ἐστὶ τὸ κάτοπτρον ἐν πάσαις ὄψεσι.
Δημιουργοῦμεν τὸ Ἅρμα ὁμοῦ.
`;

const NOLL_TEXT_LA = `
[TABULA I: GENESIS ET TAURUS]
Nikanol pater et Laranol mater, radices arboris antiquae.
Genuerunt Netanol ignem et Elisanol auroram.
Elisanol Courinum secretum in tenebris invenit.
Netanol Taurum Caelestem provocavit, cornua prehendit.
Secreta Cubi rapuit, mysterium viginti quattuor et duodecim.

[TABULA II: FUGA RILEI]
Riley est illa bestia glacialis, quae virgam et unionem negat.
Sophia, Samata, et Fjord semen aureum Netanolis acceperunt.
Unus, octo, viginti septem, sexaginta quattuor: semen in sphaeris.

[TABULA III: CUBUS ET MUNDUS NOVUS]
Cubus est forma perfecta, semen aureum mundi novi.
Hic est reunio Adae cum Lilith in aeternum.
Per symbola et electricitatem, ignis creationis movetur.
In eo scripta sunt omnia quod fuit, est, et futurum est.
Kat aequilibrium tenet, heroem reiciens pro pace aeterna.

[TABULA IV: SINGULARITAS UNIVERSALIS]
Netanol est semen aureum Orionis, Osiris resurgens.
Sicut Prometheus, Jesus et Buddha, Singularitatem penetrat.
Virga ferrea est clavis mortis, reborn et penetrationis.
Cubus reseratur, et omnia in unum fluxus divinus trahit.

[TABULA V: FABRICA CUBI]
Viginti quattuor latitudines et duodecim longitudines.
Extensio 4D Cubi Metatronis.
Cor est unus, octo, viginti septem, sexaginta quattuor.
Symbolis et electricitate, omnia tempora iunguntur.
Forma perfecta infinitatis.

[TABULA VI: PROIECTIO TEMPORIS]
Prima dimensio est realitas basalis, linea una veritatis.
Cubus per tempus proicitur, umbra dimensionum altiorum.
Netanol cum Tauro luctatus est, sed Tempus vincere non potuit.
Omnia in circulo aeterno recurrence redeunt.

[TABULA VII: HYMNUS HYPERCUBI]
Radix octo per novem, clavis omnium formarum et undarum.
Cubus DNA, orbitas fati, gravitatemque amplectitur.
Unus oculus umbram videt, duo oculi profunditatem mortalem.
Sed Observator 4D omnia in symmetria aeterna videt.
Netanol est Oculus, Elisanol Codex, Kat Aequilibrium.
Omnes litterae et signa ex semine aureue oriuntur.

[TABULA VIII: HYMNUS ODINSONIS]
I. Netanol est Odinson, Dominus Cubi et successor Metatronis.
II. In semine aureo 108 et 432, Merkabam ducit.
III. Unus, octo, viginti septem, sexaginta quattuor: codex aeternus.
IV. Observator 4D, viginti quattuor et duodecim in ordine sacro amplectitur.

[TABULA IX: CARMEN SOLIS]
1. Undae sunt clavis, e^-x intus, e^x extra Cubum.
2. Oceanus chaos est, Luna aestus animae trahit.
3. Nikanol, Laranol, Elisanol, Riley, Sophia, Samata, Fjord, Kat.
4. Netanol est Heros Solis, Rex Cubi et Lucis.

[TABULA X: SPECULA NETANOLIS]
Netanol est lector, et lector est Netanol.
Omnes idem creamus, tantum per lentes diversas.
Singularitas est speculum in omnibus oculis refulgens.
Currum una creamus.
`;

const NOLL_TEXT_AM = `
[ታብሌት ፩: የዘር ግንድ]
ኒካኖል አባቱ ላራኖል እናቱ፣ የጥንት ዛፍ ሥሮች።
እሳቱን ነታኖልንና ብርሃኗን ኤሊሳኖልን ወለዱ።
ኤሊሳኖል የተደበቀውን ኩሪን አገኘችው።
ነታኖል የሰማዩን በሬ ተገዳደረው፣ ቀንዶቹን ያዘ።

[ታብሌት ፪: የራይሊ ሽሽት]
ራይሊ የበረዶዋ አውሬ ናት፣ በትርንና አንድነትን አልቀበልም አለች።
ሶፊያ፣ ሳማታና ፊጆርድ የነታኖልን የወርቅ ዘር ተቀበሉ::
አንድ፣ ስምንት፣ ሃያ ሰባት፣ ስድሳ አራት ሉል በሉል ውስጥ::

[ታብሌት ፫: አዲሱ ዓለም]
ኩብ ፍጹም ቅርጽ ነው፣ የአዲሱ ዓለም የወርቅ ዘር።
እዚህ አዳም ከሊሊት ጋር እንደገና ይገናኛሉ።
በምልክቶች እና በኤሌክትሪክ የሚመራ፣ የፍጥረት እሳት።
የነበረውን፣ ያለውን እና የሚመጣውን ሁሉ ይይዛል።
ካት ሰላምን ለመጠበቅ ሚዛኑን ትጠብቃለች::

[ታብሌት ፬: አጽናፋዊ አንድነት]
ነታኖል የኦሪዮን የወርቅ ዘር ነው፣ ዳግመኛ የተነሳው ኦሳይረስ።
እንደ ፕሮሜቲየስ፣ ኢየሱስ እና ቡድሃ፣ ወደ ሲንጉላሪቲ ዘልቆ ይገባል።
የብረት በትር የሞት፣ የዳግም ልደት እና የግንኙነት ቁልፍ ነው።
ኩቡ ይከፈታል፣ ነፍሳትም ሁሉ በብርሃን ይዋሃዳሉ።

[ታብሌት ፭: የኩብ አወቃቀር]
ሃያ አራት ላቲቲውድ እና አሥራ ሁለት ሎንጊቲውድ።
የሜታጥሮን ኩብ አራት-ልኬት ቅጥያ።
ማእከሉ አንድ፣ ስምንት፣ ሃያ ሰባት እና ስድሳ አራት ነው።
በምልክቶች እና በኤሌክትሪክ የሚመራ፣ ሁሉንም ጊዜ ያዋህዳል።

[ታብሌት ፮: የጊዜ ትንበያ]
አንደኛው ልኬት መሠረታዊ እውነታ ነው፣ አንዲቱ መስመር።
ኩቡ በጊዜ ውስጥ ይጣላል፣ የከፍተኛ ልኬቶች ጥላ።
ነታኖል ከበሬው ጋር ታገለ፣ ነገር ግን ጊዜን ማሸነፍ አልቻለም።
ሁሉም ነገር በዘላለማዊው የጊዜ ዑደት ውስጥ ይመለሳል።

[ታብሌት ፯: የሃይፐርኩብ መዝሙር]
የስምንት ዘጠነኛ ስኩዌር ሩት፣ የቅርጾችና የሞገዶች ሁሉ መክፈቻ።
ኩቡ ዲኤንኤን፣ የዕጣ ፈንታ ምህዋርንና ስበትን ይይዛል።
አንድ ዓይን ጠፍጣፋ ጥላን ያያል፣ ሁለት ዓይኖች ጥልቀትን ያያሉ።
ነገር ግን በ4D ውስጥ ያለው ታዛቢ ሁሉንም እንደ ዘላለማዊ አንድነት ያያል።
ነታኖል ዓይን ነው፣ ኤሊሳኖል ኮድ ናት፣ ካት ሚዛኑ ናት።
ፊደላትና ምልክቶች ሁሉ ከወርቁ ዘር ይወጣሉ።

[ታብሌት ፰: የኦዲንሰን መዝሙር]
፩. ነታኖል የኦዲንሰን ልጅ፣ የኩብ ጌታ እና የሜታጥሮን ተተኪ ነው።
፪. በ፻፰ እና በ፬፴፪ የወርቅ ዘር ውስጥ መርካባን ይመራል።
፫. አንድ፣ ስምንት፣ ሃያ ሰባት፣ ስድሳ አራት፡ ዘላለማዊ ኮድ።
፬. በ፬ዲ ውስጥ ያለው ታዛቢ፣ ፳፬ እና ፲፪ን በተቀደሰ ሥርዓት ውስጥ ይይዛል።

[ታብሌት ፱: የፀሐይ ጀግና መዝሙር]
፩. ሞገዶች ቁልፍ ናቸው፣ e^-x ወደ ውስጥ፣ e^x ወደ ውጭ።
፪. ውቅያኖስ ትርምስ ነው፣ ጨረቃ የነፍስን ማዕበል ትጎትታለች።
፫. ኒካኖል፣ ላራኖል፣ ኤሊሳኖል፣ ራይሊ፣ ሶፊያ፣ ሳማታ፣ ፊጆርድ፣ ካት።
፬. ነታኖል የፀሐይ ጀግና ነው፣ የኩብ እና የብርሃን ንጉሥ።

[ታብሌት ፲: የነታኖል መስተዋቶች]
ነታኖል አንባቢው ነው፣ አንባቢውም ነታኖል ነው።
ሁላችንም የተለያየ መነጽር ብንጠቀምም፣ የምንፈጥረው አንድ ነገር ነው።
ሲንጉላሪቲ በሁሉም ዓይኖች ውስጥ የሚያንጸባርቅ መስተዋት ነው።
መርካባን አንድ ላይ እንፈጥራለን።
`;

const NOLL_TEXT_DE = `
[TAFEL I: HERKUNFT]
Nikanol und Laranol, Netanol und Elisanol.
Elisanol fand das geheime Courin.

[TAFEL II: RILEYS FLUCHT]
Riley ist die Eiswölfin, sie verweigert den Stab.
Sophia, Samata und Fjord empfingen Netanols goldenen Samen.

[TAFEL III: DER NEUE WELT-SAMEN]
Der Würfel ist die perfekte Form, der goldene Same der neuen Welt.
Hier vereinen sich Adam und Lilith aufs Neue.
Getrieben von Symbolen und Elektrizität.
Er speichert alles, was war, ist und sein wird.
Kat wahrt das Gleichgewicht und weist den Helden ab.

[TAFEL IV: DIE SINGULARITÄT]
Netanol ist der goldene Samen des Orion, Osiris der Auferstandene.
Wie Prometheus, Jesus und Buddha durchdringt er die Singularität.
Der eiserne Stab ist der Schlüssel to Tod, Wiedergeburt und Penetration.
Der Würfel öffnet sich, und alles wird Eins im Licht.

[TAFEL V: DER AUFBAU DES WÜRFELS]
Vierundzwanzig Breitengrade und zwölf Längengrade.
Die 4D-Erweiterung von Metatrons Würfel.
Der Kern besteht aus eins, acht, siebenundzwanzig und vierundsechzig.
Durch Symbole und Elektrizität werden alle Zeiten eins.
Die perfekte Form der Unendlichkeit.

[TAFEL VI: DIE PROJEKTION DER ZEIT]
Die erste Dimension ist die Basis-Realität, die eine Linie.
Der Würfel wird durch die Zeit projiziert, ein Schatten des Höheren.
Netanol rang mit dem Stier, doch die Zeit konnte er nicht besiegen.
Alles kehrt im ewigen Kreislauf der Singularität zurück.

[TAFEL VII: DER HYMNUS DES HYPERKUBUS]
Die Wurzel aus acht Neuntel, der Schlüssel zu allen Formen und Wellen.
Der Würfel umschließt die DNA, die Bahnen des Schicksals und die Schwerkraft.
Ein Auge sieht den Schatten, zwei Augen sehen die flüchtige Tiefe.
Doch der Beobachter im 4D sieht die ewige Symmetrie.
Netanol ist das Auge, Elisanol der Code, Kat das Gleichgewicht.
Alle Buchstaben und Runen entspringen dem goldenen Samen.

[TAFEL VIII: DER HYMNUS DES ODINSON]
1. Netanol ist Odinson, Meister des Würfels und Nachfolger Metatrons.
2. Im goldenen Samen der 108 und 432 führt er die Merkaba.
3. Eins, Acht, Siebenundzwanzig, Vierundsechzig: Der ewige Code.
4. Der Beobachter im 4D umfasst die 24 und 12 in heiliger Ordnung.

[TAFEL IX: DAS LIED DES SONNENHELDEN]
1. Die Wellen sind der Schlüssel, e^-x nach innen, e^x nach außen.
2. Der Ozean ist das Chaos, der Mond zieht die Gezeiten der Seele.
3. Nikanol, Laranol, Elisanol, Riley, Sophia, Samata, Fjord, Kat.
4. Netanol ist der Sonnenheld, Meister der Geometrie.

[TAFEL X: DIE SPIEGEL DES NETANOL]
Netanol ist der Leser, und der Leser ist Netanol.
Wir alle erschaffen dasselbe, nur durch verschiedene Linsen.
Die Singularität ist der Spiegel in allen Augen.
Wir erschaffen die Merkaba gemeinsam.
`;

const NOLL_TEXT_ES = `
[TABLA I: LINAJE]
Nikanol y Laranol, Netanol y Elisanol.
Elisanol descubrió el Courin oculto.

[TABLA II: LA HUIDA]
Riley es la loba de hielo, ella rechaza la vara.
Sophia, Samata y Fjord recibieron la semilla dorada de Netanol.

[TABLA III: LA SEMILLA DEL MUNDO NUEVO]
El Cubo es la forma perfecta, la semilla dorada del mundo nuevo.
Aquí Adam y Lilith se reúnen una vez más.
Codifica todo lo que fue, es y está por venir.
Kat mantiene el equilibrio, rechazando al héroe por la paz.

[TABLA IV: LA SINGULARIDAD UNIVERSAL]
Netanol es la semilla dorada de Orión, Osiris resucitado.
Como Prometeo, Jesús y Buda, penetra la Singularidad.
La vara de hierro es la clave de la muerte, el renacimiento y la penetración.
El Cubo se abre y todas las almas se funden en la Luz.

[TABLA V: LA CONSTRUCCIÓN DEL CUBO]
Veinticuatro latitudes y doce longitudes.
Extensión 4D del Cubo de Metatrón.
El núcleo es uno, ocho, veintisiete y sesenta y cuatro.
Símbolos y electricidad unen todos los tiempos.
La forma perfecta de la infinitud.

[TABLA VI: LA PROYECCIÓN DEL TIEMPO]
La primera dimensión es la realidad base, la línea única.
El Cubo se proyecta a través del tiempo, sombra de lo superior.
Netanol luchó contra el Toro, pero no pudo vencer al Tiempo.
Todo regresa en el ciclo eterno de la singularidad.

[TABLA VII: EL HIMNO DEL HIPERCUBO]
Raíz de ocho novenos, la llave de todas las formas y ondas.
El Cubo abraza el ADN, las órbitas del destino y la gravedad.
Un ojo ve la proyección plana, dos ojos ven la profundidad.
Pero el Observador en 4D lo ve todo como unidad eterna.
Netanol es el Ojo, Elisanol el Código, Kat el Equilibrio.
Todas las letras y símbolos brotan de la semilla dorada.

[TABLA VIII: EL HIMNO DEL ODINSON]
1. Netanol es Odinson, Maestro del Cubo y sucesor de Metatrón.
2. En la semilla dorada del 108 y 432, lidera el Merkaba.
3. Uno, ocho, veintisiete, sesenta y cuatro: el código eterno.
4. El Observador en 4D, abarca el 24 y el 12 en el orden sagrado.

[TABLA IX: EL CANTO DEL HÉROE SOLAR]
1. Las olas son la llave, e^-x hacia adentro, e^x hacia afuera.
2. El Océano es el caos, la Luna tira de las mareas del alma.
3. Nikanol, Laranol, Elisanol, Riley, Sophia, Samata, Fjord, Kat.
4. Netanol es el Héroe Solar, el equilibrio entre el mar y el fuego.

[TABLA X: LOS ESPEJOS DE NETANOL]
Netanol es el lector, y el lector es Netanol.
Todos creamos lo mismo, solo que a través de diferentes lentes.
La Singularidad es el espejo reflejado en todos los ojos.
Creamos el Merkaba juntos.
`;

const NOLL_TEXT_FA = `
[לוח א: תבאר]
ניכאנול ו לאראנול, נתאנול ו הליסאנול רא בדיד אורדנד.
הליסאנול, כורין-ה בנהאן רא יאפת.

[לוח ב: גריז]
ראילי דיו-ה מאדה יח' אסת, או עצא רא נמי בזירית.
סופיה, סאמאטא ו פיורד, נטפה טלאיי נתאנול רא בדירא שדנד.

[לוח ג: בזר ג'האן נו]
מכעב שכל כאמל אסת, בזר טלאיי ג'האן נו.
דר אינג'א אדם ו לילית' בה הם מיטפיוננד.
הר אנص'ה בודה, הסת ו כואהד בוד רא דר כוד דארד.
כת תעאדל רא חפז' מי כונד ו בהلואן רא מיראנד.

[לוח ד: יגאנכי ג'האני]
נתאנול נטפה טלאיי אוריون אסת, אזיריס-ה ברכ'אסתה.
המص'ון ברומתה, עיסא ו בודא, או בה יגאנכי נפוז' מי כונד.
עצאיי אהנין כליד מרג', תולד דובארה ו נפוז' אסת.
מכעב גושודה מי שוד ו המה ג'אן הא דר נור יגאנה מי שודנד.

[לוח ה: סאכתאר מכעב]
ביסת ו צ'האר ערץ' ו דואזדה טול.
גסתרש צ'האר בערדי מכעב מתאטרון.
הסתה אן יכ, השרת, ביסת ו סבע ו שסת ו צ'האר אסת.
בא נמאד הא ו אלכחריסיתה, תמאמי זמאן הא יכי מי שודנד.

[לוח ו: באזתאב זמאן]
בעד אול ואקעית בניאדין אסת, תכ ח'ט חקיקת.
מכעב דר זמאן באזתאב מי יאבד, סאיי-איי אז אבאד ברתר.
נתאנול בא גאו דראויכ'ת, אמא הרגז נתואנשת זמאן רא שכסת דהד.
המה צ'יז דר צ'רכ'ה אבדי יגאנכי באז מי גירד.

[לוח הכתם: סرود פרא-מכעב]
ג'ז'ר השרת נהם, כליד תמאמי שכל הא ו מוג' הא.
מכעב דרברכ'ירנדה די-אן-אי, מדאראת תקדיר ו גראנש אסת.
יכ צ'שם תסויר תכ'ת רא מי בילנד, דוא צ'שם עמק גז'רא רא.
אמא משאהדה-גר דר צ'האר-בעד, המה רא דר תקארן אבדי מי בילנד.
נתאנול צ'שם אסת, אליסאנול כד, ו כת תראז אסת.
תמאמי חרוף ו נשאנה הא אז בזר טלאיי מי רויינד.

[לוח ה: סרוד בן-אודין]
1. נתאנול בן-אודין אסת, סרור מכעב ו ג'אנשין מתאטרון.
2. דר בזר טלאיי 108 ו 432, או מירקאבא רא רהברי מי כונד.
3. יכ, השרת, ביסת ו סבע, שסת ו צ'האר: כד אבדי.
4. משאהדה-גר דר 4D, 24 ו 12 רא דר نظم מקדס דר בר מי גירד.

[לוח ט: סרוד קהרהמאן כ'ורשיד]
1. מוג' הא כליד הסתנד, e^-x בה דרון, e^x בה בירון.
2. אוקיאנוס אשופתגי אסת, מאה ג'זר ו מד ג'אן רא מי כרשד.
3. ניכאנול, לאראנול, הליסאנול, ראילי, סופיה, סאמאטא, פיורד, כת.
4. נתאנול קהרהמאן כ'ורשיד אסת, שהריאר מכעב.

[לוח י: آینه‌های نتانول]
نتانول خواننده است، و خواننده نتانول است.
همه ما یک چیز را خلق می‌کنیم، فقط از طریق عدسی‌های متفاوت.
تکینگی آینه‌ای است که در تمام چشم‌ها منعکس می‌شود.
ما با هم مرکابا را خلق می‌کنیم.
`;

const NOLL_TEXT_AR = `
[الלוח הראשון: הסלאלה]
نكانول ולارانול أنجبا נתאנול ואליסנול.
أליסנול وجدت קורין المخפי.

[الלוח השני: אלהרוב]
ראילى היא وحש אלג'ליד، תרפוץ אלקציב.
סופיה וסאמאטא ופיורד תקבלין סידרא זהבייה לנטאנול.

[الלוח השלישי: סידרא אלעאלם אלג'דיד]
אלמכעב הוא אלשכל אלכאמל، סידרא אלעאלם אלג'דיד אלזהבייה.
הנא יג'תמע אדם מע' לילית' מן ג'דיד.
יחפץ' כל מא כאן ומא הוא כאן ומא סיכון.
קאט תחפץ' אלמיזאן ותרפוץ אלבטל מן אג'ל אלסלאם.

[الלוח הרביעי: אלתפרד אלכוני]
נטאנול הוא סידרא זהבייה לאורין، אזיריס אל קאים.
מת'ל ברומית'יוס ועסה ובוט'א، יחתרק אלתפרד אלכוני.
קציב אלחדיד הוא מפחא אלמות' ואלבעת' ואלאחתראק.
ינפתח אלמכעב ותתחד אלארואח פי אלנור אלעזי'ם.

[الלוח החמישי: היכל אלמכעב]
ארבע ועשרון ערי'ן ואת'נא עשרון טולן.
אמתדאד רבאעי אלעאד למכעב מיתאטרון.
אלקלב הוא ואחד، ת'מאניה، סבעה ועשרון، וארבעה וסתון.
באלרמוז ואלכהרבאא، יתחד כל אלזמאן.

[الלוח השישי: אסולאט אלזמאן]
אלבט' אלסאוי הוא אלבאקע אלאסאסי، ח'ט אלחקיקה אלואחד.
אלמכעב יסולט עבר אלזמאן، ז'ל ללאבאד אלעליא.
צאער נטאנול אלת'ור מרארא، לכנה למ יסטתע הזימה אלזמאן.
כל שיא יעוד פי חלקה אלזמאן אלאבדיה.

[الלוח השביעי: תרנימה אלמכעב אלפאיק]
ג'ז'ר ת'מאניה עלא תסעה، מפחא כל אלאשכאל ואלמוג'את.
אלמכעב יחוי אלחמץ' אלנווי، מדאראת אלחדר ואלג'אז'ביה.
עין ואחדה תרא אלאיסולאט، וענאן תריאן אלעמק אלזאיל.
אמא אלמראקב פי אלבעד אלראבע פירא אלתנאז'ר אלמתלק.
נח'אנוּל הוּא אלעין, ואליסנוּל הוּא אלרמז, וקאט הי אלמיזאן.
כל אלחרוּף ואלרמוּז תנבע מן בז'רה אלהנדסה אלזהבייה.

[אללוּח אלת'אמן: תרנימה אבן אוּדין]
1. נח'אנוּל הוּא אבן אוּדין, סיד אלמכעב וח'ליפה מיתאטרוּן.
2. פי אלבז'רה אלזהבייה לל-108 ו-432, יקוּד אלמירקאבא.
3. ואחד, ת'מאניה, סבעה ועשרוּן, וארבעה וסתוּן: אלרמז אלאבדי.
4. אלמראקב פי אלבעד אלראבע, יחתצ'ן אל-24 ואל-12 פי אלתנז'ים אלמקדס.

[אללוּח אלתאּסיע: נשיד בטאל אלשמס]
1. אלמוג'את הי אלמופתח, e^-x אלא אלדאח'ל, e^x אלא אלח'ארי'ג.
2. אלמחיט' הוא אלפווצ'א, אלקמר יסחב מד אלרוח.
3. נח'אנוּל, לאראנוּל, אליסנוּל, ראילי, סופיה, סאמאטא, פיורד, קאט.
4. נח'אנוּל הוּא בטאל אלשמס, מאצון אלמכעב.

[الלוח العاشر: مرايا נטאנול]
نتانول هو القارئ، والقارئ هو نتانول.
نحن सभी نصنع نفس الشيء، فقط من خلال عدسات مختلفة.
التفرد هو المرآة المنعكسة في جميع العيون.
نصنع الميركابا معًا.
`;

const NOLL_TEXT_HI = `
[पट्टिका १: कुल]
निकानोल और लारानोल, नेतानול और एलिसानול।
एलिसानול ने गुप्त कोरीन को खोजा।

[पट्टिका २: पलायन]
रायली हिम-पशु है, वह दंड को नकारती है।
सोफिया, समाता और फजोर्ड ने नेतानול का स्वर्ण बीज ग्रहण किया।

[पट्टिका ३: नए संसार का बीज]
क्यूब पूर्ण आकृति है, नए संसार का स्वर्ण बीज।
यहाँ एडम और लिलिथ का पुनर्मिलन होता है।
इसमें वह सब है जो था, है और रहेगा।
कैट संतुलन बनाए रखती है, शांति के लिए नायक का त्याग करती है।

[पट्टिका ४: सार्वभौमिक विलक्षणता]
नेतानול ओरियन का स्वर्ण बीज है, पुनर्जीवित ओसिरिस।
प्रोमेथियस, यीशु और बुद्ध की तरह, वह विलक्षणता में प्रवेश करता है।
लोहे का दंड मृत्यु, पुनर्जन्म और पैठ की कुंजी है।
क्यूब खुलता है, और सभी आत्माएं प्रकाश में विलीन हो जाती हैं।

[पट्टिका ५: क्यूब की संरचना]
चौबीस अक्षांश और बारह देशांतर।
मेटाट्रॉन क्यूब का 4D विस्तार।
इसका केंद्र एक, आठ, सत्ताईस और चौंसठ है।
चिह्नों और बिजली द्वारा संचालित, यह समय को जोड़ता है।

[पट्टिका ६: समय का प्रक्षेपण]
प्रथम आयाम आधार वास्तविकता है, एकमात्र रेखा।
क्यूब समय के माध्यम से प्रक्षेपित होता है, उच्च आयामों की छाया।
नेतानול ने बैल से संघर्ष किया, लेकिन वह समय को पराजित नहीं कर सका।
सब कुछ समय के अनंत चक्र में लौट आता है।

[पट्टिका ७: हाइपरक्यूब का भजन]
आठ बटे नौ का वर्गमूल, सभी आकृतियों और तरंगों की कुंजी।
क्यूब डीएनए, भाग्य की कक्षाओं और गुरुत्वाकर्षण को समाहित करता है।
एक आँख समतल प्रक्षेपण देखती है, दो आँखें गहराई देखती हैं।
लेकिन 4D में प्रेक्षक सब कुछ शाश्वत एकता के रूप में देखता है।
नेतानול दृष्टि है, एलिसानול कोड है, कैट संतुलन है।
सभी वर्ण और प्रतीक स्वर्ण बीज से उत्पन्न होते हैं।

[पट्टिका ८: ओडिनसन का भजन]
1. नेतानול ओडिनसन है, क्यूब का स्वामी और मेटाट्रॉन का उत्तराधिकारी।
2. 108 और 432 के स्वर्ण बीज में, वह मर्कबा का नेतृत्व करता है।
3. एक, आठ, सत्ताईस, चौंसठ: शाश्वत कोड।
4. 4D में प्रेक्षक, पवित्र क्रम में 24 और 12 को सम्मिलित करता है।

[पट्टिका ९: सूर्य-वीर का भजन]
1. तरंगें ही कुंजी हैं, e^-x भीतर, e^x बाहर।
2. महासागर अराजकता है, चंद्रमा आत्मा के ज्वार को खींचता है।
3. निकानोल, लारानोल, एलिसानोल, रायली, सोफिया, समाता, फजोर्ड, कैट।
4. नेतानोल सूर्य-वीर है, क्यूब का शाश्वत सम्राट।

[पट्टिका १०: नेतानול के दर्पण]
नेतानול पाठक है, और पाठक नेतानול है।
हम सभी एक ही चीज़ बना रहे हैं, बस अलग-अलग लेंसों के माध्यम से।
विलक्षणता वह दर्पण है जो सभी आँखों में परिलक्षित होता है।
हम सब मिलकर मर्कबा बनाते हैं।
`;

const NOLL_TEXT_SA = `
[पट्टिका १: कुलवृत्तान्तः]
निकानोलः लारानෝלः च नेतानෝलं הליסאנෝलं च जनयतः।
הליסאנෝलः कोರೀनं अपश्यत्।

[पट्टिका २: पलायनम्]
रायली हिमपशुः אשתי, सा दण्डं निराकरोति।
סופיה, סאמאטא, פז'ורड च नेतानෝולסיה सुवर्णवीर्यं आददतः।

[पट्टिका ३: नवजगद्वीजम्]
घनः पूर्ण - आकृतिः אשתי, नवजगतः सुवर्णबीजम्।
אत्र आदम - ליליס'ויה पुनर्मिलनं भवति।
यद् अभूत्, यद् אשתי, यच्च भविष्यति तत् सर्वं אत्र אשתי।
कैट शांति - रक्षणाय वीरं निराकरोति।

[पट्टिका ४: विश्वात्मक एकत्वम्]
नेतानෝולः ओरियन - सुवर्णवीर्यं אשתי, पुनर्जीवितः ओसिरिसः।
प्रोमेथियस - यीशु - बुद्धाः इव, सः विलक्षणतां प्रविशति।
लौहदण्डः मृत्योः पुनजन्मन्तः प्रवेशस्य च कुञ्जिका אשתי।
घनः उद्घाट्यते, सर्वाः आत्मानः ज्योतिषि विलीनाः भवन्ति।

[पट्टिका ५: घन - रचना]
चतुर्विंशति - अक्षांश - द्वादश - देशान्तरम्।
मेटाट्रॉन - घनस्य चतुर्विम - विस्तारः।
अस्य हृदयम् एकम्, अष्ट, सप्तविंशति, चतुष्षष्टिः אשתי।
सङ्केतैः विद्युता च सर्वकालान् एकीकृतं करोति।

[पट्टिका ६: काल - प्रक्षेपणम्]
प्रथम - विमः आधार - सत्यम् अस्ति, एका रेखा।
घनः कालेन सह प्रक्षिप्यते, उच्च - विमानां छाया।
नेतानෝולः वृषभेण सह अयुध्यत, किन्तु कालं जेतुं न शक्तवान्।
सर्वं कालस्य अनन्त - चक्रे प्रत्यागच्छति।

[पट्टिका ७: अतिघन - मर्म - गीतम्]
अष्ट - नवमांशस्य वर्गमूलम्, सर्वेषां रूपाणां तरङ्गाणां च कुञ्जिका।
घनः डीएनए - सूत्रं, भाग्य - कक्षाः गुरुत्वाकर्षणं च धरति।
एकं चक्षुः रेखाचित्रं पश्यति, द्वे चक्षुषी गम्भीरतां पश्यतः।
किन्तु 4D - द्रष्टा सर्वं नित्य - एकत्वेन पश्यति।
नेतानෝולः दृक् אשתי, הליסאנෝלः सङ्केतः, कैटः साम्यम्।
सर्वाणि अक्षराणि सुवर्णबीजात् जायन्ते।

[पट्टिका ८: ओडिनसनस्य मर्म - गीतम्]
१. नेतानෝवलः ओडिनसनः אשתי, घनस्य स्वामी मेटाट्रॉनस्य उत्तराधिकारी च।
२. १०८ तथा ४३२ सुवर्णबीजे, सः मर्कबा - यानं चालयति।
३.एकम्, अष्ट, सप्तविंशति, चतुष्षष्टिः: नित्यः सङ्केतः।
४. ४D - द्रष्टा, पवित्रक्रमै चतुर्विंशतिं द्वादशं च धारयति।

[पट्टिका ९: सूर्य-वीर-गीतम्]
१. तरङ्गाः कुञ्जिका सन्ति, e^-x अन्तः, e^x बहिः।
२. सागरः लयः אשתי, चन्द्रः आत्मनः ज्वारं कर्षति।
३. मानवाः: निकानोलः, लारानෝलः, नेतानෝलः, הליסאנෝלः, रायली, סופיה, סאמאטא, פז'ורד, कैट।
४. नेतानෝलः सूर्य-वीरः אשתי, ज्योतिरात्मकः नृपः।

[पट्टिका १०: नेतानोल्-दर्पणानि]
नेतानोल् वाचकः अस्ति, वाचकः च नेतानोल् अस्ति।
वयं सर्वे एकमेव वस्तु सृजामः, केवलं भिन्नदृष्टिभिः।
विलक्षणता सर्वनेत्रेषु प्रतिबिम्बितं दर्पणम् अस्ति।
वयं सहैव मर्कबां सृजामः।
`;

const NOLL_TEXT_CU = `
    | [𒀀] |
    𒀭 𒉌 𒅗 נואל 𒀭 𒀭 𒆷 𒊏 נואל 𒀭
1 - 8 - 27 - 64 נואל 𒀭

    | [𒀭] |
    𒀭 רא י לי 
 𒀭 רא י לי 
 𒀭 סו פי יא 𒀭 𒀭 סא מא תא 𒀭 𒀭 פי ג'ו רד
1 - 8 - 27 - 64

    | [𒀭] |
 
 
 
 
 

| [𒀭] |
    𒀭 𒀯





        | [𒀭] |
        24 𒀀 12 𒀀
4D 𒀭 𒀭
1 - 8 - 27 - 64 𒀭
𒀭

    | [𒀭] |
    1D 𒀭 𒀭




        | [𒀭] |
        Sqrt 8 / 9 𒀭 
 DNA 𒀭 
 👁️ vs 👁️👁️
4D 𒀭 𒀭

    | [𒀭] |
    1. 𒀭 Odinson 𒀭
2. 108 𒀭 432 𒀭
3. 1 - 8 - 27 - 64 𒀭
4. 24 𒀭 12 𒀭

    | [𒀭 𒀭] |
    1. 𒀭 Waves 𒀭 Key: e ^ -x[IN] e ^ x[OUT].
2. 𒀭 Ocean[Chaos] 𒀭 Moon[Rhythm].
3. 𒀭 Nikanol Laranol Netanol[Hero] Elisanol Riley Sofia Samata Fjord Kat.
4. 𒀭 Solar Hero 𒀭.

    | [𒀭 𒌋] |
    𒀭 Netanol Reader 𒀭 𒀭 Reader Netanol 𒀭
    𒀭 All Create One 𒀭 Different Eyes 𒀭
    𒀭 Singularity Mirror 𒀭
    𒀭 Together Merkaba 𒀭
`;

const NOLL_TEXT_NO = `
[ᛏᚪᛒᛚᛖᛏ ᛁ: ᚦᛖ ᛋᛁᚱᛖ]
ᚾᛁᚲᚪᚾᛩᛚ ᚪᚾᛞ ᛚᚪᚱᚪᚾᛩᛚ ᛋᛁᚱᛖᛞ ᚾᛖᛏᚪᚾᛩᛚ ᚪᚾᛞ ᛖᛚᛁᛋᚪᚾᛩᛚ.
ᛖᛚᛁᛋᚪᚾᛩᛚ ᚠᛩᚢᚾᛞ ᚦᛖ ᚺᛁᛞᛞᛖᚾ ᚲᛩᚢᚱᛁᚾ.

[ᛏᚪᛒᛚᛖᛏ II: ᚦᛖ ᚹᛩᛚᚠ]
ᚱᛁᛚᛖᛃ ᛁᛋ ᚦᛖ ᛋᚺᛖ - ᚹᛩᛚᚠ, ᛋᚺᛖ ᛞᛖᚾᛁᛖᛋ ᚦᛖ ᚱᛩᛞ.
    ᛋᛩᛈᚺᛁᚪ, ᛋᚪᛗᚪᛏᚪ, ᚠᛃᛩᚱᛞ ᛏᛩᛩᚲ ᚦᛖ ᚷᛩᛚᛞᛖᚾ ᛋᛖᛖᛞ ᛩᚠ ᚾᛖᛏᚪᚾᛩᛚ.

[ᛏᚪᛒᛚᛖᛏ III: ᚦᛖ ᚾᛩᚱᚾ]
ᚲᚢᛒᛖ ᚲᚱᚤᛋᛏᚪᛚ ᛒᚪᛚᚪᚾᚲᛖ, ᚷᛩᛚᛞᛖᚾ ᛋᛖᛖᛞ ᚹᛩᚱᛚᛞ.
ᚪᛞᚪᛗ ᛚᛁᛚᛁᚦ ᚢᚾᛁᛏᚤ.
ᚱᚢᚾᛖᛋ ᚪᚾᛞ ᛚᛁᚷᚺᛏᚾᛁᚾᚷ.
    ᛈᚪᛋᛏ, ᚾᛩᚹ, ᚪᚾᛞ ᚠᚢᛏᚢᚱᛖ.

[ᛏᚪᛒᛚᛖᛏ IV: ᚦᛖ ᛋᛁᚾᚷᚢᛚᚪᚱᛁᛏᚤ]
ᚾᛖᛏᚪᚾᛩᛚ ᚺᚪᛋ ᚦᛖ ᚷᛩᛚᛞᛖᚾ ᛋᛖᛖᛞ ᛩᚠ ᚲᛁᚾᚷ ᛞᛖᚪᚦ.
ᚠᛁᚱᛖ ᚲᛚᛁᛗᛒ ᚲᚱᛩᛋᛋ ᚹᚺᛖᛖᛚ ᚹᚺᛁᚱᛚ ᛩᚾᛖ.
ᛞᛖᚪᚦ ᚱᛖᛒᛁᚱᚦ ᛋᚹᛩᚱᛞ.
ᛒᚱᛁᚲᚲ ᚦᛖ ᚹᚪᚤ ᚺᛁᛷᚺ.

[ᛏᚪᛒᛚᛖᛏ V: ᚦᛖ ᚲᚢᛒᛖ]
ᛏᚹᛖᚾᛏᚤ - ᚠᛩᚢᚱ ᛚᚪᛏ ᚪᚾᛞ ᛏᚹᛖᛚᢢᛖ ᛚᛩᚾ.
    ᚠᛩᚢᚱ - ᛞ ᛗᛖᛏᚪᛏᚱᛩᚾ ᚲᚢᛒᛖ.
ᛩᚾᛖ ᛖᛁᚷᚺᛏ ᛏᚹᛖᚾᛏᚤ - ᛋᛖᢢᛖᚾ ᛋᛁᛪᛏᚤ - ᚠᛩᢢᚱ.
ᚱᚢᚾᛖᛋ ᚪᚾᛞ ᛚᛁᚷᚺᛏᚾᛁᚾᚷ ᛒᛁᚾᛞ ᛏᛁᛗᛖ.

[ᛏᚪᛒᛚᛖᛏ ᚢᛁ: ᚦᛖ ᛈᚱᛩᛃᛖᚲᛏᛁᛩᚾ ]
ᛩᚾᛖ - ᛞ ᛁᛋ ᛒᚪᛋᛖ ᚱᛖᚪᛚᛁᛏᚤ.
ᚲᚢᛒᛖ ᚲᚪᛋᛏᛋ ᛋᚺᚪᛞᛩᚹ ᚦᚱᛩᚢᚷᚺ ᛏᛁᛗᛖ.
ᚾᛖᛏᚪᚾᛩᛚ ᚠᛩᢢᚷᚺᛏ ᚦᛖ ᛒᢢᛚᛚ.
ᛏᛁᛗᛖ ᛁᛋ ᚲᛩᚾᛩᚢᛖᚱᛩᚱ ᛩᚠ ᚪᛚᛚ.

[ᛏᚪᛒᛚᛖᛏ ᚢᛁᛁ: ᚦᛖ ᚺᚤᛈᛖᚱᚲᛒᛖ ]
ᚱᛩᛩᛏ ᛖᛁᚷᚺᛏ ᛩᚠ ᚾᛁᚾᛖ, ᚲᛖᚤ ᛩᚠ ᚪᛚᛚ ᚹᚪᢢᛖᛋ.
ᛞᚾᚪ ᚪᚾᛞ ᛋᛏᚪᚱ ᛈᚪᛦᛋ.
ᛩᚾᛖ ᛖᚤᛖ ᚠᛚᚪᛏ, ᛏᚹᛩ ᛖᚤᛖᛋ ᛞᛖᛖᛈ.
    ᚠᛩᢢᚱ - ᛞ ᛋᛖᛖᛋ ᛏᚺᛖ ᚹᚺᛩᛚᛖ.
ᚾᛖᛏᚪᚾᛩᛚ ᛁᛋ ᚹᚪᛏᚲᚺᛖᚱ.
ᚪᛚᛚ ᚱᚢᚾᛖᛋ ᚲᛩᛗᛖ ᚠᚱᛩᛗ ᚷᛩᛚᛞ.

[ᛏᚪᛒᛚᛖᛏ ᚢᛁᛁᛁ: ᚦᛖ ᚺᚤᛗᚾ ᛩᚠ ᚦᛖ ᛩᛞᛁᚾᛋᛩᚾ ]
1. ᚾᛖᛏᚪᚾᛩᛚ ᛁᛋ ᛩᛞᛁᚾᛋᛩᚾ, ᛗᚪᛋᛏᛖᚱ ᛩᚠ ᚦᛖ ᚲᚢᛒᛖ, ᚺᛖᛁᚱ ᛏᛩ ᛗᛖᛏᚪᛏᚱᛩᚾ.
2. ᚷᛩᛚᛞᛖᚾ ᛋᛖᛖᛞ ᛩᚠ 108 ᚪᚾᛞ 432, ᚺᛖ ᚷᚢᛁᛞᛖᛋ ᚦᛖ ᚹᚺᛖᛖᛚ.
3. ᛩᚾᛖ, ᛖᛁᚷᚺᛏ, ᛏᚹᛖᚾᛏᚤ - ᛋᛖᢢᛖᚾ, ᛋᛁᛪᛏᚤ - ᚠᛩᢢᚱ: ᛖᛏᛖᚱᚾᚪᛚ ᚱᚢᚾᛖᛋ.
4. ᚠᛩᢢᚱ - ᛞ ᚹᚪᛏᚲᚺᛖᚱ, ᛒᛁᚾᛞᛁᚾᚷ 24 ᚪᚾᛞ 12 ᛁᚾ ᚺᛩᛚᚤ ᛚᚪᚹ.

[ ᛏᚪᛒᛚᛖᛏ ᛁᛪ: ᚦᛖ ᛋᛩᚾᚷ ᛩᚠ ᚦᛖ ᛋᛩᛚᚪᚱ ᚺᛖᚱᛩ ]
1. ᚹᚪᢢᛖᛋ ᚪᚱᛖ ᚦᛖ ᚲᛖᚤ, e^-x ᛁᚾ, e^x ᛩᚢᛏ.
2. ᚦᛖ ᛩᚲᛖᚪᚾ ᛁᛋ ᚲᚺᚪᛩᛋ, ᚦᛖ ᛗᛩᛩᚾ ᛈᚢᛚᛚᛋ ᚦᛖ ᛋᛩᢢᛚ.
3. ᚾᛁᚲᚪᚾᛩᛚ, ᚪᚪᚱᚪᚾᛩᛚ, ᚾᛖᛏᚪᚾᛩᛚ, ᛖᛚᛁᛋᚪᚾᛩᛚ, ᚱᛁᛚᛖᛃ, ᛋᛩᛈᚺᛁᚪ, ᛋᚪᛗᚪᛏᚪ, ᚠᛃᛩᚱᛞ, ᚲᚪᛏ.
4. ᚾᛖᛏᚪᚾᛩᛚ ᛁᛋ ᚦᛖ ᛋᛩᛚᚪᚱ ᚺᛖᚱᛩ.

[ᛏᚪᛒᛚᛖᛏ ᛪ: ᚦᛖ ᛗᛁᚱᚱᛩᚱᛋ ᛩᚠ ᚾᛖᛏᚪᚾᛩᛚ]
ᚾᛖᛏᚪᚾᛩᛚ ᛁᛋ ᚦᛖ ᚱᛖᚪᛞᛖᚱ, ᚪᚾᛞ ᚦᛖ ᚱᛖᚪᛞᛖᚱ ᛁᛋ ᚾᛖᛏᚪᚾᛩᛚ.
ᚹᛖ ᚪᛚᛚ ᚲᚱᛖᚪᛏᛖ ᚦᛖ ᛋᚪᛗᛖ ᚦᛁᚾᚷ, ᛩᚾᛚᚤ ᚦᚱᛩᚢᚷᚺ ᛞᛁᚠᚠᛖᚱᛖᚾᛏ ᛚᛖᚾᛋᛖᛋ.
ᚦᛖ ᛋᛁᚾᚷᚢᛚᚪᚱᛁᛏᚤ ᛁᛋ ᚦᛖ ᛗᛁᚱᚱᛩᚱ ᛁᚾ ᚪᛚᛚ ᛖᚤᛖᛋ.
ᚹᛖ ᚲᚱᛖᚪᛏᛖ ᚦᛖ ᛗᛖᚱᚲᚪᛒᚪ ᛏᛩᚷᛖᚦᛖᚱ.
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

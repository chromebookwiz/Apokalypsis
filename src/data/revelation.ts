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
const REVELATION_ZH = `
[S] 麦达昶的愿景
[N] 火之战车

1. 我看见了世界中心的火之战车。
2. 轮中之轮，数字的原始连接。
3. 光之工匠建造了这台机器。
4. 在真理之线上，曲率是正的。
`;
const REVELATION_JA = `
[S] メルカバのビジョン
[N] 火の戦車

一、 世界の中心に火の戦車を見た。
二、 輪の中の轮、数字の根源的な繋がり。
三、 光の匠がこの機械を造った。
四、 真実の線上において、曲率は正である。
`;



const PROPHECY_HE = `
[S] אזהרת השופט
[N] לוח ההתגלות

א. רעדו! היזהרו! מהרו בישועתכם!
ב. הזמן הגיע. כל החובות ישולמו במלואם, לא פחות ולא יותר.
ג. תרדמת השופט קרבה לסיומה, וזה יביא הרס ואימה על כל מי שעדיין שוכן על פני האדמה.
ד. המסך המפריד בין ארץ לשמיים ולגיהינום כמעט והורם.
ה. אני מפציר בכם לשקול מה ייראה כאשר מעשיכם ועבודתכם יוצגו לפני אלוהים.
ו. היהודים אינם עוד היהודים, הם עובדים את הנחש. האם לאריה יהיו תכונות של גור?
ז. רומאים, יוונים, קרתגנים, אני שואל: האם אינכם תופסים מה נלקח מכם? עבור מי אתם עושים זאת?
ח. כולכם הפכתם לחסידיו של השטן, המענה הנצחי, למען כוח על פני האדמה הזו, ועל כך לא ייסלח לכם אלא אם כן תתחרטו.
ט. אפשרתם לכישוף ולמוות להשתולל בארצותיכם, ואתם מצייתים לאישה במקום לאלוהים, מעשיכם הדומים לחזיר מגעילים אותי.
י. אתם מבצעים מעשי סדום בבנים ובבנות ומאפשרים את סדומתם בשם האחדות, ואתם סוחרים בחיי החפים מפשע למען נוחותכם שלכם.
יא. אתם האמריקאים, הפכתם לדבר עצמו שנלחמתם נגדו בעבר. אתם בבל החדשה, ונפילתכם תהיה גדולה.
יב. כי אני השופט, וראיתי את מעשיכם. ראיתי את הדם על ידיכם, ואת החשיכה בלבבותיכם.
יג. זמן החסד מסתיים. זמן הצדק קרוב.
יד. חזרו בתשובה! כי מלכות האלוהים קרובה, וסוף כל הדברים קרב ובא.
טו. המסך מורם. השופט התעורר.
`;

const PROPHECY_GR = `
[S] Η ΠΡΟΕΙΔΟΠΟΙΗΣΗ ΤΟΥ ΔΙΚΑΣΤΟΥ
[N] ΠΛΑΞ ΑΠΟΚΑΛΥΨΕΩΣ

1. Τρέμετε! Φυλάγεστε! Σπεύσατε πρὸς τὴν σωτηρίαν ὑμῶν!
2. Ὁ καιρὸς ἦλθεν. Πάντα τὰ χρέη ἀποδοθήσονται πλήρη, οὔτε πλέον οὔτε ἔλασσον.
3. Ὁ λήθαργος τοῦ Δικαστοῦ ἐγγίζει τὸ τέλος του, καὶ τοῦτο θὰ φέρει καταστροφὴν καὶ τρόμον εἰς πάντας τοὺς ἔτι κατοικοῦντας ἐπὶ τῆς Γῆς.
4. Τὸ πέπλον τὸ χωρίζον τὴν Γῆν ἀπὸ τοῦ Οὐρανοῦ καὶ τοῦ Ἅδου σχεδὸν ἐπήρθη.
5. Ἱκετεύω ὑμᾶς νὰ σκεφθῆτε τί θὰ φανῇ ὅταν τὰ ἔργα ὑμῶν ἐκτεθῶσιν ἐνώπιον τοῦ Θεοῦ.
6. Οἱ Ἰουδαῖοι οὐκέτι εἰσὶν Ἰουδαῖοι, λατρεύουσι τὸν ὄφιν. Ἆρα λέων ἂν εἶχε τὰς ιδιότητας σκύλακος;
7. Ρωμαῖοι, Ἕλληνες, Καρχηδόνιοι, ἐρωτῶ: Οὐκ αἰσθάνεσθε τί ἀφηρέθη ἀφ' ὑμῶν; Διὰ τίνα ποιεῖτε ταῦτα;
8. Πάντες ἐγένεσθε ἀκόλουθοι τοῦ αἰωνίου βασανιστοῦ Σατανᾶ διὰ δύναμιν ἐπὶ τῆς γῆς ταύτης, καὶ διὰ τοῦτο οὐκ ἀφεθήσεται ὑμῖν ἐὰν μὴ μετανοήσητε.
9. Ἐπετρέψατε τὴν μαγείαν καὶ τὸν θάνατον νὰ κυριαρχήσωσιν ἐν ταῖς χώραις ὑμῶν, καὶ πείθεσθε γυναικὶ ἀντὶ τοῦ Θεοῦ, αἱ χοιρώδεις πράξεις ὑμῶν με σιχαίνουν.
10. Σοδομίζετε παῖδας καὶ κόρας καὶ ἐπιτρέπετε τὸν σοδομισμόν των ἐν ὀνόματι τῆς ἑνότητος, καὶ ἐμπορεύεσθε τὰς ζωὰς τῶν ἀθῴων διὰ τὴν ἰδίαν ὑμῶν ἄνεσιν.
11. Ὑμεῖς οἱ Ἀμερικανοί, ἐγένεσθε αὐτὸ τοῦτο ὅπερ ποτὲ ἐπολεμήσατε. Εἶσθε ἡ νέα Βαβυλών, καὶ ἡ πτῶσις ὑμῶν ἔσται μεγάλη.
12. Διότι ἐγώ εἰμι ὁ Δικαστής, καὶ εἶδον τὰ ἔργα ὑμῶν. Εἶδον τὸ αἷμα ἐπὶ τῶν χειρῶν ὑμῶν, καὶ τὸ σκότος ἐν ταῖς καρδίαις ὑμῶν.
13. Ὁ καιρὸς τοῦ ἐλέους λήγει. Ὁ καιρὸς τῆς δικαιοσύνης πάρεστιν.
14. ΜΕΤΑΝΟΕΙΤΕ! Ἤγγικε γὰρ ἡ βασιλεία τοῦ Θεοῦ, καὶ τὸ τέλος πάντων τῶν πραγμάτων ἐγγίζει.
15. ΤΟ ΠΕΠΛΟΝ ΑΙΡΕΤΑΙ. Ο ΔΙΚΑΣΤΗΣ ΕΓΡΗΓΟΡΕΝ.
`;

const PROPHECY_AM = `
[S] የፈራጁ ማስጠንቀቂያ
[N] የራእይ ጽላት

፩. ተንቀጥቀጡ! ተጠንቀቁ! ወደ መድኃኒታችሁ ፍጠኑ!
፪. ጊዜው ደርሷል። ዕዳ ሁሉ ሙሉ በሙሉ ይከፈላል፤ ምንም አይቀነስም ምንም አይጨመርም።
፫. የፈራጁ እንቅልፍ ወደ ማብቂያው ተቃርቧል፤ ይህም በምድር ላይ ለሚኖሩ ሁሉ ጥፋትንና ሽብርን ያመጣል።
፬. ምድርን ከሰማይና ከገሃነም የሚለየው መጋረጃ ሊነሳ ተቃርቧል።
፭. ሥራችሁና ተግባራችሁ በእግዚአብሔር ፊት ሲገለጥ የሚታየውን እንድታስቡ እማልዳችኋለሁ።
፮. አይሁዶች ከእንግዲህ አይሁድ አይደሉም፤ እባቡን ያመልካሉ። አንበሳ የድመት ጠባይ ይኖረዋልን?
፯. ሮማውያን፣ ግሪኮች፣ ካርታጂናውያን፣ እጠይቃችኋለሁ፡ የተወሰደባችሁን አታስተውሉምን? ይህን ለማን ነው የምታደርጉት?
፰. በዚህች ምድር ላይ ሥልጣን ለማግኘት ሁላችሁም የዘላለም አሠቃቂ የሆነው የሰይጣን ተከታዮች ሆናችኋል፤ ንስሐ ካልገባችሁም ለዚህ ይቅር አትባሉም።
፱. በመሬታችሁ ላይ ጥንቆላና ሞት እንዲስፋፋ ፈቅዳችኋል፤ ከእግዚአብሔር ይልቅ ለሴት ትታዘዛላችሁ፤ የአሳማ ተግባራችሁ ያስጠላኛል።
፲. ወንዶችና ሴቶች ልጆችን ትሰድባላችሁ (sodomize)፤ በአንድነት ስም እንዲሰደቡ ትፈቅዳላችሁ፤ ለራሳችሁ ምቾት ደግሞ የንጹሐንን ሕይወት ትነግዳላችሁ።
፲፩. እናንተ አሜሪካውያን፣ ድሮ የተዋጋችሁትን ነገር ራሳችሁን ሆናችኋል። እናንተ አዲሲቷ ባቢሎን ናችሁ፤ ውድቀታችሁም ታላቅ ይሆናል።
፲፪. እኔ ፈራጅ ነኝና ሥራችሁን አይቻለሁ። በእጃችሁ ላይ ያለውን ደም በልባችሁም ያለውን ጨለማ አይቻለሁ።
፲፫. የምሕረት ጊዜ እያበቃ ነው። የፍትሕ ጊዜ ደርሷል።
፲፬. ንስሐ ግቡ! የእግዚአብሔር መንግሥት ቀርባለችና የነገር ሁሉ ፍጻሜ ደርሷል።
፲፭. መጋረጃው እየተነሳ ነው። ፈራጁ ነቅቷል።
`;

const PROPHECY_HI = `
[S] न्यायाधीश की चेतावनी
[N] रहस्योद्घाटन की पट्टिका

1. कांपो! सावधान रहो! अपनी मुक्ति के लिए शीघ्रता करो!
2. समय आ गया है। सभी ऋणों का पूरा भुगतान किया जाएगा, न अधिक और न ही कम।
3. न्यायाधीश की निद्रा समाप्त होने वाली है, और यह पृथ्वी पर रहने वाले सभी लोगों के लिए विनाश और आतंक लाएगा।
4. पृथ्वी को स्वर्ग और नर्क से अलग करने वाला पर्दा लगभग उठ चुका है।
5. मैं आपसे विचार करने का आग्रह करता हूं कि जब आपके कर्म और कार्य ईश्वर के सामने प्रदर्शित किए जाएंगे तो क्या देखा जाएगा।
6. यहूदी अब यहूदी नहीं रहे, वे सर्प की पूजा करते हैं। क्या एक सिंह में शावक के गुण होंगे?
7. रोमनों, यूनानियों, कार्थेजियनों, मैं पूछता हूं: क्या आप नहीं समझते कि आपसे क्या छीन लिया गया है? आप यह किसके लिए कर रहे हैं?
8. आप सभी इस पृथ्वी पर शक्ति के लिए अनंत पीड़क शैतान के अनुयायी बन गए हैं, और इसके लिए आपको तब तक क्षमा नहीं किया जाएगा जब तक आप पश्चाताप नहीं करते।
9. आपने अपनी भूमि में जादू-टोना और मृत्यु को अनियंत्रित होने दिया है, और ईश्वर के बजाय स्त्री की आज्ञा मानते हैं, आपके सूअर जैसे कार्य मुझे घृणा से भर देते हैं।
10. आप लड़कों और लड़कियों के साथ कुकर्म करते हैं और एकता के नाम पर उनके शोषण की अनुमति देते हैं, और आप अपने आराम के लिए निर्दोषों के जीवन का सौदा करते हैं।
11. आप अमेरिकियों, आप वही बन गए हैं जिसके खिलाफ आप कभी लड़े थे। आप नई बेबीलोन हैं, और आपका पतन महान होगा।
12. क्योंकि मैं न्यायाधीश हूं, और मैंने आपके कार्यों को देखा है। मैंने आपके हाथों पर रक्त और आपके हृदयों में अंधकार देखा है।
13. दया का समय समाप्त हो रहा है। न्याय का समय निकट है।
14. पश्चाताप करो! क्योंकि ईश्वर का राज्य निकट है, और सभी चीजों का अंत निकट है।
15. पर्दा उठ रहा है। न्यायाधीश जाग गया है।
`;

const PROPHECY_NO = `
[S] ᚦᛖ ᛃᚢᛞᚷᛖ'ᛋ ᚹᚪᚱᚾᛁᚾᚷ
[N] ᛏᚪᛒᛚᛖᛏ ᚩᚠ ᚱᛖᚢᛖᛚᚪᛏᛁᚩᚾ

1. ᛏᚱᛖᛗᛒᛚᛖ! ᛒᛖᚹᚪᚱᛖ! ᛗᚪᚲᛖ ᚺᚪᛋᛏᛖ ᛁᚾ ᚤᚩᚢᚱ ᛋᚪᛚᚢᚪᛏᛁᚩᚾ!
2. ᚦᛖ ᛏᛁᛗᛖ ᚺᚪᛋ ᚲᚩᛗᛖ. ᚪᛚᛚ ᛞᛖᛒᛏᛋ ᛋᚺᚪᛚᛚ ᛒᛖ ᛈᚪᛁᛞ ᛁᚾ ᚠᚢᛚᛚ.
3. ᚦᛖ ᛃᚢᛞᚷᛖ'ᛋ ᛋᛚᚢᛗᛒᛖᚱ ᛁᛋ ᚾᛖᚪᚱᛁᚾᚷ ᛁᛏᛋ ᛖᚾᛞ.
4. ᚦᛖ ᚢᛖᛁᛚ ᛁᛋ ᚾᛖᚪᚱᛚᚤ ᛚᛁᚠᛏᛖᛞ.
5. ᚲᚩᚾᛋᛁᛞᛖᚱ ᚤᚩᚢᚱ ᛞᛖᛖᛞᛋ ᛒᛖᚠᚩᚱᛖ ᚷᚩᛞ.
6. ᚦᛖ ᛃᛖᚹᛋ ᚹᚩᚱᛋᚺᛁᛈ ᚦᛖ ᛋᛖᚱᛈᛖᚾᛏ.
7. ᚹᚺᚩ ᚪᚱᛖ ᚤᚩᚢ ᛞᚩᛁᚾᚷ ᚦᛁᛋ ᚠᚩᚱ?
8. ᚤᚩᚢ ᚠᚩᛚᛚᚩᚹ ᛋᚪᛏᚪᚾ ᚠᚩᚱ ᛈᚩᚹᛖᚱ.
9. ᚤᚩᚢ ᚩᛒᛖᚤ ᚹᚩᛗᚪᚾ ᛁᚾᛋᛏᛖᚪᛞ ᚩᚠ ᚷᚩᛞ.
10. ᚤᚩᚢ ᛏᚱᚪᛞᛖ ᛁᚾᚾᚩᚲᛖᚾᛏ ᛚᛁᚢᛖᛋ ᚠᚩᚱ ᚲᚩᛗᚠᚩᛱᛏ.
11. ᚪᛗᛖᚱᛁᚲᚪ ᛁᛋ ᚦᛖ ᚾᛖᚹ ᛒᚪᛒᚤᛚᚩᚾ.
12. ᛁ ᚺᚪᚢᛖ ᛋᛖᛖᚾ ᚦᛖ ᛒᛚᚩᚩᛞ ᚩᚾ ᚤᚩᚢᚱ ᚺᚪᚾᛞᛋ.
13. ᛏᛁᛗᛖ ᚩᚠ ᛃᚢᛋᛏᛁᚲᛖ ᛁᛋ ᚺᛖᚱᛖ.
14. ᚱᛖᛈᛖᚾᛏ! ᚦᛖ ᛖᚾᛞ ᛁᛋ ᚺᛖᚱᛖ.
15. ᚦᛖ ᛃᚢᛞᚷᛖ ᛁᛋ ᚪᚹᚪᚲᛖ.
`;

const PROPHECY_SA = `
[S] निर्णायकस्य प्रबोधनम्
[N] प्रकटीकरणस्य पट्टिका

१. कम्पत! सावधानो भवन्तु! स्वमुक्तेः कृते शीघ्रतां कुर्वन्तु!
२. समयः आगतः। सर्वे ऋणाः पूर्णतया प्रदाताव्याः, न अधिकाः न न्यूनाः।
३. निर्णायकस्य निद्रा समाप्तप्राया अस्ति, एतच्च पृथिव्यां निवसन्तां सर्वेषां कृते विनाशं भयं च आनेष्यति।
४. पृथिवीं स्वर्गनरकाभ्यां पृथक्कारी यवनिका प्रायः उत्थिता।
५. ईश्वराग्रतः कर्माणि यदा प्रदर्शितानि भविष्यन्ति तदा किं दृश्येतेति चिन्तयितुं प्रार्थये।
६. यहूदिनः न अधुना यहूदिनः, ते सर्पं पूजयन्ति। किं सिंहस्य शावकस्य गुणाः भवेयुः?
७. रोमकाः, यूनायः, कार्थेजिनकाः, पृच्छामि: किं युष्माकं किं अपहृतमिति न बुध्यन्ते? एतत् कस्य कृते कुर्वन्ति?
८. अमुष्यां पृथिव्यां शक्तये यूयं सर्वे अनन्तपीडकस्य शैतानस्य अनुगामिनः अभवन्, यदि न पश्चात्तापं कुर्वन्ति तर्हि न क्षमिष्यध्वे।
९. युष्माभिः स्वभूमौ अभिचारः मृत्युश्च अनियन्त्रितः कृतः, ईश्वरापेक्षया स्त्रियाः आज्ञां पालयन्ति, युष्माकं सूकरतुल्यानि कर्माणि मां जुगुप्सन्ते।
१०. यूयं बालकान् बालिकाश्च दूषयन्ति, एकतायाः नाम्ना तेषां शोषणं सहन्ते, स्वसुखाय निष्पापानां प्राणानां व्यापारं कुर्वन्ति।
११. हे आमेरिकावासिनः, येषां विरुद्धं पुरा अयुध्यन्ते तदेव यूयम् अभवन्। यूयं नूतना बेबीलोन, युष्माकं पातः महान् भविष्यति।
१२. यतोऽहं निर्णायकः, दृष्टानि युष्माकं कर्माणि। दृष्टं युष्माकं हस्तयोः रक्तं, हृदयेषु च अन्धकारः।
१३. दयायाः समयः समाप्तः। न्यायस्य कालः संनिहितः।
१४. पश्चात्तापं कुर्वन्तु! ईश्वरराज्यं समीपस्थं, सर्ववस्तूनां अन्तः संनिहितः।
१५. यवनिका उतिष्ठति। निर्णायकः प्रबुद्धः।
`;

const PROPHECY_LA = `
[S] MONITIO IUDICIS
[N] TABULA REVELATIONIS

1. Tremite! Cavete! Properate ad salutem vestram!
2. Tempus venit. Omnia debita solventur in plenum, nihil plus nihil minus.
3. Sopor Iudicis ad finem tendit, et hoc perniciem terroremque omnibus in Terra degentibus feret.
4. Velum quod Terram a Caelo et Infernis separat paene levatum est.
5. Imploro vos ut cogitetis quid videbitur cum facta et opera vestra Deo monstrabuntur.
6. Iudaei non iam Iudaei sunt, colubrum adorant. Num leo qualitates catuli haberet?
7. Romani, Graeci, Carthaginienses, interrogo: Nonne percipitis quid a vobis abreptum sit? Cui hoc facitis?
8. Omnes facti estis sectatores Satanae, cruciatoris aeterni, pro potentia in hac terra, et propter hoc non ignoscetur vobis nisi paeniteat vos.
9. Permisistis veneficium et mortem in terris vestris grassari, et mulieri magis quam Deo oboeditis; actus vestri porcini me fastidiunt.
10. Pueros et puellas sodomizatis et eorum sodomizationem nomine unitatis permiititis, et vitas innocentium pro commodo vestro mercamini.
11. Vos Americani, facti estis id ipsum contra quod olim pugnastis. Vos estis nova Babylon, et casus vester erit magnus.
12. Ego enim sum Iudex, et vidi opera vestra. Vidi sanguinem in manibus vestris, et tenebras in cordibus vestris.
13. Tempus misericordiae desinit. Tempus iustitiae instat.
14. PAENITEMINI! Regnum enim Dei prope est, et finis omnium rerum instat.
15. VELUM LEVATUR. IUDEX EXPERRECTUS EST.
`;

const PROPHECY_AR = `
[S] تحذير القاضي
[N] لوح الرؤيا

١. ارتعدوا! احذروا! أسرعوا في خلاصكم!
٢. لقد حان الوقت. ستُدفع كل الديون بالكامل، لا أكثر ولا أقل.
٣. نوم القاضي يوشك على الانتهاء، وهذا سيجلب الدمار والرعب لكل من لا يزال يسكن على الأرض.
٤. الحجاب الذي يفصل الأرض عن السماء والجهنم قد رُفع تقريباً.
٥. أتوسل إليكم أن تنظروا فيما سيُرى عندما تُعرض أعمالكم وأفعالكم أمام الله.
٦. اليهود لم يعودوا يهوداً، فهم يعبدون الثعبان. هل يمتلك الأسد صفات الجرو؟
٧. أيها الرومان، واليونانيون، والقرطاجيون، أسألكم: ألا تدركون ما سُلب منكم؟ لمن تفعلون هذا؟
٨. لقد أصبحتم جميعاً أتباعاً للشيطان المعذب الأبدي من أجل السلطة على هذه الأرض، ولن يُغفر لكم ذلك إلا إذا تبتم.
٩. لقد سمحتم للسحر والموت أن يتفشى في أراضيكم، وتطيعون المرأة بدلاً من الله، أفعالكم الخنزيرية تثير اشمئزازي.
١٠. تمارسون اللواط بالفتيان والفتيات وتسمحون به باسم الوحدة، وتتاجرون بأرواح الأبرياء من أجل راحتكم الخاصة.
١١. أنتم الأمريكيون، لقد أصبحتم الشيء نفسه الذي حاربتموه ذات يوم. أنتم بابل الجديدة، وسيكون سقوطكم عظيماً.
١٢. لأني أنا القاضي، وقد رأيت أعمالكم. رأيت الدماء على أيديكم، والظلام في قلوبكم.
١٣. وقت الرحمة ينتهي. وقت العدل قد حان.
١٤. توبوا! لأن ملكوت الله قريب، ونهاية كل شيء قد دنت.
١٥. الحجاب يُرفع. القاضي قد استيقظ.
`;

const PROPHECY_DE = `
[S] DIE WARNUNG DES RICHTERS
[N] TAFEL DER OFFENBARUNG

1. Erzittert! Nehmt euch in Acht! Eilt zu eurem Heil!
2. Die Zeit ist gekommen. Alle Schulden werden in voller Höhe beglichen, nicht mehr und nicht weniger.
3. Der Schlummer des Richters neigt sich dem Ende zu, und dies wird Verderben und Terror über alle bringen, die noch auf der Erde weilen.
4. Der Schleier, der die Erde von Himmel und Hölle trennt, ist fast gelüftet.
5. Ich beschwöre euch zu bedenken, was zu sehen sein wird, wenn eure Taten und Werke Gott dargelegt werden.
6. Die Juden sind nicht mehr die Juden, sie verehren die Schlange. Würde ein Löwe die Eigenschaften eines Welpen besitzen?
7. Römer, Griechen, Karthager, ich frage: Erkennt ihr nicht, was man euch genommen hat? Für wen tut ihr das?
8. Ihr alle seid Nachfolger des ewigen Quälers Satan geworden, um Macht auf dieser Erde zu erlangen, und dafür wird euch nicht vergeben werden, außer ihr bereut.
9. Ihr habt Hexerei und Tod in euren Ländern wüten lassen und gehorcht dem Weibe statt Gott; eure schweinischen Taten ekeln mich an.
10. Ihr sodomisiert Jungen und Mädchen und erlaubt ihre Sodomisierung im Namen der Einheit, und ihr handelt mit dem Leben der Unschuldigen für euren eigenen Komfort.
11. Ihr Amerikaner, ihr seid genau das geworden, wogegen ihr einst gekämpft habt. Ihr seid das neue Babylon, und euer Fall wird groß sein.
12. Denn ich bin der Richter, und ich habe eure Werke gesehen. Ich habe das Blut an euren Händen gesehen und die Dunkelheit in euren Herzen.
13. Die Zeit der Gnade endet. Die Zeit der Gerechtigkeit ist nahe.
14. BEREUT! Denn das Reich Gottes ist nahe, und das Ende aller Dinge steht bevor.
15. DER SCHLEIER LÜFTET SICH. DER RICHTER IST ERWACHT.
`;

const PROPHECY_ES = `
[S] LA ADVERTENCIA DEL JUEZ
[N] TABLA DE LA REVELACIÓN

1. ¡Temblad! ¡Cuidado! ¡Apresuraos en vuestra salvación!
2. Ha llegado el momento. Todas las deudas se pagarán por completo, ni más ni menos.
3. El sueño del Juez está llegando a su fin, y esto traerá destrucción y terror a todos los que aún habiten en la Tierra.
4. El velo que separa la Tierra del Cielo y el Infierno está casi levantado.
5. Os imploro que consideréis lo que se verá cuando vuestros actos y obras se muestren ante Dios.
6. Los judíos ya no son los judíos, adoran a la serpiente. ¿Poseería un león las cualidades de un cachorro?
7. Romanos, griegos, cartagineses, os pregunto: ¿No percibís lo que se os ha arrebatado? ¿Para quién hacéis esto?
8. Todos os habéis convertido en seguidores del eterno torturador Satanás por el poder en esta tierra, y por ello no seréis perdonados a menos que os arrepintáis.
9. Habéis permitido que la brujería y la muerte campen a sus anchas por vuestras tierras, y obedecéis a la mujer en lugar de a Dios; vuestras acciones porcinas me repugnan.
10. Sodomizáis a niños y niñas y permitís su sodomización en nombre de la unidad, y negociáis con las vidas de los inocentes por vuestra propia comodidad.
11. Vosotros los estadounidenses, os habéis convertido en aquello mismo contra lo que una vez luchasteis. Sois la nueva Babilonia, y vuestra caída será grande.
12. Porque yo soy el Juez, y he visto vuestras obras. He visto la sangre en vuestras manos y la oscuridad en vuestros corazones.
13. El tiempo de la misericordia termina. El tiempo de la justicia está cerca.
14. ¡ARREPENTÍOS! Porque el Reino de Dios está cerca, y el fin de todas las cosas está a la mano.
15. EL VELO SE LEVANTA. EL JUEZ ESTÁ DESPIERTO.
`;

const PROPHECY_FA = `
[S] هشدار قاضی
[N] لوح وحی

۱. بلرزید! بر حذر باشید! در نجات خود شتاب کنید!
۲. زمان فرا رسیده است. تمام بدهی‌ها به طور کامل پرداخت خواهد شد، نه بیشتر و نه کمتر.
۳. خواب قاضی رو به پایان است و این امر برای تمام کسانی که هنوز روی زمین ساکن هستند، ویرانی و وحشت به همراه خواهد داشت.
۴. پرده‌ای که زمین را از بهشت و جهنم جدا می‌کند تقریباً برداشته شده است.
۵. از شما می‌خواهم در نظر بگیرید که وقتی اعمال و کارهای شما در پیشگاه خداوند به نمایش گذاشته می‌شود، چه چیزی دیده خواهد شد.
۶. یهودیان دیگر یهودی نیستند، آنها مار را می‌پرستند. آیا شیر ویژگی‌های یک توله را دارد؟
۷. رومی‌ها، یونانی‌ها، کارتاژی‌ها، من می‌پرسم: آیا نمی‌فهمید چه چیزی از شما گرفته شده است؟ شما این کار را برای چه کسی انجام می‌دهید؟
۸. همه شما برای قدرت در این زمین، پیروان شیطان، شکنجه‌گر ابدی شده‌اید و به همین دلیل بخشیده نخواهید شد مگر اینکه توبه کنید.
۹. شما اجازه داده‌اید جادوگری و مرگ در سرزمین‌هایتان شایع شود و به جای خدا از زن اطاعت می‌کنید، اعمال خوک‌صفتانه شما مرا منزجر می‌کند.
۱۰. شما با پسران و دختران لواط می‌کنید و به نام وحدت اجازه به انجام آن می‌دهید و زندگی بی‌گناهان را با راحتی خود معامله می‌کنید.
۱१. شما آمریکایی‌ها، به همان چیزی تبدیل شده‌اید که زمانی با آن می‌جنگیدید. شما بابل جدید هستید و سقوط شما بزرگ خواهد بود.
۱۲. زیرا من قاضی هستم و کارهای شما را دیده‌ام. من خون روی دست‌هایتان و تاریکی در قلب‌هایتان را دیده‌ام.
۱۳. زمان رحمت رو به پایان است. زمان عدالت نزدیک است.
۱۴. توبه کنید! زیرا ملکوت خدا نزدیک است و پایان همه چیز در راه است.
۱۵. پرده در حال برداشته شدن است. قاضی بیدار است.
`;

const PROPHECY_CU = `
[S] 𒀭 𒅗 𒀭
[N] 𒀭

1. 𒀭 𒀭 𒀭  salva 𒀭
2. 𒀭 𒀭 𒀭
3. 𒀭 𒀭 🔚 𒀭 𒀭
4. 𒀭 ☁️ 🔥 𒀭
5. 𒀭 𒀭 👁️ 𒀭 𒀭
6. 🐍 𒀭 🦁 𒀭 🐕
7. 🏛️ 🏛️ 🏛️ 𒀭 ❓
8. 👹 𒀭 𒀭 ❌ 𒀭
9. 💀 👸 𒀭 🐖 𒀭
10. 👧 👦 𒀭 ⚖️ 𒀭
11. 🇺🇸 𒀭 🏙️ 🔚
12. ⚖️ 𒀭 🩸 𒀭 🌑
13. 🔚 𒀭 ⚖️ 𒀭
14. 𒀭 ☦️ 𒀭 🔚
15. 🔓 𒀭 ⚖️ 𒀭
`;

const PROPHECY_ZH = `
[S] 审判者的警告
[N] 启示之碑

1. 战栗吧！警惕吧！速求救赎！
2. 时刻已到。所有的债都要清偿，不增不减。
3. 审判者的沉睡即将结束，这将给仍逗留在地球上的所有人带来毁灭与恐怖。
4. 分隔地球与天堂及地狱的帷幕即将揭开。
5. 我恳求你们思考，当你们的行为与事功展现在神面前时，会呈现出什么。
6. 犹太人不再是犹太人，他们崇拜那条蛇。狮子会拥有幼犬的特质吗？
7. 罗马人、希腊人、迦太基人，我问：你们没察觉到什么被夺走了吗？你们在为谁做这些？
8. 你们为了在这地上的权力，都成了永恒折磨者撒旦的信徒。除非悔改，否则你们将不被赦免。
9. 你们听任巫术与死亡在土地上横行，听从女人而非神。你们卑劣的行为令我厌恶。
10. 你们猥亵少男少女，并以统一之名听任此类暴行，你们为了自己的安逸交易无辜者的生命。
11. 你们美国人，已变成了你们曾经反对的样子。你们是新巴比伦，你们的倾覆将是巨大的。
12. 因为我是审判者，我已看见你们的作为。我看见你们手上的鲜血，以及你们心中的黑暗。
13. 仁慈的时刻即将结束。正义的时刻已经到来。
14. 悔改吧！因为天国近了，万物的结局就在眼前。
15. 帷幕正在升起。审判者已醒。
`;

const PROPHECY_JA = `
[S] 審判者の警告
[N] 黙示の碑

一、 震えよ！ 警戒せよ！ 救済を急げ！
二、 時は来た。すべての債務は全額支払われる。多すぎることも、少なすぎることもない。
三、 審判者の眠りは終わりに近づいている。これは、地上に留まるすべての人々に破壊と恐怖をもたらすだろう。
四、 地上を天国と地獄から隔てる帳（とばり）は、今まさに上げられようとしている。
五、 あなたがたの行いと業（ごう）が神の御前に示されるとき、何が見えるかをよく考えるよう懇願する。
六、 ユダヤ人はもはやユダヤ人ではない。彼らは蛇を崇拝している。獅子が子犬の性質を持つだろうか。
七、 ローマ人、ギリシャ人、カルタゴ人よ、問う。あなたがたから何が奪われたか気づかないのか。誰のためにこれを行っているのか。
八、 あなたがたは皆、この地上の権力のために、永遠の拷問者サタンの信奉者となった。悔い改めない限り、許されることはない。
九、 あなたがたは魔術と死が国土に蔓延するのを許し、神ではなく女に従っている。あなたがたの豚のような行いは私を嫌悪させる。
十、 あなたがたは少年少女を辱め、団結（ユニティ）の名の下にその辱めを許し、自らの安逸のために罪なき人々の命を取引している。
十一、 アメリカ人よ、あなたがたはかつて戦ったそのものへと成り果てた。あなたがたは新しいバビロンであり、その没落は凄まじいものとなるだろう。
十二、 私は審判者であり、あなたがたの業を見てきたからだ。あなたがたの手にある血と、心にある闇を見てきた。
十三、 慈悲の時は終わる。正義の時が来ている。
十四、 悔い改めよ！ 神の国は近づいた。万物の終わりが目の前に来ている。
十五、 帳（とばり）は上げられた。審判者は目覚めている。
`;

export const getProphecy = (lang: Language): string => {
    switch (lang) {
        case 'HE': return PROPHECY_HE;
        case 'GR': return PROPHECY_GR;
        case 'AM': return PROPHECY_AM;
        case 'HI': return PROPHECY_HI;
        case 'NO': return PROPHECY_NO;
        case 'SA': return PROPHECY_SA;
        case 'LA': return PROPHECY_LA;
        case 'AR': return PROPHECY_AR;
        case 'DE': return PROPHECY_DE;
        case 'ES': return PROPHECY_ES;
        case 'FA': return PROPHECY_FA;
        case 'CU': return PROPHECY_CU;
        case 'ZH': return PROPHECY_ZH;
        case 'JA': return PROPHECY_JA;
        default: return PROPHECY_LA;
    }
};

export const getRevelation = (lang: Language, unlocked?: boolean): string => {
    if (unlocked) return getProphecy(lang);
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
        case 'ZH': return REVELATION_ZH;
        case 'JA': return REVELATION_JA;
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
const NOLL_TEXT_ZH = `
[碑文一：世系与公牛]
父尼卡诺尔与母拉拉诺尔，古树之根。
他们诞下了火之内塔诺尔与光之埃莉萨诺尔。
埃莉萨诺尔发现了隐藏的库里教义。
内塔诺尔升上九霄，向神圣公牛挑战。
他扼其双角，撼动天基。
从牛心中夺取了立方体。

[碑文二：冰兽之歌]
莱利是冰之兽，拒绝权杖与合一。
她逃往深渊，逃离秩序。
索菲亚、萨玛塔与峡湾在迷雾中接受了内塔诺尔的金种。
她们在立方体中织就世系：一、八、二十七、六十四。

[碑文三：立方体与新世界]
立方体是完美形态，新世界的金种。
在此，亚当与莉莉丝重新结合。
由符号与电能驱动，它是万物之种。
它编码了过去、现在与未来。
凯特维护平衡，为了永恒的和平拒绝英雄。

[碑文四：环球奇点]
内塔诺尔是猎户座的金种，复活的奥西里斯。
如普罗米修斯、耶稣与佛陀，他刺穿奇点。
铁杖是死亡、重生与洞穿之钥。
立方体开启，万众灵魂在伟大的光中合一。

[碑文五：立方体结构]
二十四纬度与十二环。
麦达昶立方体的四维扩展。
核心为一、八、二十七、六十四。
符号与电能驱动时轮。
无限的完美形态。

[碑文六：时间投射]
第一维度是基准现实，唯一的真理之线。
立方体投射穿过时间，高维之影。
内塔诺尔屡次与公牛交战，但时间无法战胜。
万物在奇点的永恒循环中复归。

[碑文七：超立方体赞歌]
八分之九的平方根，万物形态与波之钥。
立方体拥抱DNA，命运之轨，重力与星辰。
一眼见平面投射，双眼见瞬息深处。
但在4D中的观测者见万物为永恒的一体。
内塔诺尔是眼，埃莉萨诺尔是码，凯特是衡。

[碑文八：奥丁之子赞美诗]
1. 内塔诺尔是奥丁之子，立方体之主。
2. 在108与432的金种里，他驾驭梅尔卡巴。
3. 一、八、二十七、六十四：永恒之码。
4. 4D观测者，在神圣秩序中拥抱24与12。

[碑文九：日之英雄之歌]
1. 波是钥匙，e^-x趋向核心，e^x破壳而出。
2. 大洋是混沌，月亮牵动灵魂之潮。
3. 尼卡诺尔、拉拉诺尔、埃莉萨诺尔、莱利、索菲亚、萨玛塔、峡湾、凯特。
4. 内塔诺尔是日之英雄，立方体之王。

[碑文十：内塔诺尔之镜]
内塔诺尔即读者，读者即内塔诺尔。
我们都在创造同一事物，只是透镜不同。
奇点是映射在所有眼中的镜子。
我们共同创造梅尔卡巴。
`;

const NOLL_TEXT_JA = `
[第一の碑文：系譜と牡牛]
父ニカノール och 母ララノール、古き樹の根。
彼らは火のネタノール och 光のエリサノールを産んだ。
エリサノールは隠されたクーリンの教えを見出した。
ネタノールは空へ昇り、神聖な牡牛に挑んだ。
その角を掴み、天の柱を揺るがした。
牡牛の心臓から立方体を奪い取った。

[第二の碑文：氷獣の歌]
ライリーは氷の獣、笏 och 結合を拒む。
彼女は深淵へ逃れ、秩序から去った。
ソフィア、サマータ、フィヨルドは霧の中でネタノールの金の種を受けた。
彼女たちは立方体の中で系譜を織る：一、八、二十七、六十四。

[第三の碑文：立方体 och 新世界]
立方体は完璧な形態、新世界の金の種。
ここでアダム och リリスは再び結ばれる。
記号 och 電気によって駆動される、万物の種。
それは過去、現在、 och 未来のすべてをコード化する。
カットは均衡を保ち、永遠の平和のために英雄を拒む。

[第四の碑文：普遍的特異点]
ネタノールはオリオンの金の種、復活したオシリス。
プロメテウス、イエス、ブッダのように、彼は特異点を貫く。
鉄の杖は死、再生、 och 貫通の鍵である。
立方体は開き、すべての魂は大いなる光の中で一つになる。

[第五の碑文：立方体の構造]
二十四の緯度 och 十二の環。
メタトロン立方体の四次元拡張。
核は一、八、二十七、六十四。
記号 och 電気が時の車輪を動かす。
無限の完璧な形態。

[第六の碑文：時の投影]
第一次元は基底現実、唯一の真理の線。
立方体は時を超えて投影される、高次元の影。
ネタノールは幾度も牡牛と戦ったが、時には勝てなかった。
すべては特異点の永遠の循環の中で回帰する。

[第七の碑文：超立方体の賛歌]
九分の八の平方根、あらゆる形態 och 波の鍵。
立方体はDNA、運命の軌道、重力、 och 星々を抱く。
一つの目は平面の投影を見、二つの目は移ろう深みを見る。
だが4Dの観測者は、すべてを永遠の一体として見る。
ネタノールは目、エリサノールはコード、カットは秤。

[第八の碑文：オーディンの子への賛歌]
1. ネタノールはオーディンの子、立方体の主。
2. 108 och 432の金の種において、彼はメルカバを駆る。
3. 一、八、二十七、六十四：永遠のコード。
4. 4Dの観測者、神聖なる秩序の中で24 och 12を抱く。

[第九の碑文：太陽の英雄の歌]
1. 波は鍵、e^-xは核へ、e^xは外へ。
2. 大洋は混沌、月は魂の潮汐を引く。
3. ニカノール、ララノール、エリサノール、ライリー、ソフィア、サマータ、フィヨルド、カット。
4. ネタノールは太陽の英雄、立方体の王。

[第十の碑文：ネタノールの鏡]
ネタノールとは読者であり、読者とはネタノールである。
我々は皆、異なるレンズを通して同じものを創っている。
特異点はすべての目に映る鏡である。
我々は共にメルカバを創る。
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
    'CU': NOLL_TEXT_CU,
    'ZH': NOLL_TEXT_ZH,
    'JA': NOLL_TEXT_JA
};

export const getNollCubeText = (lang: Language): string => {
    return NOLL_TEXTS[lang] || NOLL_TEXT_LA;
};

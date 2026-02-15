import { Language } from './translations';

const REVELATION_EN = `
[S] THE REVELATION
[N] The Vision of the Merkaba
1. After this I looked, and, behold, a door was opened in heaven...
8. Holy, holy, holy, Lord God Almighty, which was, and is, and is to come.
`;

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
[S] ራእየ ዮሐንስ
[N] ራእይ
1. ከዚህ በኋላ አየሁ፤ እነሆም በሰማይ የተከፈተ ደጅ...
8. ቅዱስ፥ ቅዱስ፥ ቅዱስ፥ የነበረውና ያለ የሚመጣውም...
`;

export const getRevelation = (lang: Language): string => {
    switch (lang) {
        case 'HE': return REVELATION_HE;
        case 'GR': return REVELATION_GR;
        case 'AM': return REVELATION_AM;
        case 'EN':
        default: return REVELATION_EN;
    }
};

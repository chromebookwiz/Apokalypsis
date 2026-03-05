import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetPath = path.join(__dirname, 'src', 'data', 'revelation.ts');
let content = fs.readFileSync(targetPath, 'utf8');

const additions = {
    'HE': `\n[לוח י: מראות נטנול]\nנטנול הוא הקורא, והקורא הוא נטנול.\nכולנו יוצרים את אותו הדבר, רק דרך עדשות שונות.\nהסינגולריות היא המראה המשתקפת בכל עיניים.\nאנו יוצרים את המרכבה יחד.`,
    'GR': `\n[ΠΛΑΞ Ι: ΚΑΤΟΠΤΡΑ ΤΟΥ ΝΕΤΑΝΟΛ]\nΝετανόλ ἐστιν ὁ ἀναγνώστης, καὶ ὁ ἀναγνώστης ἐστὶ Νετανόλ.\nΠάντες δημιουργοῦμεν τὸ αὐτό, μόνον διὰ διαφόρων φακῶν.\nἩ Μοναδικότης ἐστὶ τὸ κάτοπτρον ἐν πάσαις ὄψεσι.\nΔημιουργοῦμεν τὸ Ἅρμα ὁμοῦ.`,
    'LA': `\n[TABULA X: SPECULA NETANOLIS]\nNetanol est lector, et lector est Netanol.\nOmnes idem creamus, tantum per lentes diversas.\nSingularitas est speculum in omnibus oculis refulgens.\nCurrum una creamus.`,
    'AM': `\n[ታብሌት ፲: የነታኖል መስተዋቶች]\nነታኖል አንባቢው ነው፣ አንባቢውም ነታኖል ነው።\nሁላችንም የተለያየ መነጽር ብንጠቀምም፣ የምንፈጥረው አንድ ነገር ነው።\nሲንጉላሪቲ በሁሉም ዓይኖች ውስጥ የሚያንጸባርቅ መስተዋት ነው።\nመርካባን አንድ ላይ እንፈጥራለን።`,
    'DE': `\n[TAFEL X: DIE SPIEGEL DES NETANOL]\nNetanol ist der Leser, und der Leser ist Netanol.\nWir alle erschaffen dasselbe, nur durch verschiedene Linsen.\nDie Singularität ist der Spiegel in allen Augen.\nWir erschaffen die Merkaba gemeinsam.`,
    'ES': `\n[TABLA X: LOS ESPEJOS DE NETANOL]\nNetanol es el lector, y el lector es Netanol.\nTodos creamos lo mismo, solo que a través de diferentes lentes.\nLa Singularidad es el espejo reflejado en todos los ojos.\nCreamos el Merkaba juntos.`,
    'FA': `\n[לוח י: آینه‌های نتانول]\nنتانول خواننده است، و خواننده نتانول است.\nهمه ما یک چیز را خلق می‌کنیم، فقط از طریق عدسی‌های متفاوت.\nتکینگی آینه‌ای است که در تمام چشم‌ها منعکس می‌شود.\nما با هم مرکابا را خلق می‌کنیم.`,
    'AR': `\n[الלוח العاشر: مرايا נטאנול]\nنتانول هو القارئ، والقارئ هو نتانول.\nنحن सभी نصنع نفس الشيء، فقط من خلال عدسات مختلفة.\nالتفرد هو المرآة المنعكسة في جميع العيون.\nنصنع الميركابا معًا.`,
    'HI': `\n[पट्टिका १०: नेतानול के दर्पण]\nनेतानול पाठक है, और पाठक नेतानול है।\nहम सभी एक ही चीज़ बना रहे हैं, बस अलग-अलग लेंसों के माध्यम से।\nविलक्षणता वह दर्पण है जो सभी आँखों में परिलक्षित होता है।\nहम सब मिलकर मर्कबा बनाते हैं।`,
    'SA': `\n[पट्टिका १०: नेतानोल्-दर्पणानि]\nनेतानोल् वाचकः अस्ति, वाचकः च नेतानोल् अस्ति।\nवयं सर्वे एकमेव वस्तु सृजामः, केवलं भिन्नदृष्टिभिः।\nविलक्षणता सर्वनेत्रेषु प्रतिबिम्बितं दर्पणम् अस्ति।\nवयं सहैव मर्कबां सृजामः।`,
    'CU': `\n    | [𒀭 𒌋] |\n    𒀭 Netanol Reader 𒀭 𒀭 Reader Netanol 𒀭\n    𒀭 All Create One 𒀭 Different Eyes 𒀭\n    𒀭 Singularity Mirror 𒀭\n    𒀭 Together Merkaba 𒀭`,
    'NO': `\n[ᛏᚪᛒᛚᛖᛏ ᛪ: ᚦᛖ ᛗᛁᚱᚱᛩᚱᛋ ᛩᚠ ᚾᛖᛏᚪᚾᛩᛚ]\nᚾᛖᛏᚪᚾᛩᛚ ᛁᛋ ᚦᛖ ᚱᛖᚪᛞᛖᚱ, ᚪᚾᛞ ᚦᛖ ᚱᛖᚪᛞᛖᚱ ᛁᛋ ᚾᛖᛏᚪᚾᛩᛚ.\nᚹᛖ ᚪᛚᛚ ᚲᚱᛖᚪᛏᛖ ᚦᛖ ᛋᚪᛗᛖ ᚦᛁᚾᚷ, ᛩᚾᛚᚤ ᚦᚱᛩᚢᚷᚺ ᛞᛁᚠᚠᛖᚱᛖᚾᛏ ᛚᛖᚾᛋᛖᛋ.\nᚦᛖ ᛋᛁᚾᚷᚢᛚᚪᚱᛁᛏᚤ ᛁᛋ ᚦᛖ ᛗᛁᚱᚱᛩᚱ ᛁᚾ ᚪᛚᛚ ᛖᚤᛖᛋ.\nᚹᛖ ᚲᚱᛖᚪᛏᛖ ᚦᛖ ᛗᛖᚱᚲᚪᛒᚪ ᛏᛩᚷᛖᚦᛖᚱ.`
};

for (const [lang, add] of Object.entries(additions)) {
    const searchString = `const NOLL_TEXT_${lang} = \``;
    const parts = content.split(searchString);
    if (parts.length > 1) {
        const afterDef = parts[1];
        const endTickIndex = afterDef.indexOf('`;');
        if (endTickIndex !== -1) {
            const beforeTick = afterDef.substring(0, endTickIndex);
            const afterTick = afterDef.substring(endTickIndex);
            parts[1] = beforeTick + add + '\n' + afterTick;
            content = parts.join(searchString);
        }
    }
}

fs.writeFileSync(targetPath, content, 'utf8');
console.log("Updated revelation.ts");

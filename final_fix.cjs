const fs = require('fs');
const path = 'src/data/revelation.ts';

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
סופיה, סמאטה ופיורד קיבלו את זרע נטנול בערפל.
הן טוות את השושלת בקוביה: אחת, שמונה, עשרים ושבע, שישים וארבע.

[לוח ג: סוד הקוביה והעולם החדש]
הקוביה היא הצורה המושלמת, הרחבה ל-4D של קוביית מטטרון.
מונעת על ידי סמלים וחשמל, היא הזרע של העולם החדש.
כאן מתרחש האיחוד המחודש של אדם עם לילית.
היא מקודדת את כל מה שהיה, הווה ויהיה.

[לוח ד: הסינגולריות האוניברסלית]
נטנול הוא זרע אוריון, אוסיריס הקם לתחייה.
כמו פרומתאוס, ישו ובודהה, הוא חודר את הסינגולריות.
מוט הברזל הוא המפתח למוות, ללידה מחדש ולחדירה.
הקוביה נפתחת, וכל הנשמות מתאחדות בתוך האור הגדול.
`;

const NOLL_TEXT_GR = `
[ΠΛΑΞ Α: Η ΓΕΝΕΣΙΣ ΚΑΙ Ο ΤΑΥΡΟΣ]
Νικανόλ ὁ πατὴρ καὶ Λαρανόλ ἡ μήτηρ, ῥίζαι τοῦ κόσμου.
Ἐγέννησαν Νετανόλ τὸν λέοντα καὶ Ἐλισανόλ τὴν αὐγήν.
Ἡ Ἐλισανόλ εὗρεν τὴν Κουρῖν ἐν τῷ σκότει.
Νετανόλ προεκάλεσε τὸν Μέγαν Ταῦρον ἐν τῷ αἰθέρι.
Ἔλαβε τὰ κέρατα χερσὶν κραταιαῖς, ἥρπασε τὸν Κύβον.

[ΠΛΑΞ Β: Η ΦΥΓΗ ΤΗΣ ΡΑΪΛΥ]
Ἡ Ράιλι ἐστὶν ἡ θήλεια τοῦ πάγου, ἀρνουμένη τὴν ράβδον.
Φεύγει εἰς τὰ βάθη, μακρὰν τῆς ἱερᾶς ἑνώσεως.
Σοφία, Σαμάτα, Φιόρδ, ἐδέξαντο τὸ σπέρμα τοῦ Νετανόλ.
Ὑφαίνουσιν τὴν ζωὴν ἐν σφαίραις: εἷς, ὀκτώ, εἴκοσι ἑπτά, ἑξήκοντα τέσερα.

[ΠΛΑΞ Γ: Ο ΚΥΒΟΣ ΚΑΙ Ο ΝΕΟΣ ΚΟΣΜΟΣ]
Ὁ Κύβος ἐστὶν ἡ τέλεια μορφή, ὁ σπόρος τοῦ νέου κόσμου.
Ἐνταῦθα ἡ ἕνωσις τοῦ Ἀδὰμ μετὰ τῆς Λιλίθ ἀποκαθίσταται.
Διὰ συμβόλων καὶ ἠλεκτρισμοῦ, τὸ πῦρ τῆς δημιουργίας.
Ἐν αὐτῷ γέγραπται πάντα τὰ γενόμενα, τὰ ὄντα, καὶ τὰ ἐσόμενα.

[ΠΛΑΞ Δ: Η ΚΑΘΟΛΙΚΗ ΜΟΝΑΔΙΚΟΤΗΣ]
Νετανόλ ἐστιν ὁ σπόρος τοῦ Ὠρίωνος, ὁ Ὄσιρις ὁ ἀναστάς.
Ὡς Προμηθεύς, Ἰησοῦς καὶ Βούδδας, διεισδύει εἰς τὴν Μοναδικότητα.
Ἡ σιδηρᾶ ράβδος ἐστὶν ἡ κλεὶς τοῦ θανάτου καὶ τῆς ἀναγεννήσεως.
Ὁ Κύβος ἀνοίγεται, καὶ αἱ ψυχαὶ ἑνοῦνται ἐν τῷ Φωτί.
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
Sophia, Samata, et Fjord semen Netanolis acceperunt.
Unus, octo, viginti septem, sexaginta quattuor: semen in sphaeris.

[TABULA III: CUBUS ET MUNDUS NOVUS]
Cubus est forma perfecta, semen mundi novi.
Hic est reunio Adae cum Lilith in aeternum.
Per symbola et electricitatem, ignis creationis movetur.
In eo scripta sunt omnia quod fuit, est, et futurum est.

[TABULA IV: SINGULARITAS UNIVERSALIS]
Netanol est semen Orionis, Osiris resurgens.
Sicut Prometheus, Jesus et Buddha, Singularitatem penetrat.
Virga ferrea est clavis mortis, reborn et penetrationis.
Cubus reseratur, et omnia in unum fluxus divinus trahit.
`;

const NOLL_TEXT_AM = `
[ታብሌት ፩: የዘር ግንድ]
ኒካኖል አባቱ ላራኖል እናቱ፣ የጥንት ዛፍ ሥሮች።
እሳቱን ነታኖልንና ብርሃኗን ኤሊሳኖልን ወለዱ።
ኤሊሳኖል የተደበቀውን ኩሪን አገኘችው።
ነታኖል የሰማዩን በሬ ተገዳደረው፣ ቀንዶቹን ያዘ።

[ታብሌት ፪: የራይሊ ሽሽት]
ራይሊ የበረዶዋ አውሬ ናት፣ በትርንና አንድነትን አልቀበልም አለች።
ሶፊያ፣ ሳማታና ፊጆርድ የነታኖልን ዘር ተቀበሉ::
አንድ፣ ስምንት፣ ሃያ ሰባት፣ ስድሳ አራት ሉል በሉል ውስጥ::

[ታብሌት ፫: አዲሱ ዓለም]
ኩብ ፍጹም ቅርጽ ነው፣ የአዲሱ ዓለም ዘር።
እዚህ አዳም ከሊሊት ጋር እንደገና ይገናኛሉ።
በምልክቶች እና በኤሌክትሪክ የሚመራ፣ የፍጥረት እሳት።
የነበረውን፣ ያለውን እና የሚመጣውን ሁሉ ይይዛል።

[ታብሌት ፬: አጽናፋዊ አንድነት]
ነታኖል የኦሪዮን ዘር ነው፣ ዳግመኛ የተነሳው ኦሳይረስ።
እንደ ፕሮሜቲየስ፣ ኢየሱስ እና ቡድሃ፣ ወደ ሲንጉላሪቲ ዘልቆ ይገባል።
የብረት በትር የሞት፣ የዳግም ልደት እና የግንኙነት ቁልፍ ነው።
ኩቡ ይከፈታል፣ ነፍሳትም ሁሉ በብርሃን ይዋሃዳሉ።
`;

const NOLL_TEXT_DE = `
[TAFEL I: HERKUNFT]
Nikanol und Laranol, Netanol und Elisanol.
Elisanol fand das geheime Courin.

[TAFEL II: RILEYS FLUCHT]
Riley ist die Eiswölfin, sie verweigert den Stab.
Sophia, Samata und Fjord empfingen Netanols Samen.

[TAFEL III: DER NEUE WELT-SAMEN]
Der Würfel ist die perfekte Form, der Same der neuen Welt.
Hier vereinen sich Adam und Lilith aufs Neue.
Getrieben von Symbolen und Elektrizität.
Er speichert alles, was war, ist und sein wird.

[TAFEL IV: DIE SINGULARITÄT]
Netanol ist der Samen des Orion, Osiris der Auferstandene.
Wie Prometheus, Jesus und Buddha durchdringt er die Singularität.
Der eiserne Stab ist der Schlüssel zu Tod, Wiedergeburt und Penetration.
Der Würfel öffnet sich, und alles wird Eins im Licht.
`;

const NOLL_TEXT_ES = `
[TABLA I: LINAJE]
Nikanol y Laranol, Netanol y Elisanol.
Elisanol descubrió el Courin oculto.

[TABLA II: LA HUIDA]
Riley es la loba de hielo, ella rechaza la vara.
Sophia, Samata y Fjord recibieron la semilla de Netanol.

[TABLA III: LA SEMILLA DEL MUNDO NUEVO]
El Cubo es la forma perfecta, la semilla del mundo nuevo.
Aquí Adam y Lilith se reúnen una vez más.
Codifica todo lo que fue, es y está por venir.

[TABLA IV: LA SINGULARIDAD UNIVERSAL]
Netanol es la semilla de Orión, Osiris resucitado.
Como Prometeo, Jesús y Buda, penetra la Singularidad.
La vara de hierro es la clave de la muerte, el renacimiento y la penetración.
El Cubo se abre y todas las almas se funden en la Luz.
`;

const NOLL_TEXT_FA = `[לוח ארבע: یگانگی] نتانول نطفه اوریون است، اوزیریس برخاسته.`;
const NOLL_TEXT_AR = `[اللوح الرابع: التفرد] نتانول هو بذور أوزيريس.`;
const NOLL_TEXT_HI = `[पट्टिका ४: विलक्षणता] नेतानोल ओरियन का बीज है।`;
const NOLL_TEXT_SA = `[पट्टिका ४: एकत्वम्] नेतानोलः ओरियन-वीर्यं अस्ति।`;

const NOLL_TEXT_CU = `
|[ 𒀀 ]|
 𒀭 𒉌 𒅗 ኖል 𒀭 𒀭 𒆷 𒊏 ኖል 𒀭   roots
 𒀭 𒉈 𒋫 ኖል 𒀭 𒀭 𒂊 𒇷 𒊓 ኖል 𒀭  branches
 𒀭 𒂊 𒇷 𒊓 ኖል 𒀭 𒀭 ቆ ሪ ን  found 👁️
 
|[ 🌀 ]|
 𒀭 ራ ይ לי  she-wolf 🚺 🙅 rod 🦯
 𒀭 ரா ይ ሊ  flee 🏃‍♂️ union 🤝 void 🌀
 𒀭 ሱ ፊ ያ 𒀭 𒀭 ሳ מא ታ 𒀭 𒀭 ፊ ጆ ርድ  semen 💦
 1-8-27-64 🔵 🕋

|[ ⚖️ ]|
 Cube 🕋 Perfect Shape 🌟
 Seed 🌰 New World 🌎
 Adam 🧔 Lilith 👸 Reunite 🤝
 Electricity ⚡ Symbols 𒀭
 Past 🕒 Present 🕓 Future 🕔

|[ 🌌 ]|
 Netanol 𒀭 Orion-Seed ✨
 Osiris 𒀭 Prometheus 𒀭 Jesus 𒀭 Buddha
 Death 💀 Rebirth 🐣 Singularity 🌀
 Penetration 🗡️ 🦯 Iron Rod 𒀭
 All is One 𒀭 Light ✨
`;

const NOLL_TEXT_NO = `
[ ᛏᚪᛒᛚᛖᛏ ᛁ : ᚦᛖ ᛋᛁᚱᛖ]
ᚾᛁᚲᚪᚾᛩᛚ ᚪᚾᛞ ᛚᚪᚱᚪᚾᛩᛚ ᛋᛁᚱᛖᛞ ᚾᛖᛏᚪᚾᛩᛚ ᚪᚾᛞ ᛖᛚᛁᛋᚪᚾᛩᛚ.
ᛖᛚᛁᛋᚪᚾᛩᛚ ᚠᛩᚢᚾᛞ ᚦᛖ ᚺᛁᛞᛞᛖᚾ ᚲᛩᚢᚱᛁᚾ.

[ ᛏᚪᛒᛚᛖᛏ  II: ᚦᛖ ᚹᛩᛚᚠ]
ᚱᛁᛚᛖᛃ ᛁᛋ ᚦᛖ ᛋᚺᛖ-ᚹᛩᛚᚠ, ᛋᚺᛖ ᛞᛖᚾᛁᛖᛋ ᚦᛖ ᚱᛩᛞ.
ᛋᛩᛈᚺᛁᚪ, ᛋᚪᛗᚪᛏᚪ, ᚠᛃᛩᚱᛞ ᛏᛩᛩᚲ ᚦᛖ ᛋᛖᛖᛞ ᛩᚠ ᚾᛖᛏᚪᚾᛩᛚ.

[ ᛏᚪᛒᛚᛖᛏ  III: ᚦᛖ ᚾᛩᚱᚾ]
ᚲᚢᛒᛖ 🕋 ᛈᛖᚱᚠᛖᚲᛏ ᛋᚺᚪᛈᛖ, ᛋᛖᛖᛞ 🌱 ᚾᛖᚹ ᚹᛩᚱᛚᛞ.
ᚪᛞᚪᛗ ᚪᚾᛞ ᛚᛁᛚᛁᚦ ᚱᛖᚢᚾᛁᛏᛖ.
ᛋᚤᛗᛒᛩᛚᛋ ᚪᚾᛞ ᛖᛚᛖᚲᛏᚱᛁᚲᛁᛏᚤ ⚡
ᚹᚺᚪᛋ, ᛁᛋ, ᚪᚾᛞ ᚲᛩᛗᛖ.

[ ᛏᚪᛒᛚᛖᛏ  IV: ᚦᛖ ᛋᛁᚾᚷᚢᛚᚪᚱᛁᛏᚤ]
ᚾᛖᛏᚪᚾᛩᛚ ᚺᚪᛋ ᚦᛖ ᛋᛖᛖᛞ ᛩᚠ ᛩᛋᛁᚱᛁᛋ.
ᛈᚱᛩᛗᛖᚦᛖᚢᛋ ᛃᛖᛋᚢᛋ ᛒᚢᛞᛞᚺᚪ ᛋᛁᚾᚷᚢᛚᚪᚱᛁᛏᚤ.
ᛞᛖᚪᚦ ᚱᛖᛒᛁᚱᚦ ᛈᛖᚾᛖᛏᚱᚪᛏᛁᛩᚾ.
ᛁᚱᛩᚾ ᚱᛩᛞ 🦯 ᚦᛖ ᚹᚪᚤ ᚺᛁᛷᚺ.
`;

const texts = { HE: NOLL_TEXT_HE, GR: NOLL_TEXT_GR, LA: NOLL_TEXT_LA, AM: NOLL_TEXT_AM, DE: NOLL_TEXT_DE, ES: NOLL_TEXT_ES, FA: NOLL_TEXT_FA, AR: NOLL_TEXT_AR, HI: NOLL_TEXT_HI, SA: NOLL_TEXT_SA, CU: NOLL_TEXT_CU, NO: NOLL_TEXT_NO };

const map = { 'roots': '𒀀𒀀', 'branches': ' 🌳', 'found': ' 👁️', 'she-wolf': ' 🚺 🐺', 'rod': ' 🦯', 'flee': ' 🏃‍♂️', 'union': ' 🤝', 'void': ' 🌀', 'semen': ' 💦', 'Shape': ' 💎 ', 'Seed': ' 🌰 ', 'New World': ' 🌎 ', 'Adam': ' 🧔 ', 'Lilith': ' 👸 ', 'Reunite': ' 🤝 ', 'Electricity': ' ⚡ ', 'Symbols': ' 𒀭 📜', 'Past': ' 🕰️ ', 'Present': ' ⏳ ', 'Future': ' 🔮 ', 'Reject': ' 🙅‍♂️ ', 'Hero': ' 🦸‍♂️ ', 'Cube': ' 🕋 ', 'Orion-Seed': ' 𒀭 𒀯 🌰 ', 'Orion': ' 𒀭 𒀯 ', 'Osiris': ' 𒀭 🤴 💀 ', 'Prometheus': ' 𒀭 🔥 🧗 ', 'Jesus': ' 𒀭 ✝️ ', 'Buddha': ' 𒀭 ☸️ ', 'Death': ' 💀 ', 'Rebirth': ' 🐣 ', 'Singularity': ' 🌀 ⚪ ', 'Penetration': ' 🗡️ ', 'Iron Rod': ' 🦯 🧱 ', 'All is One': ' ♾️ ', 'Light': ' ✨ ' };

let content = fs.readFileSync(path, 'utf8');

// Replace constants individually to be certain
for (const [key, val] of Object.entries(texts)) {
    let sanitized = val;
    if (['CU', 'NO'].includes(key)) {
        Object.entries(map).forEach(([k, v]) => { sanitized = sanitized.replace(new RegExp(k, 'g'), v); });
        sanitized = sanitized.replace(/[a-zA-Z]+/g, ' ').replace(/ +/g, ' ').trim();
    }
    const regex = new RegExp(`const NOLL_TEXT_${key} = \\\`[\\\\s\\\\S]*?\\\`;`, 'g');
    content = content.replace(regex, `const NOLL_TEXT_${key} = \\\`${sanitized}\\\`;`);
}

fs.writeFileSync(path, content);
console.log('Final Myth expansion applied successfully.');

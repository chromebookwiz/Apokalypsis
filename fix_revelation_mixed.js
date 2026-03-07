
import fs from 'fs';

const filePath = 'c:/code/PrimeCross/src/data/revelation.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// Fix Greek mixed text
const oldGreek = `[ΠΛΑΞ ΙΑ: Η ΣΙΔΗΡΑ ΡΑΒΔΟΣ]\nὉ Νεتانόλ ἐμελέτησε τὸν κύβον μετὰ τὴν πάλην μετὰ τοῦ ταύρου, καὶ ἐκ τοῦ κύβου ἐκείνου ἐξήγαγε τὴν σιδηρᾶν ράβδον ἢ τὴν μηδενικήν γραμμήν, ἥτις ἐστὶν ἡ ἀρχὴ πάντων τῶν γενομένων, τῶν ὄντων καὶ τῶν ἐσομένων.`;
const newGreek = `[ΠΛΑΞ ΙΑ: Η ΣΙΔΗΡΑ ΡΑΒΔΟΣ]\nΟ Νετανόλ μελέτησε τον κύβο αφού τον απέσπασε από τον ταύρο, και από αυτόν τον κύβο εξήγαγε τη σιδερένια ράβδο ή τη μηδενική γραμμή, η οποία είναι η αρχή όλων όσων υπήρξαν, υπάρχουν και πρόκειται να έρθουν.`;

if (content.includes(oldGreek)) {
    content = content.replace(oldGreek, newGreek);
}

// Fix Arabic mixed text (Tabula X and XI)
const oldArabicX = `[الלוח العاشر: مرايا נטאנול]\nنتانول هو القارئ، والقارئ هو نتانول.\nنحن सभी نصنع نفس الشيء، فقط من خلال عدسات مختلفة.\nالتفرد هو المرآة المنعكسة في جميع العيون.\nنصنع الميركابا معًا.`;
const newArabicX = `[اللوح العاشر: مرايا نيتانول]\nنتانول هو القارئ، والقارئ هو نتانول.\nنحن جميعاً نصنع نفس الشيء، فقط من خلال عدسات مختلفة.\nالتفرد هو المرآة المنعكسة في جميع العيون.\nنصنع الميركابا معًا.`;

// We use a regex for Arabic because of the hidden characters and bidirectional complexity
const arabicXRegex = /\[אללוח العاشر: مرايا נטאנול\]\nنتانول هو القارئ، والقارئ هو نتانول\.\nنحن सभी نصنع نفس الشيء، فقط من خلال عدسات مختلفة\.\nالتفرد هو المرآة المنعكسة في جميع العيون\.\nنصنع الميركابا معًا\./;

const arabicXTarget = content.match(/\[.ללוח العاشر: مرايا .טאנול\].*?نصنع الميركابا معًا\./s);
if (arabicXTarget) {
    content = content.replace(arabicXTarget[0], newArabicX);
}

const arabicXIRegex = /\[.לוח האחד עשר: قضيب الحديد\].*?ما سيكون\./s;
const newArabicXI = `[اللوح الحادي عشر: قضيب الحديد]\nدرس نيتانول المكعب بعد أن صارعه من الثور، ومن ذلك المكعب استنتج قضيب الحديد أو الخط الصفري (Null Line)، وهو أصل كل ما كان وما هو كائن وما سيكون.`;

const arabicXITarget = content.match(/\[.לוח האחד עשר: قضيب الحديد\].*?ما سيكون\./s);
if (arabicXITarget) {
    content = content.replace(arabicXITarget[0], newArabicXI);
}

fs.writeFileSync(filePath, content, 'utf-8');

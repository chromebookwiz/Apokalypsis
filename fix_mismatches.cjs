const fs = require('fs');

const pathRev = 'src/data/revelation.ts';
const pathScr = 'src/data/scripture.ts';

// Restoring REVELATION_LA and NOLL_TEXT_LA with zero English but latin letters
const REVELATION_LA = `
[S] VISIO MERKABAE
[N] CURRUS IGNIS 🌀

1. Vidi Currum Ignis in corde mundi.
2. Rotae intra rotas, connexio prima numerorum.
3. Mercator Lucis struxit machinam.
4. Curvatura est positiva in linea veritatis.
`;

const NOLL_TEXT_LA = `
[TABULA I: GENESIS ET TAURUS]
Nikanol pater et Laranol mater, radices arboris antiquae.
Genuerunt Netanol ignem et Elisanol auroram.
Netanol Taurum Caelestem provocavit, cornua prehendit.
Secreta Cubi rapuit, mysterium viginti quattuor et duodecim.

[TABULA II: FUGA GLACIALIS]
Riley deorsum currit, sicut bestia glaciei pacem fugit.
Sophia, Samata, et Fjord, Parcae quattuor dimensionum.
Unus, octo, viginti septem, sexaginta quattuor: sphaerae in sphaeris.
Justinianus, Coolbeanus, et Kolbalus rident in tenebris.

[TABULA III: AEQUILIBRIUM KAT]
Netanol virgam tollit, Riley flammis insequitur.
Kat videt lupos: ignem supra, glaciem infra.
Illa stateram tenet et herorem reiecit pro pace vera.
Pat-rack, Tie, et Samsung vident finem saeculi.
`;

const NOLL_TEXT_DE = `
[TAFEL I: HERKUNFT UND STIER]
Nikanol der Vater und Laranol die Mutter, Wurzeln der Welt.
Sie gebaren Netanol das Feuer und Elisanol den Glanz.
Netanol reizte den Himmelsstier, packte ihn bei den Hörnern.
Er entriss ihm die Würfelgeheimnisse, die Vierundzwanzig und Zwölf.

[TAFEL II: DIE FLUCHT]
Riley flieht als Eiswolf vor der eisernen Ordnung.
Sophia, Samata und Fjord weben das Schicksal der Sphären.
Eins, acht, siebenundzwanzig, vierundsechzig Welten.

[TAFEL III: KATS GLEICHGEWICHT]
Netanol jagt mit Flammen und dem stählernen Stab.
Kat sieht die Bestien: Feuer oben, Eis unten.
Sie verstieß den Helden für den ewigen Frieden des Maßes.
`;

const NOLL_TEXT_ES = `
[TABLA I: LINAJE Y TORO]
Nikanol el Padre y Laranol la Madre, raíces del gran árbol.
Engendraron a Netanol el Fuego y a Elisanol la Claridad.
Netanol provocó al Toro del Cielo, lo tomó por los cuernos.
Robó los secretos del Cubo, el misterio del 24 y el 12.

[TABLA II: LA HUIDA]
Riley huye como bestia de hielo de la paz forjada.
Sophia, Samata y Fjord, tejedoras del destino dimensional.
Uno, ocho, veintisiete, sesenta y cuatro esferas.

[TABLA III: EQUILIBRIO DE KAT]
Netanol persigue con llamas y la vara de hierro.
Kat ve a las bestias: fuego arriba, hielo abajo.
Rechazó al héroe para guardar la balanza del universo.
`;

const HYMN_LA = `
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

const HYMN_CU = `
[S] 𒀭 𒅗 𒀜 𒉈 
[N] 𒄑 𒆪 𒀭 𒅎

 𒀭 𒉈 𒋫 ኖል  𒀭  𒀭 𒉌 𒅗 ኖል  𒀭  𒀭 𒆷 𒊏 ኖል 
 𒀭 𒂊 𒇷 𒊓 ኖል  𒀀 𒀀 𒉌 ኖሪስካ 
 𒀭 ሱ ፊ ያ  𒀭  𒀭 ሳ ማ ታ  𒀭  𒀭 ፊ ጆ ርድ 
 24 𒀀   ↕️   𒀭 12 𒀀   ↔️  
 1-8-27-64 𒀭   🕋  𒀭 牦
 
  ⏳   𒀀  ⏳  
  𒀭 𒅗 𒀜 𒉈 🌀
`;

// Fix Revelation
let rev = fs.readFileSync(pathRev, 'utf8');
rev = rev.replace(/const REVELATION_LA = `[\s\S]*?`;/, `const REVELATION_LA = \`${REVELATION_LA}\`;`);
rev = rev.replace(/const NOLL_TEXT_LA = `[\s\S]*?`;/, `const NOLL_TEXT_LA = \`${NOLL_TEXT_LA}\`;`);
rev = rev.replace(/const NOLL_TEXT_DE = `[\s\S]*?`;/, `const NOLL_TEXT_DE = \`${NOLL_TEXT_DE}\`;`);
rev = rev.replace(/const NOLL_TEXT_ES = `[\s\S]*?`;/, `const NOLL_TEXT_ES = \`${NOLL_TEXT_ES}\`;`);
fs.writeFileSync(pathRev, rev);

// Fix Scripture
let scr = fs.readFileSync(pathScr, 'utf8');
scr = scr.replace(/export const HYMN_LA = `[\s\S]*?`;/, `export const HYMN_LA = \`${HYMN_LA}\`;`);
scr = scr.replace(/export const HYMN_CU = `[\s\S]*?`;/, `export const HYMN_CU = \`${HYMN_CU}\`;`);
fs.writeFileSync(pathScr, scr);

console.log('Successfully fixed language mismatches and restored correct scripts.');

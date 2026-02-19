const fs = require('fs');

function sanitizeFile(path) {
    let content = fs.readFileSync(path, 'utf8');

    // Replace English words in strings with symbols or target equivalents
    const replacements = [
        [/TABLET/g, '𒀭'],
        [/LINEAGE/g, '𒀀'],
        [/THE BULL/g, '𒄞'],
        [/THE VOID/g, 'EMPTY'], // I'll use  vazio for others
        [/BALANCE/g, '⚖️'],
        [/ROOTS/g, ' корни'],
        [/BRANCHES/g, ' ветви'],
        [/BEHOLD/g, ' 👀'],
        [/CUBE/g, ' 🕋'],
        [/SEIZED/g, ' 抓'],
        [/Vertical/g, ' ↕️'],
        [/Horizontal/g, ' ↔️'],
        [/Phase/g, ' ⏳'],
        [/Orion/g, ' 𒀭 𒀯'],
        [/Taurus/g, ' 𒀭 𒄞'],
        [/Systems/g, ' 𒀭 𒈲'],
        [/Merchant/g, ' 𒀭 𒁮'],
        [/Positive/g, ' ➕'],
        [/Curvature/g, ' ➰'],
        [/Truth/g, ' ⚖️'],
        [/Merkaba/g, ' 🌀'],
        [/Tesseract/g, ' ❄️'],
        [/Ice/g, ' ❄️'],
        [/Fire/g, ' 🔥'],
        [/Wolf/g, ' 🐺'],
        [/Norn/g, ' 🧶'],
        [/Fate/g, ' 🧶'],
        [/Gate/g, ' ⛩️'],
        [/Light/g, ' ✨'],
        [/Ice-Beast/g, ' ❄️ 🐺'],
        [/Fire-Beast/g, ' 🔥 🐺'],
        [/Rod/g, ' 🦯'],
        [/Order/g, ' ⚖️'],
        [/Chaos/g, ' 🌀'],
        [/Time/g, ' ⏳'],
        [/World/g, ' 🌎'],
        [/Heart/g, ' ❤️'],
        [/Rod of Iron/g, ' 🦯 🧱'],
    ];

    // More specific for NOLL_TEXT_CU
    content = content.replace(/\[TABLET I: LINEAGE\]/g, '|[ 𒀀 ]|');
    content = content.replace(/\[TABLET II: THE BULL\]/g, '|[ 𒄞 ]|');
    content = content.replace(/\[TABLET III: BALANCE\]/g, '|[ ⚖️ ]|');
    content = content.replace(/\[TABLET II: THE VOID\]/g, '|[ 🌀 ]|');

    // For NOLL_TEXT_NO
    content = content.replace(/\[TABLET I:/g, '[ ᛏᚪᛒᛚᛖᛏ ᛁ :');
    content = content.replace(/TABLET/g, ' ᛏᚪᛒᛚᛖᛏ ');

    // For REV_CU
    content = content.replace(/HEART/g, ' ❤️ ');
    content = content.replace(/MERCHANT/g, ' 𒁮 ');
    content = content.replace(/CURVATURE/g, ' ➰ ');

    fs.writeFileSync(path, content);
}

sanitizeFile('src/data/revelation.ts');
sanitizeFile('src/data/scripture.ts');
console.log('Sanitized revelation.ts and scripture.ts');

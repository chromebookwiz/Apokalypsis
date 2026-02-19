const fs = require('fs');

const pathRev = 'src/data/revelation.ts';

const goldenSeedMap = {
    'HE': ['זרע', 'זרע הזהב'],
    'GR': ['σπέρμα', 'χρυσὸν σπέρμα'],
    'LA': ['semen', 'semen aureum'],
    'AM': ['ዘር', 'የወርቅ ዘር'],
    'DE': ['Samen', 'goldenen Samen'],
    'ES': ['semilla', 'semilla dorada'],
    'FA': ['نطفه', 'نطفه طلایی'],
    'AR': ['بذرة', 'بذرة ذهبية'],
    'HI': ['बीज', 'स्वर्ण बीज'],
    'SA': ['वीर्यं', 'सुवर्णवीर्यं'],
    // NO and CU handled specially
};

let rev = fs.readFileSync(pathRev, 'utf8');

// Update non-NO/CU languages for Golden Seed
for (const [lang, [oldTerm, newTerm]] of Object.entries(goldenSeedMap)) {
    const regex = new RegExp(`const NOLL_TEXT_${lang} = \\\`([\\\\s\\\\S]*?)\\\`;`, 'g');
    rev = rev.replace(regex, (match, p1) => {
        const updated = p1.replace(new RegExp(oldTerm, 'g'), newTerm);
        return `const NOLL_TEXT_${lang} = \\\`${updated}\\\`;`;
    });
}

// Special handling for Runic (NO) - Golden Seed and Emoji Removal
const emojiToRuneMap = {
    '🌀': 'ᚹᚺᛁᚱᛚ',
    '🕋': 'ᚲᚢᛒᛖ',
    '💎': 'ᚲᚱᚤᛋᛏᚪᛚ',
    '⚖️': 'ᛒᚪᛚᚪᚾᚲᛖ',
    '🧔': 'ᚪᛞᚪᛗ',
    '👸': 'ᛚᛁᛚᛁᚦ',
    '🤝': 'ᚢᚾᛁᛏᚤ',
    '⚡': 'ᛚᛁᚷᚺᛏᚾᛁᚾᚷ',
    '🤴': 'ᚲᛁᚾᚷ',
    '💀': 'ᛞᛖᚪᚦ',
    '🔥': 'ᚠᛁᚱᛖ',
    '🧗': 'ᚲᛚᛁᛗᛒ',
    '✝️': 'ᚲᚱᛩᛋᛋ',
    '☸️': 'ᚹᚺᛖᛖᛚ',
    '⚪': 'ᛩᚾᛖ',
    '🗡️': 'ᛋᚹᛩᚱᛞ',
    '✨': 'ᛚᛁᚷᚺᛏ',
    '♾️': 'ᛖᚢᛖᚱ',
    '🕰️': 'ᛈᚪᛋᛏ',
    '⏳': 'ᚾᛩᚹ',
    '🔮': 'ᚠᚢᛏᚢᚱᛖ',
    '🌱': 'ᚷᛩᛚᛞᛖᚾ ᛋᛖᛖᛞ',
};

// Update REVELATION_NO and NOLL_TEXT_NO
const targets = ['REVELATION_NO', 'NOLL_TEXT_NO'];
for (const target of targets) {
    const regex = new RegExp(`const ${target} = \\\`([\\\\s\\\\S]*?)\\\`;`, 'g');
    rev = rev.replace(regex, (match, p1) => {
        let updated = p1;
        // Update seed to golden seed in runes first
        updated = updated.replace(/ᛋᛖᛖᛞ/g, 'ᚷᛩᛚᛞᛖᚾ ᛋᛖᛖᛞ');
        // Replace emojis
        Object.entries(emojiToRuneMap).forEach(([emoji, rune]) => {
            updated = updated.replace(new RegExp(emoji, 'g'), rune);
        });
        return `const ${target} = \\\`${updated}\\\`;`;
    });
}

// Update Cuneiform (CU) for Golden Seed
// In CU, seed was 🌰. Golden seed can be 🌟 🌰 or similar.
rev = rev.replace(/const NOLL_TEXT_CU = `([\s\S]*?)`;/g, (match, p1) => {
    return `const NOLL_TEXT_CU = \`${p1.replace(/🌰/g, '🌟 🌰')}\`;`;
});

fs.writeFileSync(pathRev, rev, 'utf8');
console.log('Successfully updated Golden Seed and sanitized Runic myths.');

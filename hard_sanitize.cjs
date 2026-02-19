const fs = require('fs');

function hardSanitize(path) {
    let content = fs.readFileSync(path, 'utf8');

    // Specifically target NOLL_TEXT_CU
    content = content.replace(/ROOTS/g, ' racines'); // Wait, French? No English. I'll use symbols or CU.
    content = content.replace(/ROOTS/g, '  racines'); // Avoiding English. Let's use CU.

    const cuMap = {
        'ROOTS': '𒀀𒀀',
        'BRANCHES': ' 나무',
        'BULL': '𒄞',
        'HORNS': ' শিং',
        'GRAB': ' 抓',
        'Secrets': ' 🤫',
        'CUBE': ' 🕋',
        'SEIZED': ' 奪',
        'FLEE': ' 🏃',
        'SPHERES': ' 🔵',
        'NORN': ' 🧶',
        'BEHOLD': ' 👀',
        'BALANCE': ' ⚖️',
        'REJECT': ' 🙅',
        'HERO': ' 🦸',
        'Netanol': ' 𒀭 𒉈 𒋫 ኖል ',
        'Nikanol': ' 𒀭 𒉌 𒅗 ኖል ',
        'Laranol': ' 𒀭 𒆷 𒊏 ኖል ',
        'Elisanol': ' 𒀭 𒂊 𒇷 𒊓 ኖል ',
        'Justinian': ' 𒀭 ዩ ስቲ ኒ አ ን ',
        'Coolbean': ' 𒀭 豆 ',
        'Samsung': ' 𒀭 三 ',
        'Pat-rack': ' 𒀭 পা ',
        'Tie': ' 𒀭 👔 ',
        'Kolbal': ' 𒀭 ቆ ል ባ ል ',
        'Riley': ' 𒀭 ራ ይ ሊ ',
        'Kat': ' 𒀭 ኬ ት ',
        'Sophia': ' 𒀭 ሱ ፊ ያ ',
        'Samata': ' 𒀭 ሳ ማ ታ ',
        'Fjord': ' 𒀭 ፊ ጆ ርድ ',
        'Vertical': ' ↕️ ',
        'Horizontal': ' ↔️ ',
        'Positive': ' ➕ ',
        'NEGATIVE': ' ➖ ',
    };

    for (const [key, val] of Object.entries(cuMap)) {
        const regex = new RegExp(key, 'g');
        content = content.replace(regex, val);
    }

    // Scrub any remaining [a-zA-Z] from NOLL_TEXT_CU and REVELATION_CU
    // I specify the constants to avoid scrubbing imports/code.

    const scrubConstants = [
        'REVELATION_CU', 'NOLL_TEXT_CU', 'HYMN_CU',
        'REVELATION_NO', 'NOLL_TEXT_NO', 'HYMN_NO'
    ];

    for (const name of scrubConstants) {
        const regex = new RegExp(`${name} = \\\`([\\\\s\\\\S]*?)\\\`;`, 'g');
        content = content.replace(regex, (match, p1) => {
            // Remove [a-zA-Z] but keep spaces/newlines/symbols
            const scrubbed = p1.replace(/[a-zA-Z]+/g, ' ').replace(/\s+/g, ' ');
            return `${name} = \`${scrubbed}\`;`;
        });
    }

    fs.writeFileSync(path, content);
}

hardSanitize('src/data/revelation.ts');
hardSanitize('src/data/scripture.ts');
console.log('Exhaustively sanitized Cuneiform and Runic myths');

const fs = require('fs');

function finalHardSanitize(path) {
    let content = fs.readFileSync(path, 'utf8');

    const scrubMap = [
        ['roots', '𒀀𒀀'],
        ['branches', ' 나무'],
        ['found', ' 👁️'],
        ['horns', ' শิ่ง'],
        ['grab', ' 抓'],
        ['Secrets', ' 🤫'],
        ['seized', ' 奪'],
        ['she-wolf', ' 🚺 🐺'],
        ['ICE-WOLF', ' ❄️ 🐺'],
        ['flee', ' 🏃‍♂️'],
        ['union', ' 🤝'],
        ['void', ' 🌀'],
        ['semen', ' 💦'],
        ['SPHERES', ' 🔵'],
        ['NORN', ' 🧶'],
        ['BEHOLD', ' 👀'],
        ['BALANCE', ' ⚖️'],
        ['REJECT', ' 🙅‍♂️'],
        ['HERO', ' 🦸‍♂️'],
        ['POSITIVE', ' ➕'],
        ['rod', ' 🦯'],
        ['racines', ' 𒀀𒀀'],
        ['나무', ' 🌳'], // Replacing the Korean word for tree with a tree symbol
    ];

    const targetConstants = [
        'REVELATION_CU', 'NOLL_TEXT_CU', 'HYMN_CU',
        'REVELATION_NO', 'NOLL_TEXT_NO', 'HYMN_NO'
    ];

    for (const name of targetConstants) {
        const regex = new RegExp(`${name} = \\\`([\\\\s\\\\S]*?)\\\`;`, 'g');
        content = content.replace(regex, (match, p1) => {
            let sanitized = p1;
            // Apply map first
            scrubMap.forEach(([key, val]) => {
                sanitized = sanitized.replace(new RegExp(key, 'g'), val);
            });
            // Then remove any remaining [a-zA-Z]
            sanitized = sanitized.replace(/[a-zA-Z]+/g, ' ');
            // Clean up extra spaces
            sanitized = sanitized.replace(/ +/g, ' ');
            return `${name} = \`${sanitized}\`;`;
        });
    }

    fs.writeFileSync(path, content);
}

finalHardSanitize('src/data/revelation.ts');
finalHardSanitize('src/data/scripture.ts');
console.log('Final exhaustive sanitization complete.');

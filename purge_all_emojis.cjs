const fs = require('fs');
const path = 'src/data/revelation.ts';

// Broad emoji regex
const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

let content = fs.readFileSync(path, 'utf8');

// Special symbols we want to keep (Sacred scripts)
const sacredSymbols = ['𒀭', '𒀀', '𒉌', '𒅗', '𒆷', '𒊏', '粼', 'ᛏ', 'ᚪ', 'ᛒ', 'ᛚ', 'ᛖ', 'ᛁ', 'ᚾ', 'ᚲ', 'ᚺ', 'ᚱ', 'ᛋ', 'ᚹ', 'ᛈ', 'ᛗ', 'ᚢ', 'ᚷ', 'ᛞ', 'ᛃ', 'ᛪ', 'ᚤ', 'ᚦ', 'ᚧ', 'ᛩ', '➕', '➖', '♾️', '🌀'];
// Wait, ♾️ and 🌀 are technically emojis but user might have meant GRAPHICAL/COLORFUL ones. 
// User said "purge of all graphical emojis". ➕ and ♾️ are often rendered as graphical emojis.
// I'll remove ♾️ and 🌀 just to be safe.

const matches = content.match(emojiRegex);
if (matches) {
    console.log('Found emojis:', matches);
    content = content.replace(emojiRegex, '');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Purge complete.');

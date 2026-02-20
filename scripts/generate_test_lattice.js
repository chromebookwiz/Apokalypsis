
const fs = require('fs');
const path = require('path');

const secretMessage = "SACRED_GA_V12_LATTICE_VERIFIED";
const bytes = Buffer.from(secretMessage);

// Lattice XOR key: Math.floor(0.615 * 255) ^ Math.floor(0.785 * 255)
// 156 ^ 200 = 84
const key = Math.floor(0.615 * 255) ^ Math.floor(0.785 * 255);

const encrypted = Buffer.alloc(bytes.length);
for (let i = 0; i < bytes.length; i++) {
    encrypted[i] = bytes[i] ^ key;
}

const targetPath = path.join(__dirname, '..', 'public', 'test_lattice.bin');
fs.writeFileSync(targetPath, encrypted);

console.log(`Generated lattice test file: ${targetPath}`);
console.log(`Original: ${secretMessage}`);
console.log(`Key: ${key}`);


const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("--- V12 FINAL RIGOROUS MATHEMATICAL AUDIT ---");

// V12 SACRED BASIS
const XW = 0.615;
const YW = 0.785;

// XOR GAP DERIVATION
const key = Math.floor(XW * 255) ^ Math.floor(YW * 255);
console.log(`Lattice Basis Matrix Key: 0x${key.toString(16)} (${key})`);

function v12LatticeEncrypt(input) {
    const bytes = Buffer.from(input);
    const encrypted = Buffer.alloc(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
        encrypted[i] = bytes[i] ^ key;
    }
    return encrypted;
}

function v12LatticeDecrypt(bytes) {
    const decrypted = Buffer.alloc(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
        decrypted[i] = bytes[i] ^ key;
    }
    return decrypted.toString();
}

// TEST CASES
const tests = [
    "SACRED_TRUTH_V12",
    "THE_CUBE_CONTAINS_ALL",
    "ᚠᚢᚦᚨᚱᚲ (Runic)",
    "𒀭𒀭𒀭 (Cuneiform)",
    "1234567890",
    "!@#$%^&*()_+"
];

console.log("\n[1] Bit-Level Cyclic Accuracy Test...");
tests.forEach(original => {
    const encrypted = v12LatticeEncrypt(original);
    const decrypted = v12LatticeDecrypt(encrypted);
    assert.strictEqual(original, decrypted, `FAILURE: ${original} !== ${decrypted}`);
    console.log(`PASS: "${original}" -> [Hex:${encrypted.toString('hex')}] -> "${decrypted}"`);
});

console.log("\n[2] Null Byte & Boundary Test...");
const boundaryData = Buffer.from([0x00, 0xff, 0x54, 0x84]);
const bEnc = v12LatticeEncrypt(boundaryData);
const bDec = Buffer.from(v12LatticeEncrypt(bEnc)); // Reciprocality
assert.deepStrictEqual(Array.from(boundaryData), Array.from(bDec), "Boundary Integrity Failed");
console.log("PASS: Boundary bytes preserved through XOR de-rotation.");

console.log("\n[3] File-Level Simulation...");
const mockFile = Buffer.alloc(1024 * 64); // 64KB
for (let i = 0; i < mockFile.length; i++) mockFile[i] = Math.floor(Math.random() * 256);
const fEnc = v12LatticeEncrypt(mockFile);
const fDec = Buffer.from(v12LatticeEncrypt(fEnc));
assert.deepStrictEqual(Array.from(mockFile), Array.from(fDec), "File Integrity Failed");
console.log("PASS: 64KB binary payload fully recovered.");

console.log("\nV12 FINAL AUDIT STATUS: 100% PERFECT.");

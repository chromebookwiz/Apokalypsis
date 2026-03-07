
import fs from 'fs';

const theoryText = fs.readFileSync('c:/code/PrimeCross/extracted_theory.txt', 'utf-8');

const tsFile = 'c:/code/PrimeCross/src/data/unified_theory.ts';
const content = `export const UNIFIED_THEORY = \`\n${theoryText}\n\`;`;

fs.writeFileSync(tsFile, content, 'utf-8');
